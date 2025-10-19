import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Scan, Loader2 } from "lucide-react";

interface ScanBottleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  onSuccess: () => void;
}

export function ScanBottleModal({ open, onOpenChange, userId, onSuccess }: ScanBottleModalProps) {
  const [kodeMitra, setKodeMitra] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kodeMitra.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon masukkan kode mitra RVM",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Verify machine exists and get machine_id
      const { data: machine, error: machineError } = await supabase
        .from('machines')
        .select('id, lokasi, mitra_id')
        .eq('kode_mitra', kodeMitra.toUpperCase())
        .single();

      if (machineError || !machine) {
        toast({
          variant: "destructive",
          title: "Kode Mitra Tidak Valid",
          description: "Kode mitra RVM tidak ditemukan. Pastikan kode yang Anda masukkan benar.",
        });
        setIsSubmitting(false);
        return;
      }

      // In real implementation, this would be triggered by ESP32 sending JSON data
      // For now, we'll simulate it with a mock transaction
      toast({
        title: "Menunggu Scan Botol",
        description: `Terhubung ke ${machine.lokasi}. Silakan masukkan botol ke mesin RVM.`,
      });

      // Store the kode_mitra in session storage for the scan process
      sessionStorage.setItem('active_kode_mitra', kodeMitra.toUpperCase());
      sessionStorage.setItem('active_machine_id', machine.id);
      sessionStorage.setItem('active_machine_lokasi', machine.lokasi);

      onOpenChange(false);
      setKodeMitra("");
      onSuccess();

    } catch (error: any) {
      console.error('Error connecting to RVM:', error);
      toast({
        variant: "destructive",
        title: "Gagal Terhubung",
        description: "Terjadi kesalahan saat menghubungkan ke mesin RVM.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-primary" />
            Scan Botol di RVM
          </DialogTitle>
          <DialogDescription>
            Masukkan kode mitra yang tertera pada mesin RVM untuk memulai proses scan botol
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kodeMitra">Kode Mitra RVM</Label>
            <Input
              id="kodeMitra"
              placeholder="Contoh: RVM001"
              value={kodeMitra}
              onChange={(e) => setKodeMitra(e.target.value.toUpperCase())}
              className="uppercase"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Kode mitra dapat ditemukan pada stiker di mesin RVM
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setKodeMitra("");
              }}
              disabled={isSubmitting}
              className="flex-1"
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menghubungkan...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 mr-2" />
                  Hubungkan
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
