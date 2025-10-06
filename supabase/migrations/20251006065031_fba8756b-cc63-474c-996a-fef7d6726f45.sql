-- Create dummy test accounts with complete transaction history

-- Insert test user for TEMAN role (Password: Testing123!)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'teman.test@greencoin.id',
  crypt('Testing123!', gen_salt('bf')),
  now(),
  jsonb_build_object(
    'nama', 'Teman Testing',
    'no_hp', '081234567890',
    'role', 'teman'
  ),
  now(),
  now(),
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Insert test user for MITRA role (Password: Testing123!)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'mitra.test@greencoin.id',
  crypt('Testing123!', gen_salt('bf')),
  now(),
  jsonb_build_object(
    'nama', 'Mitra Testing',
    'no_hp', '081234567891',
    'role', 'mitra'
  ),
  now(),
  now(),
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Insert profiles for test users
INSERT INTO public.profiles (id, nama, email, no_hp, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Teman Testing', 'teman.test@greencoin.id', '081234567890', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'Mitra Testing', 'mitra.test@greencoin.id', '081234567891', now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert users with green coin balances
INSERT INTO public.users (id, saldo_coin, total_botol)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 850, 125),
  ('22222222-2222-2222-2222-222222222222', 1200, 0)
ON CONFLICT (id) DO NOTHING;

-- Insert user roles
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'teman'),
  ('22222222-2222-2222-2222-222222222222', 'mitra')
ON CONFLICT (user_id, role) DO NOTHING;

-- Create test machines for MITRA
INSERT INTO public.machines (id, lokasi, mitra_id, koneksi, status_kapasitas, slot_status, created_at, last_update)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'T-Mart Sudirman', '22222222-2222-2222-2222-222222222222', 'online', 'normal', 
   '[{"slot": 1, "status": "available"}, {"slot": 2, "status": "available"}, {"slot": 3, "status": "available"}]'::jsonb,
   now() - interval '30 days', now()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'T-Mart Thamrin', '22222222-2222-2222-2222-222222222222', 'online', 'hampir_penuh',
   '[{"slot": 1, "status": "full"}, {"slot": 2, "status": "available"}, {"slot": 3, "status": "full"}]'::jsonb,
   now() - interval '20 days', now())
ON CONFLICT (id) DO NOTHING;

-- Insert bottle transactions for TEMAN
INSERT INTO public.transactions_botol (id, user_id, machine_id, total_coin, data_botol, tanggal, created_at)
VALUES 
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 80, 
   '[{"kategori": "1,5 Liter", "jumlah": 5, "coin": 50}, {"kategori": "600ml", "jumlah": 5, "coin": 30}]'::jsonb,
   now() - interval '25 days', now() - interval '25 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 64,
   '[{"kategori": "1,5 Liter", "jumlah": 4, "coin": 40}, {"kategori": "600ml", "jumlah": 4, "coin": 24}]'::jsonb,
   now() - interval '18 days', now() - interval '18 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 100,
   '[{"kategori": "1,5 Liter", "jumlah": 10, "coin": 100}]'::jsonb,
   now() - interval '10 days', now() - interval '10 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 44,
   '[{"kategori": "600ml", "jumlah": 5, "coin": 30}, {"kategori": "350ml", "jumlah": 3, "coin": 12}, {"kategori": "350ml", "jumlah": 1, "coin": 4}]'::jsonb,
   now() - interval '5 days', now() - interval '5 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 62,
   '[{"kategori": "1,5 Liter", "jumlah": 4, "coin": 40}, {"kategori": "600ml", "jumlah": 2, "coin": 12}, {"kategori": "350ml", "jumlah": 2, "coin": 8}]'::jsonb,
   now() - interval '2 days', now() - interval '2 days');

-- Insert coin withdrawal transactions for TEMAN
INSERT INTO public.transactions_coin (id, user_id, jumlah_coin, biaya_layanan, total_diterima, barcode_code, status, expires_at, redeemed_at, timestamp, created_at)
VALUES 
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 200, 10, 190, 'GC-TEMAN-001', 'success', 
   now() - interval '20 days' + interval '30 minutes', now() - interval '20 days' + interval '15 minutes',
   now() - interval '20 days', now() - interval '20 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 150, 8, 142, 'GC-TEMAN-002', 'success',
   now() - interval '12 days' + interval '30 minutes', now() - interval '12 days' + interval '10 minutes',
   now() - interval '12 days', now() - interval '12 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 100, 5, 95, 'GC-TEMAN-003', 'success',
   now() - interval '6 days' + interval '30 minutes', now() - interval '6 days' + interval '20 minutes',
   now() - interval '6 days', now() - interval '6 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 50, 3, 47, 'GC-TEMAN-004', 'failed',
   now() - interval '3 days' + interval '30 minutes', null,
   now() - interval '3 days', now() - interval '3 days');

-- Insert bottle transactions for MITRA machines (using TEMAN test account as customer)
INSERT INTO public.transactions_botol (id, user_id, machine_id, total_coin, data_botol, tanggal, created_at)
VALUES 
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 120,
   '[{"kategori": "1,5 Liter", "jumlah": 8, "coin": 80}, {"kategori": "600ml", "jumlah": 5, "coin": 30}, {"kategori": "350ml", "jumlah": 2, "coin": 8}]'::jsonb,
   now() - interval '22 days', now() - interval '22 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 96,
   '[{"kategori": "1,5 Liter", "jumlah": 6, "coin": 60}, {"kategori": "600ml", "jumlah": 6, "coin": 36}]'::jsonb,
   now() - interval '15 days', now() - interval '15 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 140,
   '[{"kategori": "1,5 Liter", "jumlah": 10, "coin": 100}, {"kategori": "600ml", "jumlah": 5, "coin": 30}, {"kategori": "350ml", "jumlah": 2, "coin": 8}]'::jsonb,
   now() - interval '14 days', now() - interval '14 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 88,
   '[{"kategori": "1,5 Liter", "jumlah": 5, "coin": 50}, {"kategori": "600ml", "jumlah": 4, "coin": 24}, {"kategori": "350ml", "jumlah": 3, "coin": 12}]'::jsonb,
   now() - interval '8 days', now() - interval '8 days'),
  
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 76,
   '[{"kategori": "1,5 Liter", "jumlah": 4, "coin": 40}, {"kategori": "600ml", "jumlah": 6, "coin": 36}]'::jsonb,
   now() - interval '4 days', now() - interval '4 days');

-- Insert coin withdrawal transactions for MITRA
INSERT INTO public.transactions_coin (id, user_id, jumlah_coin, biaya_layanan, total_diterima, barcode_code, status, expires_at, redeemed_at, timestamp, created_at)
VALUES 
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 300, 15, 285, 'GC-MITRA-001', 'success',
   now() - interval '16 days' + interval '30 minutes', now() - interval '16 days' + interval '18 minutes',
   now() - interval '16 days', now() - interval '16 days'),
  
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 500, 25, 475, 'GC-MITRA-002', 'success',
   now() - interval '9 days' + interval '30 minutes', now() - interval '9 days' + interval '12 minutes',
   now() - interval '9 days', now() - interval '9 days'),
  
  (gen_random_uuid(), '22222222-2222-2222-2222-222222222222', 250, 13, 237, 'GC-MITRA-003', 'pending',
   now() - interval '2 days' + interval '30 minutes', null,
   now() - interval '2 days', now() - interval '2 days');