
import { serve } from "https://deno.fresh.runtime.dev";

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
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { amount } = await req.json();

    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount');
    }

    // Get MonCash credentials from environment variables
    const clientId = Deno.env.get('MONCASH_CLIENT_ID');
    const clientSecret = Deno.env.get('MONCASH_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      throw new Error('MonCash credentials not configured');
    }

    // TODO: Implement actual MonCash API integration here
    // For now, we'll just return a mock response
    const mockOrderId = crypto.randomUUID();
    
    console.log(`Creating MonCash payment order for amount: ${amount} HTG`);

    return new Response(
      JSON.stringify({
        orderId: mockOrderId,
        redirectUrl: `https://sandbox.moncashbutton.digicelgroup.com/Moncash-middleware/Payment/Redirect?orderId=${mockOrderId}`,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing MonCash payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
