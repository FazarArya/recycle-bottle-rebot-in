-- Create app_role enum for user roles
CREATE TYPE app_role AS ENUM ('teman', 'mitra', 'admin');

-- Create profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  no_hp TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table (for role management)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create users table (for app-specific user data)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  saldo_coin INTEGER NOT NULL DEFAULT 0,
  total_botol INTEGER NOT NULL DEFAULT 0
);

-- Create verification_codes table
CREATE TABLE public.verification_codes (
  email TEXT PRIMARY KEY,
  kode_otp TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create botol_types table
CREATE TABLE public.botol_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama TEXT NOT NULL,
  kode_barcode TEXT UNIQUE NOT NULL,
  kategori TEXT NOT NULL,
  coin INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create machines table
CREATE TABLE public.machines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mitra_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  lokasi TEXT NOT NULL,
  slot_status JSONB NOT NULL DEFAULT '[]',
  koneksi TEXT NOT NULL DEFAULT 'offline',
  last_update TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status_kapasitas TEXT NOT NULL DEFAULT 'normal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create transactions_botol table
CREATE TABLE public.transactions_botol (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  tanggal TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  machine_id UUID REFERENCES public.machines(id) ON DELETE SET NULL,
  data_botol JSONB NOT NULL,
  total_coin INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create transactions_coin table
CREATE TABLE public.transactions_coin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  jumlah_coin INTEGER NOT NULL,
  biaya_layanan INTEGER NOT NULL DEFAULT 0,
  total_diterima INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create machine_status_logs table
CREATE TABLE public.machine_status_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID REFERENCES public.machines(id) ON DELETE CASCADE NOT NULL,
  waktu TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL,
  pesan TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.botol_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions_botol ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions_coin ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machine_status_logs ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, nama, email, no_hp)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nama', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'no_hp'
  );
  
  -- Insert into users table
  INSERT INTO public.users (id)
  VALUES (NEW.id);
  
  -- Assign default role (teman) if no role specified
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'teman')
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for users
CREATE POLICY "Users can view their own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for botol_types (public read)
CREATE POLICY "Anyone can view botol types"
  ON public.botol_types FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for machines
CREATE POLICY "Mitra can view their own machines"
  ON public.machines FOR SELECT
  TO authenticated
  USING (
    mitra_id = auth.uid() OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Mitra can update their own machines"
  ON public.machines FOR UPDATE
  TO authenticated
  USING (
    mitra_id = auth.uid() OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for transactions_botol
CREATE POLICY "Users can view their own bottle transactions"
  ON public.transactions_botol FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.machines m
      WHERE m.id = machine_id AND m.mitra_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own bottle transactions"
  ON public.transactions_botol FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for transactions_coin
CREATE POLICY "Users can view their own coin transactions"
  ON public.transactions_coin FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own coin transactions"
  ON public.transactions_coin FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for machine_status_logs
CREATE POLICY "Mitra can view logs for their machines"
  ON public.machine_status_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.machines m
      WHERE m.id = machine_id AND m.mitra_id = auth.uid()
    ) OR
    public.has_role(auth.uid(), 'admin')
  );

-- Insert sample botol types
INSERT INTO public.botol_types (nama, kode_barcode, kategori, coin) VALUES
  ('Botol Plastik 600ml', 'BTL600', 'Plastik', 10),
  ('Botol Plastik 1.5L', 'BTL1500', 'Plastik', 15),
  ('Botol Kaca 330ml', 'BTLKS330', 'Kaca', 20),
  ('Botol Aluminium 500ml', 'BTLAL500', 'Aluminium', 25);