import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Coins, Recycle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BottleScannedNotificationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bottleData: {
    kategori: string;
    nama: string;
    coin: number;
  }[];
  totalCoin: number;
  machineLocation: string;
}

export function BottleScannedNotification({
  open,
  onOpenChange,
  bottleData,
  totalCoin,
  machineLocation
}: BottleScannedNotificationProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            Botol Berhasil Di-scan!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Success Animation */}
          <div className="flex justify-center py-4">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center animate-pulse">
                <Recycle className="w-10 h-10 text-green-500" />
              </div>
            </div>
          </div>

          {/* Machine Info */}
          <Card className="bg-muted/50">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Lokasi Mesin</p>
              <p className="font-semibold">{machineLocation}</p>
            </CardContent>
          </Card>

          {/* Bottle Details */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Detail Botol</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {bottleData.map((bottle, index) => (
                <Card key={index}>
                  <CardContent className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{bottle.nama}</p>
                      <p className="text-xs text-muted-foreground">{bottle.kategori}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      <Coins className="w-4 h-4" />
                      +{bottle.coin} GC
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Total Reward */}
          <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total GreenCoin Didapat</p>
                  <p className="text-2xl font-bold text-primary">{totalCoin} GC</p>
                </div>
                <Coins className="w-12 h-12 text-primary" />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Selesai
            </Button>
            <Button 
              onClick={() => {
                onOpenChange(false);
                // Could trigger another scan
              }}
              className="flex-1"
            >
              Scan Lagi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
