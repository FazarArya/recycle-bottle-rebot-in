import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Recycle, Award, History, DollarSign, Scan } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { ScanBottleModal } from "@/components/teman/ScanBottleModal";
import { BottleScannedNotification } from "@/components/teman/BottleScannedNotification";
import { useBottleScanner } from "@/hooks/useBottleScanner";

const TemanDashboard = () => {
  const { userData, loading: dataLoading, refreshUserData } = useUserData();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [scanResult, setScanResult] = useState<{
    bottleData: any[];
    totalCoin: number;
    machineLocation: string;
  } | null>(null);

  // Listen for bottle scans from ESP32
  useBottleScanner(user?.id, (result) => {
    setScanResult(result);
    setNotificationOpen(true);
    refreshUserData(); // Refresh to show updated balance
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/teman');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || dataLoading || !userData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate environmental impact
  const co2Saved = (userData.total_botol * 0.5).toFixed(1); // 0.5 kg CO2 per bottle
  const treesEquivalent = Math.floor(userData.total_botol / 50); // 1 tree per 50 bottles

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Dashboard Teman
          </h1>
          <p className="text-muted-foreground">
            Selamat datang, {userData.nama}! 🌱
          </p>
        </div>

        {/* Scan Botol Button */}
        <Card className="mb-6 border-2 border-primary bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Scan Botol Sekarang</h3>
                <p className="text-sm opacity-90">Tukar botol plastik menjadi GreenCoin dengan menghubungkan mesin RVM</p>
              </div>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setScanModalOpen(true)}
                className="ml-4"
              >
                <Scan className="w-5 h-5 mr-2" />
                Mulai Scan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* GreenCoin Card */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">GreenCoin Anda</CardTitle>
                <CardDescription>Saldo koin yang dapat ditukarkan</CardDescription>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Coins className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-4">
              {userData.saldo_coin.toLocaleString('id-ID')} GC
            </div>
            <div className="flex gap-3">
              <Button asChild className="flex-1">
                <Link to="/teman/pencairan">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Cairkan Koin
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/teman/riwayat">
                  <History className="w-4 h-4 mr-2" />
                  Lihat Riwayat
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Jejak Hijau Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Jejak Hijau Anda
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Recycle className="w-5 h-5 text-primary" />
                  Botol Didaur Ulang
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {userData.total_botol}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  botol berhasil didaur ulang
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  CO₂ Dikurangi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {co2Saved} kg
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  emisi karbon dioksida
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5 text-accent-foreground" />
                  Setara Pohon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {treesEquivalent}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  pohon yang diselamatkan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Kelola akun dan aktivitas Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 justify-start">
                <Link to="/teman/riwayat">
                  <History className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Riwayat Transaksi</div>
                    <div className="text-xs text-muted-foreground">Lihat semua aktivitas Anda</div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 justify-start">
                <Link to="/teman/profil">
                  <Award className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Profil Saya</div>
                    <div className="text-xs text-muted-foreground">Edit informasi pribadi</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <ScanBottleModal
          open={scanModalOpen}
          onOpenChange={setScanModalOpen}
          userId={userData.id}
          onSuccess={() => {
            // Modal closed, now listening for scan results from ESP32
          }}
        />
        
        {scanResult && (
          <BottleScannedNotification
            open={notificationOpen}
            onOpenChange={setNotificationOpen}
            bottleData={scanResult.bottleData}
            totalCoin={scanResult.totalCoin}
            machineLocation={scanResult.machineLocation}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TemanDashboard;
