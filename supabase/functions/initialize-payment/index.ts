import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Allows the browser to communicate with the Edge Function
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    // Get Supabase environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");

    if (!paystackSecretKey) {
      throw new Error("Paystack secret key is missing");
    }

    // Connect to Supabase using the logged-in user's session
    const supabase = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: {
            Authorization: req.headers.get("Authorization") ?? "",
          },
        },
      }
    );

    // Get the logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          error: "You must be logged in to make a payment",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get data sent from React
    const {
      propertyId,
      amount,
      paymentType,
    } = await req.json();

    // Validate the data
    if (!propertyId || !amount) {
      return new Response(
        JSON.stringify({
          error: "propertyId and amount are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Create a unique payment reference
    const reference = `KAWUTE-${Date.now()}-${crypto.randomUUID()
      .slice(0, 8)
      .toUpperCase()}`;

    // Save payment as pending
    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        property_id: propertyId,
        amount: amount,
        currency: "GHS",
        reference: reference,
        status: "pending",
        payment_type: paymentType || "reservation_deposit",
      });

    if (paymentError) {
      console.error("Payment database error:", paymentError);

      return new Response(
        JSON.stringify({
          error: paymentError.message,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Paystack expects Ghana Cedis converted to Pesewas
    const amountInPesewas = Math.round(Number(amount) * 100);

    // Send payment request to Paystack
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          amount: amountInPesewas,
          currency: "GHS",
          reference: reference,

          // Change this later to your real website URL
          callback_url: "https://your-website.com/payment-success",
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error("Paystack error:", paystackData);

      return new Response(
        JSON.stringify({
          error: "Could not initialize Paystack payment",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Send the Paystack checkout URL back to React
    return new Response(
      JSON.stringify({
        authorization_url: paystackData.data.authorization_url,
        reference: reference,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});