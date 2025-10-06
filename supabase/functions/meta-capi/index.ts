import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PIXEL_ID = "1014393800794226";
const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!META_ACCESS_TOKEN) {
      console.error('META_ACCESS_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'META_ACCESS_TOKEN not configured' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const payload = await req.json();
    console.log('Received CAPI event:', payload);

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [payload],
        }),
      }
    );

    const result = await response.json();
    console.log('Meta CAPI response:', result);

    if (!response.ok) {
      console.error('Meta CAPI error:', result);
      return new Response(
        JSON.stringify({ error: 'Failed to send event to Meta', details: result }), 
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, result }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in meta-capi function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
