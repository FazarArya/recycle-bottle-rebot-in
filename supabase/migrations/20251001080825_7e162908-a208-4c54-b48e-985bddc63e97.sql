-- Add RLS policies for verification_codes table
-- This table is used for OTP verification during signup/login

-- Policy to allow users to read their own verification code
CREATE POLICY "Users can read their own verification code"
  ON public.verification_codes FOR SELECT
  USING (email = auth.jwt() ->> 'email');

-- Policy to allow authenticated users to insert verification codes
CREATE POLICY "Anyone can insert verification codes"
  ON public.verification_codes FOR INSERT
  WITH CHECK (true);

-- Policy to allow users to update their own verification code
CREATE POLICY "Users can update their own verification code"
  ON public.verification_codes FOR UPDATE
  USING (email = auth.jwt() ->> 'email');

-- Policy to allow users to delete their own verification code
CREATE POLICY "Users can delete their own verification code"
  ON public.verification_codes FOR DELETE
  USING (email = auth.jwt() ->> 'email');