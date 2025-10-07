import { supabase } from '@/integrations/supabase/client';
import tracking from './tracking';

/**
 * Meta Conversions API integration
 * Sends server-side events to Meta for better tracking
 */

const sendEvent = async (eventName: string, eventData?: any) => {
  try {
    const trackingData = tracking.getData();
    
    const payload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: window.location.href,
      user_data: {
        client_user_agent: navigator.userAgent,
        fbp: trackingData.fbp,
        fbc: trackingData.fbc,
        em: trackingData.em,
        ph: trackingData.ph,
      },
      custom_data: eventData || {},
      event_id: trackingData.event_id,
    };

    const { error } = await supabase.functions.invoke('meta-capi', {
      body: payload,
    });

    if (error) {
      console.error('CAPI error:', error);
    }
  } catch (err) {
    console.error('Failed to send CAPI event:', err);
  }
};

export default {
  sendEvent,
};
