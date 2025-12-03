import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowLeft, Coins, Info, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUserData } from "@/hooks/useUserData";
import Barcode from "react-barcode";

const TemanPencairan = () => {
  const { toast } = useToast();
  const { userData } = useUserData();
  const [amount, setAmount] = useState("");
  const [barcodeGenerated, setBarcodeGenerated] = useState(false);
  const [barcodeCode, setBarcodeCode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<'pending' | 'success' | 'failed' | null>(null);
  
  const currentBalance = userData?.saldo_coin || 0;
  const minWithdrawal = 500; // Minimal 500 coin = Rp 5000
  const conversionRate = 10; // 1 GC = Rp 10
  const serviceFee = 0; // Tidak ada biaya layanan

  // Countdown timer effect
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining("00:00:00");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleCairkan = async () => {
    const amountNum = parseInt(amount);
    
    if (!amount || amountNum < minWithdrawal) {
      toast({
        title: "Jumlah tidak valid",
        description: `Minimal pencairan adalah ${minWithdrawal} GC (Rp ${minWithdrawal * conversionRate})`,
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

    try {
      // Generate unique barcode
      const code = `GC${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30); // 30 minutes validity

      // Calculate amounts
      const totalReceived = amountNum * conversionRate;

      // Insert transaction to database
      const { data, error } = await supabase
        .from('transactions_coin')
        .insert({
          user_id: userData?.id,
          jumlah_coin: amountNum,
          total_diterima: totalReceived,
          biaya_layanan: serviceFee,
          status: 'pending',
          barcode_code: code,
          expires_at: expires.toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setBarcodeCode(code);
      setTransactionId(data.id);
      setExpiresAt(expires);
      setBarcodeGenerated(true);
      setTransactionStatus('pending');

      toast({
        title: "Barcode berhasil dibuat!",
        description: "Scan barcode ini di kasir T-Mart untuk mendapatkan uang tunai"
      });
    } catch (error: any) {
      toast({
        title: "Gagal membuat barcode",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const simulateTransaction = (success: boolean) => {
    if (success) {
      setTransactionStatus('success');
      toast({
        title: "✅ Transaksi Berhasil!",
        description: "Terima kasih telah menukar GreenCoin Anda di T-Mart",
      });
    } else {
      setTransactionStatus('failed');
      toast({
        title: "❌ Transaksi Gagal",
        description: "Terjadi kesalahan. Silakan hubungi kasir",
        variant: "destructive"
      });
    }
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
        ) : transactionStatus === 'success' ? (
          <Card className="border-2 border-green-500">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">TRANSAKSI BERHASIL</h2>
                  <p className="text-muted-foreground">
                    Terima kasih, kawan! ReBot.In ini Amanah, kamu bisa daur ulang lagi di ReBot.In untuk masa depan bumi yang lebih baik
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Jumlah yang diterima</div>
                  <div className="text-3xl font-bold text-green-600">
                    Rp {(parseInt(amount) * conversionRate).toLocaleString('id-ID')}
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setBarcodeGenerated(false);
                    setTransactionStatus(null);
                    setAmount("");
                  }} 
                  className="w-full"
                >
                  Buat Pencairan Baru
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : transactionStatus === 'failed' ? (
          <Card className="border-2 border-red-500">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                    <XCircle className="w-12 h-12 text-red-500" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-600 mb-2">TRANSAKSI GAGAL</h2>
                  <p className="text-muted-foreground">
                    Yuk coba sekali lagi kawan! Biarkan penukaran kamu lebih lancar
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setBarcodeGenerated(false);
                    setTransactionStatus(null);
                    setAmount("");
                  }} 
                  variant="outline"
                  className="w-full"
                >
                  Coba Lagi
                </Button>
              </div>
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
              {/* Rincian Transaksi */}
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jumlah yang ditukar</span>
                  <span className="font-semibold">{parseInt(amount).toLocaleString('id-ID')} GC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Biaya Layanan</span>
                  <span className="font-semibold">Rp {serviceFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t">
                  <span>Total Diterima</span>
                  <span className="text-primary">{(parseInt(amount) * conversionRate).toLocaleString('id-ID')} IDR</span>
                </div>
              </div>

              {/* Barcode */}
              <div className="bg-white p-6 rounded-lg flex flex-col items-center justify-center">
                <Barcode 
                  value={barcodeCode} 
                  height={80}
                  displayValue={true}
                  fontSize={14}
                />
              </div>

              {/* Countdown Timer */}
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 font-mono">
                  {timeRemaining || "30:00:00"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Waktu berlaku barcode
                </div>
              </div>

              {/* Simulasi untuk testing */}
              <div className="space-y-2 pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center mb-2">
                  Testing: Simulasi status transaksi
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => simulateTransaction(true)}
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-600"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Berhasil
                  </Button>
                  <Button 
                    onClick={() => simulateTransaction(false)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Gagal
                  </Button>
                </div>
              </div>

              <div className="bg-accent/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground">
                    <p className="font-semibold mb-1">Penting!</p>
                    <p>Barcode ini berlaku selama 30 menit. Segera kunjungi T-Mart terdekat untuk mencairkan GreenCoin Anda.</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  setBarcodeGenerated(false);
                  setTransactionStatus(null);
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
