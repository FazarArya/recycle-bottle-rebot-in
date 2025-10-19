-- Add alamat (address) field to profiles
ALTER TABLE public.profiles 
ADD COLUMN alamat text;

-- Add komisi_mitra (mitra commission) field to users table
ALTER TABLE public.users 
ADD COLUMN komisi_mitra integer NOT NULL DEFAULT 0;

-- Update existing machine to link to a mitra user (we'll use the first mitra user)
-- First, let's create a sample mitra link
UPDATE public.machines 
SET mitra_id = (
  SELECT user_id 
  FROM public.user_roles 
  WHERE role = 'mitra' 
  LIMIT 1
)
WHERE kode_mitra IN ('RVM001', 'RVM002', 'RVM010');

-- Insert a new machine with RVM010 code if it doesn't exist
INSERT INTO public.machines (id, kode_mitra, lokasi, status_kapasitas, koneksi, slot_status, mitra_id)
VALUES (
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'RVM010',
  'Kampus Univ Mercu Buana - Jakarta',
  'normal',
  'online',
  '[]'::jsonb,
  (SELECT user_id FROM public.user_roles WHERE role = 'mitra' LIMIT 1)
)
ON CONFLICT (id) DO NOTHING;