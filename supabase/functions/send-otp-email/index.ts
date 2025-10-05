import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface SendOTPRequest {
  email: string;
  nama: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, nama }: SendOTPRequest = await req.json();
    
    console.log("Generating OTP for email:", email);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry to 10 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Save OTP to database using service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Delete any existing OTP for this email
    await supabase
      .from('verification_codes')
      .delete()
      .eq('email', email);
    
    // Insert new OTP
    const { error: insertError } = await supabase
      .from('verification_codes')
      .insert({
        email,
        kode_otp: otp,
        expires_at: expiresAt.toISOString()
      });

    if (insertError) {
      console.error("Error inserting OTP:", insertError);
      throw new Error(`Failed to save OTP: ${insertError.message}`);
    }

    console.log("OTP saved to database, sending email...");

    // Send OTP via email
    const emailResponse = await resend.emails.send({
      from: "Rebot.in <onboarding@resend.dev>",
      to: [email],
      subject: "Kode Verifikasi Rebot.in",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #22c55e;">Selamat Datang di Rebot.in!</h1>
          <p>Halo ${nama},</p>
          <p>Terima kasih telah mendaftar di Rebot.in. Gunakan kode OTP berikut untuk verifikasi akun Anda:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="color: #22c55e; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h2>
          </div>
          <p style="color: #ef4444;">Kode ini akan kedaluwarsa dalam 10 menit.</p>
          <p>Jika Anda tidak mendaftar di Rebot.in, abaikan email ini.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">Email ini dikirim oleh Rebot.in - Platform Penukaran Botol Plastik</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "OTP sent successfully" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-otp-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
