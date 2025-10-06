import tracking, { TrackingData } from './tracking';

/**
 * Meta Conversions API (CAPI) integration
 * Sends server-side events via webhook with deduplication
 */

// Replace with actual webhook URL
const CAPI_WEBHOOK_URL = "{{CAPI_WEBHOOK}}";
const MAX_RETRIES = 2;
const TIMEOUT_MS = 1500;

export interface CapiEventData {
  event_name: string;
  event_time: number; // Unix timestamp
  event_id: string;
  source_url: string;
  action_source: 'website';
  user_data: {
    em?: string; // email hash
    ph?: string; // phone hash
    fbp?: string;
    fbc?: string;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_category?: string;
    [key: string]: any;
  };
}

class CapiManager {
  private isDevelopment = import.meta.env.DEV;

  private async sendRequest(payload: CapiEventData, retries = 0): Promise<boolean> {
    // Skip if no webhook configured (use placeholder check)
    if (CAPI_WEBHOOK_URL.includes('{{') || CAPI_WEBHOOK_URL.includes('CAPI_WEBHOOK')) {
      if (this.isDevelopment) {
        console.log('[CAPI] Webhook not configured, skipping:', payload);
      }
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const response = await fetch(CAPI_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`CAPI request failed: ${response.status}`);
      }

      if (this.isDevelopment) {
        console.log('[CAPI] Event sent successfully:', payload.event_name);
      }

      return true;
    } catch (error) {
      if (retries < MAX_RETRIES) {
        // Exponential backoff
        const delay = 300 * Math.pow(3, retries);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.sendRequest(payload, retries + 1);
      }

      if (this.isDevelopment) {
        console.error('[CAPI] Failed to send event after retries:', error);
      }
      return false;
    }
  }

  private buildPayload(
    eventName: string,
    trackingData: TrackingData,
    customData?: any
  ): CapiEventData {
    return {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: trackingData.event_id || '',
      source_url: window.location.href,
      action_source: 'website',
      user_data: {
        em: trackingData.em,
        ph: trackingData.ph,
        fbp: trackingData.fbp,
        fbc: trackingData.fbc,
        client_user_agent: navigator.userAgent,
      },
      custom_data: customData || {},
    };
  }

  public async sendEvent(
    eventName: string,
    customData?: any
  ): Promise<void> {
    // Check consent
    if (!tracking.hasConsent()) {
      if (this.isDevelopment) {
        console.log('[CAPI] Consent not given, skipping event:', eventName);
      }
      return;
    }

    const trackingData = tracking.getData();
    const payload = this.buildPayload(eventName, trackingData, customData);

    // Use requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.sendRequest(payload);
      });
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        this.sendRequest(payload);
      }, 0);
    }
  }

  public async sendPageView(): Promise<void> {
    await this.sendEvent('PageView');
  }

  public async sendViewContent(contentData?: {
    content_name?: string;
    content_category?: string;
  }): Promise<void> {
    await this.sendEvent('ViewContent', contentData);
  }

  public async sendLead(): Promise<void> {
    await this.sendEvent('Lead');
  }

  public async sendInitiateCheckout(value?: number): Promise<void> {
    await this.sendEvent('InitiateCheckout', {
      value,
      currency: 'BRL',
    });
  }

  public async sendPurchase(value: number, contentName?: string): Promise<void> {
    await this.sendEvent('Purchase', {
      value,
      currency: 'BRL',
      content_name: contentName,
    });
  }
}

export const capi = new CapiManager();
export default capi;
