import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, DollarSign, Calendar, TrendingUp, ArrowLeft, PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface MachineTransaction {
  tanggal: string;
  total_coin: number;
  total_transactions: number;
  machines: {
    id: string;
    lokasi: string;
  } | null;
}

interface CoinTransaction {
  id: string;
  timestamp: string;
  jumlah_coin: number;
  total_diterima: number;
  biaya_layanan: number;
  status: string;
}

const MitraRiwayat = () => {
  const { user } = useAuth();
  const [riwayatMesin, setRiwayatMesin] = useState<MachineTransaction[]>([]);
  const [riwayatPencairan, setRiwayatPencairan] = useState<CoinTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Fetch machine transactions (grouped by date and machine)
        const { data: machineData, error: machineError } = await supabase
          .from('transactions_botol')
          .select(`
            tanggal,
            total_coin,
            machine_id,
            machines!inner (
              id,
              lokasi,
              mitra_id
            )
          `)
          .eq('machines.mitra_id', user.id)
          .order('tanggal', { ascending: false });

        if (machineError) throw machineError;

        // Group by date and machine
        const grouped = (machineData || []).reduce((acc: any[], curr: any) => {
          const dateKey = format(new Date(curr.tanggal), "yyyy-MM-dd");
          const machineId = curr.machines?.id;
          
          const existing = acc.find(item => 
            format(new Date(item.tanggal), "yyyy-MM-dd") === dateKey && 
            item.machines?.id === machineId
          );

          if (existing) {
            existing.total_coin += curr.total_coin;
            existing.total_transactions += 1;
          } else {
            acc.push({
              tanggal: curr.tanggal,
              total_coin: curr.total_coin,
              total_transactions: 1,
              machines: curr.machines
            });
          }

          return acc;
        }, []);

        // Fetch coin transactions (mitra withdrawals)
        const { data: coinData, error: coinError } = await supabase
          .from('transactions_coin')
          .select('id, timestamp, jumlah_coin, total_diterima, biaya_layanan, status')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false });

        if (coinError) throw coinError;

        setRiwayatMesin(grouped);
        setRiwayatPencairan(coinData || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/mitra/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Riwayat Mitra
          </h1>
          <p className="text-muted-foreground">
            Lihat semua aktivitas mesin RVM dan pencairan komisi Anda
          </p>
        </div>

        <Tabs defaultValue="mesin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="mesin">
              <Building2 className="w-4 h-4 mr-2" />
              Riwayat Mesin
            </TabsTrigger>
            <TabsTrigger value="pencairan">
              <DollarSign className="w-4 h-4 mr-2" />
              Riwayat Pencairan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mesin">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Memuat data...
              </div>
            ) : riwayatMesin.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Aktivitas Mesin</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Belum ada transaksi botol dari mesin RVM Anda. Pastikan mesin sudah aktif dan terhubung dengan sistem.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {riwayatMesin.map((item, index) => {
                  // Calculate commission (30% of total_coin, where 1 coin = Rp 10)
                  const commission = Math.floor(item.total_coin * 0.3);
                  const totalWeight = (item.total_coin / 10) * 0.04; // Estimasi berat

                  return (
                    <Card key={`${item.machines?.id}-${item.tanggal}-${index}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-secondary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-1">
                                {item.machines?.lokasi || 'Lokasi tidak diketahui'}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-4 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {format(new Date(item.tanggal), "dd MMM yyyy", { locale: id })}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {item.total_transactions} transaksi
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-lg font-bold">
                            +{commission} GC
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Komisi (30%)</div>
                            <div className="text-lg font-semibold text-foreground flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {commission} GC
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Estimasi Berat</div>
                            <div className="text-lg font-semibold text-foreground flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {totalWeight.toFixed(1)} kg
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Total Koin</div>
                            <div className="text-lg font-semibold text-foreground">
                              {item.total_coin} GC
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pencairan">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Memuat data...
              </div>
            ) : riwayatPencairan.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <DollarSign className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Riwayat Pencairan</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Anda belum melakukan pencairan komisi. Kumpulkan komisi dari aktivitas mesin RVM Anda dan cairkan saat sudah mencapai minimum pencairan!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {riwayatPencairan.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg mb-1">
                              Pencairan Komisi
                            </CardTitle>
                            <CardDescription className="flex items-center gap-4 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(item.timestamp), "dd MMM yyyy - HH:mm", { locale: id })}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={
                          item.status === 'completed' ? 'bg-primary' :
                          item.status === 'pending' ? 'bg-yellow-500' : 'bg-destructive'
                        }>
                          {item.status === 'completed' ? 'Selesai' : 
                           item.status === 'pending' ? 'Menunggu' : 'Gagal'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Jumlah Coin:</span>
                          <span className="font-semibold">{item.jumlah_coin} GC</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Biaya Layanan:</span>
                          <span className="font-semibold text-destructive">-Rp {item.biaya_layanan.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Diterima:</span>
                          <div className="text-lg font-bold text-foreground">
                            Rp {item.total_diterima.toLocaleString('id-ID')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MitraRiwayat;
