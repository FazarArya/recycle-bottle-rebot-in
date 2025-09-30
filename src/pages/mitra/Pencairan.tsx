import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, ArrowLeft, Coins, Info, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const MitraPencairan = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  
  // Mock data
  const currentBalance = 8500;
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
        description: "Jumlah yang Anda masukkan melebihi saldo komisi GreenCoin Anda",
        variant: "destructive"
      });
      return;
    }

    if (!bank || !accountNumber) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi data bank dan nomor rekening",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pencairan berhasil diajukan!",
      description: "Dana akan ditransfer ke rekening Anda dalam 1-3 hari kerja"
    });

    // Reset form
    setAmount("");
    setBank("");
    setAccountNumber("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20 max-w-3xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/mitra/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Cairkan Komisi
          </h1>
          <p className="text-muted-foreground">
            Tarik komisi GreenCoin Anda ke rekening bank
          </p>
        </div>

        {/* Saldo Card */}
        <Card className="mb-6 border-2 border-secondary bg-gradient-to-br from-secondary/10 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Saldo Komisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {currentBalance.toLocaleString('id-ID')} GC
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ≈ Rp {(currentBalance * conversionRate).toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formulir Pencairan</CardTitle>
            <CardDescription>
              Masukkan detail pencairan komisi Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Jumlah Komisi (GreenCoin)</Label>
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

            <div className="space-y-2">
              <Label htmlFor="bank">Bank Tujuan</Label>
              <Select value={bank} onValueChange={setBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="mandiri">Mandiri</SelectItem>
                  <SelectItem value="bni">BNI</SelectItem>
                  <SelectItem value="bri">BRI</SelectItem>
                  <SelectItem value="cimb">CIMB Niaga</SelectItem>
                  <SelectItem value="permata">Permata Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Nomor Rekening</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Masukkan nomor rekening"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="bg-accent/30 p-4 rounded-lg space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <p className="font-semibold mb-2">Informasi Pencairan:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Minimal pencairan: {minWithdrawal.toLocaleString('id-ID')} GC</li>
                    <li>Proses transfer: 1-3 hari kerja</li>
                    <li>Pastikan data rekening sudah benar</li>
                    <li>Tidak ada biaya admin</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCairkan} 
              className="w-full" 
              size="lg"
              variant="secondary"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Ajukan Pencairan
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MitraPencairan;
