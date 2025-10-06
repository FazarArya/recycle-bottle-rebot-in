import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Coins, Activity, TrendingUp, MapPin, History, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const MitraDashboard = () => {
  const { userData, loading: dataLoading } = useUserData();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/mitra');
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

  // Mock machine data - will be replaced with real data later
  const mitraStats = {
    totalMachines: 5,
    activeMachines: 4,
    totalBottles: 1250,
    totalWeight: 125,
    commission: Math.floor(userData.saldo_coin * 0.1) // 10% commission
  };

  const machines = [
    {
      id: "RVM-001",
      name: "T-Mart Sudirman",
      status: "Aktif",
      fill: 75,
      location: "Jl. Sudirman No. 45",
      bottlesToday: 45
    },
    {
      id: "RVM-002",
      name: "T-Mart Gatot Subroto",
      status: "Aktif",
      fill: 60,
      location: "Jl. Gatot Subroto No. 12",
      bottlesToday: 38
    },
    {
      id: "RVM-003",
      name: "T-Mart Thamrin",
      status: "Aktif",
      fill: 85,
      location: "Jl. Thamrin No. 8",
      bottlesToday: 52
    },
    {
      id: "RVM-004",
      name: "T-Mart Kuningan",
      status: "Aktif",
      fill: 40,
      location: "Jl. Kuningan No. 23",
      bottlesToday: 28
    },
    {
      id: "RVM-005",
      name: "T-Mart Senayan",
      status: "Maintenance",
      fill: 95,
      location: "Jl. Senayan No. 67",
      bottlesToday: 0
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "Aktif" ? "bg-primary" : "bg-destructive";
  };

  const getFillColor = (fill: number) => {
    if (fill >= 80) return "text-destructive";
    if (fill >= 60) return "text-yellow-600";
    return "text-primary";
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
              {machines.map((machine) => (
                <Card key={machine.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{machine.name}</h4>
                            <Badge className={getStatusColor(machine.status)}>
                              {machine.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                            <MapPin className="w-3 h-3" />
                            {machine.location}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              ID: <span className="font-mono">{machine.id}</span>
                            </span>
                            <span className="text-muted-foreground">
                              Hari ini: <span className="font-semibold text-foreground">{machine.bottlesToday} botol</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getFillColor(machine.fill)}`}>
                            {machine.fill}%
                          </div>
                          <div className="text-xs text-muted-foreground">Kapasitas</div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/mitra/machine/${machine.id}`}>
                            Detail
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MitraDashboard;
