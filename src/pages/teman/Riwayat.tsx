import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Recycle, DollarSign, Calendar, MapPin, ArrowLeft, PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface BottleTransaction {
  id: string;
  tanggal: string;
  machine_id: string;
  total_coin: number;
  data_botol: any;
  machines: {
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

const TemanRiwayat = () => {
  const { user } = useAuth();
  const [riwayatBotol, setRiwayatBotol] = useState<BottleTransaction[]>([]);
  const [riwayatPencairan, setRiwayatPencairan] = useState<CoinTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Fetch bottle transactions
        const { data: bottleData, error: bottleError } = await supabase
          .from('transactions_botol')
          .select(`
            id,
            tanggal,
            machine_id,
            total_coin,
            data_botol,
            machines (
              lokasi
            )
          `)
          .eq('user_id', user.id)
          .order('tanggal', { ascending: false });

        if (bottleError) throw bottleError;

        // Fetch coin transactions
        const { data: coinData, error: coinError } = await supabase
          .from('transactions_coin')
          .select('id, timestamp, jumlah_coin, total_diterima, biaya_layanan, status')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false });

        if (coinError) throw coinError;

        setRiwayatBotol(bottleData || []);
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
            <Link to="/teman/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Riwayat Transaksi
          </h1>
          <p className="text-muted-foreground">
            Lihat semua aktivitas penukaran botol dan pencairan GreenCoin Anda
          </p>
        </div>

        <Tabs defaultValue="botol" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="botol">
              <Recycle className="w-4 h-4 mr-2" />
              Riwayat Botol
            </TabsTrigger>
            <TabsTrigger value="pencairan">
              <DollarSign className="w-4 h-4 mr-2" />
              Riwayat Pencairan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="botol">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Memuat data...
              </div>
            ) : riwayatBotol.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <PackageOpen className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Riwayat Botol</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Anda belum melakukan transaksi penukaran botol. Temukan mesin RVM terdekat untuk mulai mendaur ulang botol Anda!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {riwayatBotol.map((item) => {
                  const totalBottles = item.data_botol?.details?.reduce((sum: number, detail: any) => sum + (detail.jumlah || 0), 0) || 0;
                  const totalWeight = item.data_botol?.details?.reduce((sum: number, detail: any) => {
                    const berat = detail.ukuran === '1.5L' ? 40 : detail.ukuran === '600ml' ? 25 : 15;
                    return sum + (berat * (detail.jumlah || 0));
                  }, 0) || 0;

                  return (
                    <Card key={item.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Recycle className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg mb-1">
                                {totalBottles} Botol Didaur Ulang
                              </CardTitle>
                              <CardDescription className="flex items-center gap-4 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {format(new Date(item.tanggal), "dd MMM yyyy - HH:mm", { locale: id })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {item.machines?.lokasi || 'Lokasi tidak diketahui'}
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-lg font-bold">
                            +{item.total_coin} GC
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          Berat: {(totalWeight / 1000).toFixed(2)} kg
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
                    Anda belum melakukan pencairan GreenCoin. Kumpulkan GreenCoin dari penukaran botol dan cairkan di T-Mart!
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
                          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg mb-1">
                              Pencairan GreenCoin
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

export default TemanRiwayat;
