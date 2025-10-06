-- Update coin values based on new pricing system
-- 1 coin = Rp 10
-- Botol 1.5L: Customer gets Rp 100 = 10 coin
-- Botol 600ml: Customer gets Rp 60 = 6 coin  
-- Botol 350ml: Customer gets Rp 40 = 4 coin

UPDATE botol_types 
SET coin = 10 
WHERE nama = 'Botol 1,5 Liter';

UPDATE botol_types 
SET coin = 6 
WHERE nama = 'Botol 600ml';

UPDATE botol_types 
SET coin = 4 
WHERE nama = 'Botol 350ml';

-- Add status column to transactions_coin table to track barcode redemption
ALTER TABLE transactions_coin 
ADD COLUMN IF NOT EXISTS barcode_code text,
ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS redeemed_at timestamp with time zone;

-- Add index for faster barcode lookups
CREATE INDEX IF NOT EXISTS idx_transactions_coin_barcode 
ON transactions_coin(barcode_code) 
WHERE barcode_code IS NOT NULL;