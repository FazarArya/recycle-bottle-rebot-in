-- Hapus user dummy yang bermasalah
DELETE FROM auth.users WHERE email IN ('teman.test@greencoin.id', 'mitra.test@greencoin.id');

-- Buat ulang user dengan konfigurasi lengkap
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
)
VALUES
  -- Teman Test User
  (
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'teman.test@greencoin.id',
    crypt('Testing123!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"nama":"Teman Testing","no_hp":"081234567890","role":"teman"}',
    false,
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    ''
  ),
  -- Mitra Test User
  (
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'mitra.test@greencoin.id',
    crypt('Testing123!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"nama":"Mitra Testing","no_hp":"082345678901","role":"mitra"}',
    false,
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    ''
  );

-- Insert identities untuk email provider dengan provider_id
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    '{"sub":"11111111-1111-1111-1111-111111111111","email":"teman.test@greencoin.id"}',
    'email',
    now(),
    now(),
    now()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    '{"sub":"22222222-2222-2222-2222-222222222222","email":"mitra.test@greencoin.id"}',
    'email',
    now(),
    now(),
    now()
  );