import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, QrCode, ArrowLeft, Coins, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const TemanPencairan = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [barcodeGenerated, setBarcodeGenerated] = useState(false);
  
  // Mock data
  const currentBalance = 12500;
  const minWithdrawal = 5000;
  const conversionRate = 1; // 1 GC = Rp 1

  const handleCairkan = () => {
    const amountNum = parseInt(amount);
    
    if (!amount || amountNum < minWithdrawal) {
      toast({
        title: "Jumlah tidak valid",
        description: `Minimal pencairan adalah ${minWithdrawal} GC`,
        variant: "destructive"
      });
      return;
    }

    if (amountNum > currentBalance) {
      toast({
        title: "Saldo tidak cukup",
        description: "Jumlah yang Anda masukkan melebihi saldo GreenCoin Anda",
        variant: "destructive"
      });
      return;
    }

    // Generate barcode
    setBarcodeGenerated(true);
    toast({
      title: "Barcode berhasil dibuat!",
      description: "Scan barcode ini di kasir T-Mart untuk mendapatkan uang tunai"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20 max-w-3xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/teman/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Cairkan GreenCoin
          </h1>
          <p className="text-muted-foreground">
            Tukar GreenCoin Anda menjadi uang tunai di T-Mart
          </p>
        </div>

        {/* Saldo Card */}
        <Card className="mb-6 border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Saldo GreenCoin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {currentBalance.toLocaleString('id-ID')} GC
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ≈ Rp {(currentBalance * conversionRate).toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>

        {!barcodeGenerated ? (
          <Card>
            <CardHeader>
              <CardTitle>Formulir Pencairan</CardTitle>
              <CardDescription>
                Masukkan jumlah GreenCoin yang ingin dicairkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Jumlah GreenCoin</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder={`Minimal ${minWithdrawal} GC`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={minWithdrawal}
                  max={currentBalance}
                />
                <div className="text-sm text-muted-foreground">
                  Anda akan menerima: Rp {(parseInt(amount) * conversionRate || 0).toLocaleString('id-ID')}
                </div>
              </div>

              <div className="bg-accent/30 p-4 rounded-lg space-y-2">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-semibold mb-2">Cara Pencairan:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Masukkan jumlah GC yang ingin dicairkan</li>
                      <li>Klik tombol "Cairkan" untuk generate barcode</li>
                      <li>Tunjukkan barcode di kasir T-Mart terdekat</li>
                      <li>Terima uang tunai Anda</li>
                    </ol>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleCairkan} 
                className="w-full" 
                size="lg"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Cairkan GreenCoin
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Barcode Pencairan</CardTitle>
                  <CardDescription>
                    Tunjukkan barcode ini di kasir T-Mart
                  </CardDescription>
                </div>
                <Badge className="bg-primary">Aktif</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Barcode Placeholder */}
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center">
                <QrCode className="w-48 h-48 text-foreground" />
                <div className="mt-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Kode Transaksi</div>
                  <div className="font-mono font-bold text-lg">
                    GC-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Jumlah yang akan diterima</div>
                <div className="text-3xl font-bold text-primary">
                  Rp {(parseInt(amount) * conversionRate).toLocaleString('id-ID')}
                </div>
              </div>

              <div className="bg-accent/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-semibold mb-1">Penting!</p>
                    <p>Barcode ini berlaku selama 24 jam. Segera kunjungi T-Mart terdekat untuk mencairkan GreenCoin Anda.</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  setBarcodeGenerated(false);
                  setAmount("");
                }} 
                variant="outline" 
                className="w-full"
              >
                Buat Pencairan Baru
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TemanPencairan;
