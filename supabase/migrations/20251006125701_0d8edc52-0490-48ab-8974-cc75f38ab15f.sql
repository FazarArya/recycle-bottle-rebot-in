-- Add transaction history and balance for test accounts

-- First, let's add some bottle transactions for teman test account
INSERT INTO public.transactions_botol (
  user_id,
  machine_id,
  tanggal,
  total_coin,
  data_botol,
  created_at
)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'),
  (SELECT id FROM public.machines LIMIT 1),
  now() - interval '5 days',
  150,
  '[{"kategori": "PET", "jumlah": 10, "coin_per_botol": 15}]'::jsonb,
  now() - interval '5 days'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'teman.test@greencoin.id')
UNION ALL
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'),
  (SELECT id FROM public.machines LIMIT 1),
  now() - interval '3 days',
  200,
  '[{"kategori": "PET", "jumlah": 10, "coin_per_botol": 15}, {"kategori": "HDPE", "jumlah": 5, "coin_per_botol": 10}]'::jsonb,
  now() - interval '3 days'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'teman.test@greencoin.id')
UNION ALL
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'),
  (SELECT id FROM public.machines LIMIT 1),
  now() - interval '1 day',
  120,
  '[{"kategori": "PET", "jumlah": 8, "coin_per_botol": 15}]'::jsonb,
  now() - interval '1 day'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'teman.test@greencoin.id');

-- Add coin withdrawal transactions for teman test account
INSERT INTO public.transactions_coin (
  user_id,
  timestamp,
  jumlah_coin,
  biaya_layanan,
  total_diterima,
  status,
  barcode_code,
  redeemed_at,
  created_at
)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'),
  now() - interval '6 days',
  100,
  5,
  950,
  'completed',
  'TMT' || LPAD(floor(random() * 1000000)::text, 6, '0'),
  now() - interval '6 days' + interval '10 minutes',
  now() - interval '6 days'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'teman.test@greencoin.id')
UNION ALL
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'),
  now() - interval '2 days',
  200,
  10,
  1900,
  'completed',
  'TMT' || LPAD(floor(random() * 1000000)::text, 6, '0'),
  now() - interval '2 days' + interval '15 minutes',
  now() - interval '2 days'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'teman.test@greencoin.id');

-- Add bottle transactions for mitra test account (from their machines)
INSERT INTO public.transactions_botol (
  user_id,
  machine_id,
  tanggal,
  total_coin,
  data_botol,
  created_at
)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'), -- Regular user depositing
  (SELECT id FROM public.machines WHERE mitra_id = (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id') LIMIT 1),
  now() - interval '4 days',
  180,
  '[{"kategori": "PET", "jumlah": 12, "coin_per_botol": 15}]'::jsonb,
  now() - interval '4 days'
WHERE EXISTS (SELECT 1 FROM public.machines WHERE mitra_id = (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id'))
UNION ALL
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'),
  (SELECT id FROM public.machines WHERE mitra_id = (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id') LIMIT 1),
  now() - interval '2 days',
  250,
  '[{"kategori": "PET", "jumlah": 15, "coin_per_botol": 15}, {"kategori": "PP", "jumlah": 5, "coin_per_botol": 5}]'::jsonb,
  now() - interval '2 days'
WHERE EXISTS (SELECT 1 FROM public.machines WHERE mitra_id = (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id'))
UNION ALL
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id'),
  (SELECT id FROM public.machines WHERE mitra_id = (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id') LIMIT 1),
  now() - interval '1 day',
  300,
  '[{"kategori": "PET", "jumlah": 20, "coin_per_botol": 15}]'::jsonb,
  now() - interval '1 day'
WHERE EXISTS (SELECT 1 FROM public.machines WHERE mitra_id = (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id'));

-- Add coin withdrawal transactions for mitra test account (commission withdrawals)
INSERT INTO public.transactions_coin (
  user_id,
  timestamp,
  jumlah_coin,
  biaya_layanan,
  total_diterima,
  status,
  barcode_code,
  redeemed_at,
  created_at
)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id'),
  now() - interval '5 days',
  500,
  25,
  4750,
  'completed',
  'TMT' || LPAD(floor(random() * 1000000)::text, 6, '0'),
  now() - interval '5 days' + interval '20 minutes',
  now() - interval '5 days'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'mitra.test@greencoin.id')
UNION ALL
SELECT 
  (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id'),
  now() - interval '3 days',
  300,
  15,
  2850,
  'completed',
  'TMT' || LPAD(floor(random() * 1000000)::text, 6, '0'),
  now() - interval '3 days' + interval '12 minutes',
  now() - interval '3 days'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE email = 'mitra.test@greencoin.id');

-- Update saldo_coin and total_botol for teman test account
UPDATE public.users
SET 
  saldo_coin = 170,  -- Remaining balance after transactions
  total_botol = 28   -- Total bottles deposited
WHERE id = (SELECT id FROM auth.users WHERE email = 'teman.test@greencoin.id');

-- Update saldo_coin for mitra test account (commission balance)
UPDATE public.users
SET 
  saldo_coin = 730,  -- Commission balance (10% of 7300 coins from transactions)
  total_botol = 0    -- Mitra doesn't deposit bottles
WHERE id = (SELECT id FROM auth.users WHERE email = 'mitra.test@greencoin.id');