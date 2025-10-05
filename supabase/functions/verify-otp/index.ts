import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otp }: VerifyOTPRequest = await req.json();
    
    console.log("Verifying OTP for email:", email);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get verification code
    const { data: verificationData, error: fetchError } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('kode_otp', otp)
      .single();

    if (fetchError || !verificationData) {
      console.error("OTP not found or error:", fetchError);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Kode OTP tidak valid" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    // Check if OTP has expired
    const expiresAt = new Date(verificationData.expires_at);
    const now = new Date();
    
    if (now > expiresAt) {
      console.log("OTP expired");
      
      // Delete expired OTP
      await supabase
        .from('verification_codes')
        .delete()
        .eq('email', email);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Kode OTP telah kedaluwarsa" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    console.log("OTP verified successfully, updating user email confirmation");

    // Mark user's email as confirmed in auth.users
    const { data: users, error: getUserError } = await supabase.auth.admin.listUsers();
    
    if (getUserError) {
      console.error("Error fetching users:", getUserError);
      throw new Error(`Failed to fetch users: ${getUserError.message}`);
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "User tidak ditemukan" 
        }),
        {
          status: 404,
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          },
        }
      );
    }

    // Update user email confirmation
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { email_confirm: true }
    );

    if (updateError) {
      console.error("Error updating user:", updateError);
      throw new Error(`Failed to update user: ${updateError.message}`);
    }

    // Delete used OTP
    await supabase
      .from('verification_codes')
      .delete()
      .eq('email', email);

    console.log("User email confirmed successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email berhasil diverifikasi" 
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
    console.error("Error in verify-otp function:", error);
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
