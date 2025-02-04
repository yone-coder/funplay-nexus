
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const businessKey = Deno.env.get('MONCASH_BUSINESS_KEY');
    const apiKey = Deno.env.get('MONCASH_API_KEY');

    if (!businessKey || !apiKey) {
      throw new Error('MonCash credentials not configured');
    }

    const orderId = crypto.randomUUID();

    // TODO: Implement RSA encryption of amount and orderId
    // For now, we're proceeding without encryption for development
    
    console.log(`Creating MonCash payment order for amount: ${amount} HTG with orderId: ${orderId}`);

    try {
      // Make request to MonCash REST API to get payment token
      const response = await fetch(
        `https://moncashbutton.digicelgroup.com/Moncash-middleware/Checkout/Rest/${businessKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount.toString(),
            orderId: orderId,
          })
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create MonCash payment');
      }

      return new Response(
        JSON.stringify({
          success: true,
          orderId: orderId,
          redirectUrl: `https://moncashbutton.digicelgroup.com/Moncash-middleware/Checkout/Payment/Redirect/${data.token}`,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('MonCash API error:', error);
      throw new Error('Failed to communicate with MonCash API');
    }
  } catch (error) {
    console.error('Error processing MonCash payment:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
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
