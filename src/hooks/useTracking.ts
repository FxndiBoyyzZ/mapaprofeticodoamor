import { useEffect } from 'react';
import tracking from '@/lib/tracking';
import localAnalytics from '@/lib/localAnalytics';

/**
 * Hook for tracking integration
 * Handles Pixel, CAPI events and local analytics storage
 */

declare global {
  interface Window {
    fbq: any;
  }
}

export const useTracking = () => {
  const trackEvent = (
    eventName: string,
    data?: any
  ) => {
    if (!tracking.hasConsent()) {
      return;
    }

    // Store event locally for dashboard
    const trackingData = tracking.getData();
    localAnalytics.trackEvent({
      event_name: eventName,
      ...data,
      ...trackingData,
    });

    // Fire Pixel event
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, data || {}, {
        eventID: trackingData.event_id,
      });
    }
  };

  const trackPageView = () => {
    localAnalytics.trackEvent({ event_name: 'PageView' });
    trackEvent('PageView');
  };

  const trackViewContent = (contentData?: {
    content_name?: string;
    content_category?: string;
  }) => {
    localAnalytics.trackEvent({ 
      event_name: 'ViewContent',
      ...contentData 
    });
    trackEvent('ViewContent', contentData);
  };

  const trackLead = () => {
    localAnalytics.trackEvent({ event_name: 'Lead' });
    trackEvent('Lead');
  };

  const trackInitiateCheckout = (value?: number) => {
    localAnalytics.trackEvent({ 
      event_name: 'InitiateCheckout',
      value,
    });
    trackEvent('InitiateCheckout', {
      value,
      currency: 'BRL',
    });
  };

  const trackPurchase = (value: number, contentName?: string) => {
    localAnalytics.trackEvent({ 
      event_name: 'Purchase',
      value,
    });
    trackEvent('Purchase', {
      value,
      currency: 'BRL',
      content_name: contentName,
    });
  };

  const trackQuizStep = (step: number, answer?: string) => {
    // Store locally
    localAnalytics.trackEvent({
      event_name: 'quiz_step',
      step,
      answer,
    });

    // Push to dataLayer for GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'quiz_step',
      step,
      answer,
    });
  };

  const trackQuizStart = () => {
    localAnalytics.trackEvent({ event_name: 'quiz_start' });
  };

  const trackQuizComplete = (profile?: any) => {
    localAnalytics.trackEvent({ 
      event_name: 'quiz_complete',
      perfil_sintese: profile ? `${profile.tempoEspiritual} | ${profile.perfilAmor}` : undefined,
      tempo_espiritual: profile?.tempoEspiritual,
      perfil_amor: profile?.perfilAmor,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackViewContent,
    trackLead,
    trackInitiateCheckout,
    trackPurchase,
    trackQuizStep,
    trackQuizStart,
    trackQuizComplete,
  };
};

export default useTracking;
