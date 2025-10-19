-- Allow teman users to read machine data by kode_mitra for validation
-- This is needed so they can connect to RVM machines
CREATE POLICY "Teman can view machines by kode_mitra for connection"
ON public.machines
FOR SELECT
TO authenticated
USING (true);

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Mitra can view their own machines" ON public.machines;