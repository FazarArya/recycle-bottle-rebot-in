import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BottleData {
  kategori: string;
  nama: string;
  kode_barcode: string;
  coin: number;
  jumlah: number;
}

interface ScanResult {
  bottleData: BottleData[];
  totalCoin: number;
  machineLocation: string;
}

export function useBottleScanner(userId: string | undefined, onScanComplete: (result: ScanResult) => void) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Subscribe to bottle transactions for this user
    const channel = supabase
      .channel('bottle-scans')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions_botol',
          filter: `user_id=eq.${userId}`
        },
        async (payload) => {
          console.log('New bottle scan detected:', payload);
          
          const newTransaction = payload.new;
          
          // Get machine location
          const { data: machine } = await supabase
            .from('machines')
            .select('lokasi')
            .eq('id', newTransaction.machine_id)
            .single();

          // Parse bottle data
          const bottleData = newTransaction.data_botol as BottleData[];
          
          onScanComplete({
            bottleData,
            totalCoin: newTransaction.total_coin,
            machineLocation: machine?.lokasi || 'Unknown'
          });

          // Clear session storage
          sessionStorage.removeItem('active_kode_mitra');
          sessionStorage.removeItem('active_machine_id');
          sessionStorage.removeItem('active_machine_lokasi');

          setIsListening(false);
        }
      )
      .subscribe();

    setIsListening(true);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onScanComplete]);

  return { isListening };
}
