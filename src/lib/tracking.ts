import { hashEmail, hashPhone } from './hash';

/**
 * Professional tracking module for Meta Ads
 * Captures UTMs, generates fbp/fbc, manages event_id, and provides parameter propagation
 */

const STORAGE_KEY = 'tracking_data';
const STORAGE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface TrackingData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  event_id?: string;
  em?: string; // email hash
  ph?: string; // phone hash
  timestamp?: number;
  timer_start?: number;
}

declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
    gtag: any;
  }
}

class TrackingManager {
  private data: TrackingData = {};
  private consentGiven: boolean = false;

  constructor() {
    this.initDataLayer();
    this.loadFromStorage();
    this.captureUrlParams();
    this.checkConsent();
  }

  private initDataLayer() {
    window.dataLayer = window.dataLayer || [];
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Check TTL
        if (parsed.timestamp && Date.now() - parsed.timestamp < STORAGE_TTL) {
          this.data = parsed;
        } else {
          // Expired, clear
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error('[Tracking] Failed to load from storage:', e);
    }
  }

  private saveToStorage() {
    try {
      this.data.timestamp = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('[Tracking] Failed to save to storage:', e);
    }
  }

  private captureUrlParams() {
    const params = new URLSearchParams(window.location.search);
    
    // Capture UTMs
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
    utmKeys.forEach(key => {
      const value = params.get(key);
      if (value) {
        (this.data as any)[key] = value;
      }
    });

    // Capture fbclid
    const fbclid = params.get('fbclid');
    if (fbclid) {
      this.data.fbclid = fbclid;
      // Generate fbc from fbclid
      this.data.fbc = `fb.1.${Date.now()}.${fbclid}`;
    }

    // Generate fbp if not exists
    if (!this.data.fbp) {
      this.data.fbp = this.generateFbp();
    }

    // Generate event_id if not exists (session-persistent)
    if (!this.data.event_id) {
      this.data.event_id = this.generateUUID();
    }

    this.saveToStorage();
    this.pushToDataLayer();
  }

  private generateFbp(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    return `fb.1.${timestamp}.${random}`;
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private pushToDataLayer() {
    window.dataLayer.push({
      event: 'tracking_data_ready',
      tracking: this.data
    });
  }

  private checkConsent(): boolean {
    const consent = localStorage.getItem('cookie_consent');
    this.consentGiven = consent === 'accepted';
    return this.consentGiven;
  }

  public setConsent(accepted: boolean) {
    this.consentGiven = accepted;
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'rejected');
    
    if (accepted) {
      this.pushToDataLayer();
    }
  }

  public async setUserData(email?: string, phone?: string) {
    if (email) {
      this.data.em = await hashEmail(email);
    }
    if (phone) {
      this.data.ph = await hashPhone(phone);
    }
    this.saveToStorage();
  }

  public getData(): TrackingData {
    return { ...this.data };
  }

  public getEventId(): string {
    return this.data.event_id || this.generateUUID();
  }

  public regenerateEventId(): string {
    this.data.event_id = this.generateUUID();
    this.saveToStorage();
    return this.data.event_id;
  }

  public appendParams(url: string): string {
    try {
      const urlObj = new URL(url);
      const params = urlObj.searchParams;

      // Add all tracking params
      Object.entries(this.data).forEach(([key, value]) => {
        if (value && key !== 'timestamp') {
          params.set(key, value);
        }
      });

      return urlObj.toString();
    } catch (e) {
      console.error('[Tracking] Failed to append params:', e);
      return url;
    }
  }

  public hasConsent(): boolean {
    return this.consentGiven;
  }

  // Timer management for resultado page
  public startTimer(): void {
    if (!this.data.timer_start) {
      this.data.timer_start = Date.now();
      this.saveToStorage();
    }
  }

  public getTimerRemaining(durationMinutes: number = 15): number {
    if (!this.data.timer_start) {
      this.startTimer();
    }
    
    const elapsed = Date.now() - (this.data.timer_start || Date.now());
    const remaining = (durationMinutes * 60 * 1000) - elapsed;
    
    return Math.max(0, Math.floor(remaining / 1000)); // seconds
  }
}

// Singleton instance
export const tracking = new TrackingManager();

// Export for use in components
export default tracking;
