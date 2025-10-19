-- Add kode_mitra to machines table
ALTER TABLE public.machines
ADD COLUMN kode_mitra text;

-- Update ALL existing machines with unique codes
UPDATE public.machines
SET kode_mitra = 'RVM001'
WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

UPDATE public.machines
SET kode_mitra = 'RVM002'
WHERE id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

-- Make kode_mitra NOT NULL and UNIQUE after setting all values
ALTER TABLE public.machines
ALTER COLUMN kode_mitra SET NOT NULL;

ALTER TABLE public.machines
ADD CONSTRAINT machines_kode_mitra_unique UNIQUE (kode_mitra);

-- Add index for faster lookups
CREATE INDEX idx_machines_kode_mitra ON public.machines(kode_mitra);