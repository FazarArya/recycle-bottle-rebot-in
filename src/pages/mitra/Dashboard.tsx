import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Coins, Activity, TrendingUp, MapPin, History, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const MitraDashboard = () => {
  const { userData, loading: dataLoading } = useUserData();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [machines, setMachines] = useState<any[]>([]);
  const [loadingMachines, setLoadingMachines] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/mitra');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchMachines = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('machines')
          .select('*');
        
        if (error) throw error;
        
        // Sort machines: user's machines first, then others
        const sorted = (data || []).sort((a, b) => {
          const aIsOwned = a.mitra_id === user.id;
          const bIsOwned = b.mitra_id === user.id;
          if (aIsOwned && !bIsOwned) return -1;
          if (!aIsOwned && bIsOwned) return 1;
          return 0;
        });
        
        setMachines(sorted);
      } catch (error) {
        console.error('Error fetching machines:', error);
      } finally {
        setLoadingMachines(false);
      }
    };

    fetchMachines();
  }, [user]);

  if (authLoading || dataLoading || loadingMachines || !userData) {
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

  const userMachines = machines.filter(m => m.mitra_id === user?.id);
  const mitraStats = {
    totalMachines: userMachines.length,
    activeMachines: userMachines.filter(m => m.koneksi === 'online').length,
    totalBottles: userData.total_botol,
    totalWeight: Math.floor(userData.total_botol * 0.1), // Assume 100g per bottle
    commission: userData.komisi_mitra
  };

  const getStatusText = (koneksi: string) => {
    return koneksi === 'online' ? 'Aktif' : 'Offline';
  };

  const getStatusColor = (koneksi: string) => {
    return koneksi === "online" ? "bg-primary" : "bg-destructive";
  };

  const getCapacityColor = (capacity: string) => {
    if (capacity === 'penuh') return "text-destructive";
    if (capacity === 'hampir_penuh') return "text-yellow-600";
    return "text-primary";
  };

  const getCapacityPercentage = (capacity: string) => {
    switch(capacity) {
      case 'penuh': return 95;
      case 'hampir_penuh': return 75;
      case 'normal': return 40;
      default: return 20;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Dashboard Mitra
          </h1>
          <p className="text-muted-foreground">
            Selamat datang, {userData.nama}! 🏢
          </p>
        </div>

        {/* Komisi Card */}
        <Card className="mb-8 border-2 border-secondary bg-gradient-to-br from-secondary/10 to-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Komisi GreenCoin</CardTitle>
                <CardDescription>Total komisi yang dapat dicairkan</CardDescription>
              </div>
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <Coins className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-secondary mb-4">
              {mitraStats.commission.toLocaleString('id-ID')} GC
            </div>
            <div className="flex gap-3">
              <Button asChild variant="secondary" className="flex-1">
                <Link to="/mitra/pencairan">
                  <Coins className="w-4 h-4 mr-2" />
                  Cairkan Komisi
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/mitra/riwayat">
                  <History className="w-4 h-4 mr-2" />
                  Lihat Riwayat
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistik Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-primary" />
                Total Mesin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mitraStats.totalMachines}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {mitraStats.activeMachines} mesin aktif
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Total Botol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mitraStats.totalBottles}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                botol terkumpul
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-accent-foreground" />
                Total Berat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {mitraStats.totalWeight} kg
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                plastik didaur ulang
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Coins className="w-5 h-5 text-primary" />
                Total GreenCoin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {userData.saldo_coin.toLocaleString('id-ID')}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                GC terdistribusi
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Mesin RVM */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Status Mesin RVM</CardTitle>
                <CardDescription>Monitor dan kelola mesin RVM Anda</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/mitra/profil">
                  <Settings className="w-4 h-4 mr-2" />
                  Kelola Mesin
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {machines.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Belum ada mesin RVM</p>
              ) : (
                machines.map((machine) => {
                  const isOwned = machine.mitra_id === user?.id;
                  return (
                    <Card key={machine.id} className={`border ${isOwned ? 'border-primary/50 bg-primary/5' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isOwned ? 'bg-primary/20' : 'bg-secondary/10'}`}>
                              <Building2 className={`w-6 h-6 ${isOwned ? 'text-primary' : 'text-secondary'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-foreground">{machine.lokasi}</h4>
                                <Badge className={getStatusColor(machine.koneksi)}>
                                  {getStatusText(machine.koneksi)}
                                </Badge>
                                {isOwned && <Badge variant="outline" className="border-primary text-primary">Milik Anda</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                                <MapPin className="w-3 h-3" />
                                {machine.lokasi}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-muted-foreground">
                                  Kode: <span className="font-mono font-semibold">{machine.kode_mitra}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${getCapacityColor(machine.status_kapasitas)}`}>
                                {getCapacityPercentage(machine.status_kapasitas)}%
                              </div>
                              <div className="text-xs text-muted-foreground">Kapasitas</div>
                            </div>
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/mitra/machine/${machine.kode_mitra}`}>
                                Detail
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MitraDashboard;
