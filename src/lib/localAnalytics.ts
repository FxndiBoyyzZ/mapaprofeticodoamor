/**
 * Local Analytics Storage System
 * Stores quiz and tracking events in localStorage for dashboard visualization
 */

export interface QuizEvent {
  id: string;
  timestamp: number;
  event_name: string;
  step?: number;
  answer?: string;
  perfil_sintese?: string;
  tempo_espiritual?: string;
  perfil_amor?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  fbp?: string;
  fbc?: string;
  event_id?: string;
  value?: number;
  session_id?: string;
}

const EVENTS_KEY = 'quiz_analytics_events';
const SESSION_KEY = 'analytics_session_id';

class LocalAnalytics {
  private sessionId: string;

  constructor() {
    // Generate or retrieve session ID
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public trackEvent(event: Omit<QuizEvent, 'id' | 'timestamp' | 'session_id'>): void {
    const events = this.getEvents();
    
    const newEvent: QuizEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: Date.now(),
      session_id: this.sessionId,
    };

    events.push(newEvent);
    
    try {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    } catch (error) {
      // If localStorage is full, remove oldest events
      console.warn('LocalStorage full, removing old events');
      const trimmedEvents = events.slice(-500); // Keep last 500 events
      localStorage.setItem(EVENTS_KEY, JSON.stringify(trimmedEvents));
    }
  }

  public getEvents(filters?: {
    startDate?: Date;
    endDate?: Date;
    event_name?: string;
  }): QuizEvent[] {
    try {
      const eventsStr = localStorage.getItem(EVENTS_KEY);
      if (!eventsStr) return [];

      let events: QuizEvent[] = JSON.parse(eventsStr);

      // Apply filters
      if (filters) {
        if (filters.startDate) {
          events = events.filter(e => e.timestamp >= filters.startDate!.getTime());
        }
        if (filters.endDate) {
          events = events.filter(e => e.timestamp <= filters.endDate!.getTime());
        }
        if (filters.event_name) {
          events = events.filter(e => e.event_name === filters.event_name);
        }
      }

      return events;
    } catch (error) {
      console.error('Error reading analytics events:', error);
      return [];
    }
  }

  public clearEvents(): void {
    localStorage.removeItem(EVENTS_KEY);
  }

  public getEventCount(event_name: string, filters?: { startDate?: Date; endDate?: Date }): number {
    const events = this.getEvents({ ...filters, event_name });
    return events.length;
  }

  public getUniqueSessionCount(event_name: string, filters?: { startDate?: Date; endDate?: Date }): number {
    const events = this.getEvents({ ...filters, event_name });
    const uniqueSessions = new Set(events.map(e => e.session_id));
    return uniqueSessions.size;
  }
}

export const localAnalytics = new LocalAnalytics();
export default localAnalytics;
