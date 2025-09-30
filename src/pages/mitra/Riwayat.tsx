import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, DollarSign, Calendar, TrendingUp, ArrowLeft, Recycle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MitraRiwayat = () => {
  // Mock data - nanti akan diganti dengan data real dari backend
  const riwayatMesin = [
    {
      id: 1,
      date: "2025-01-28",
      machineId: "RVM-001",
      machineName: "T-Mart Sudirman",
      bottles: 156,
      weight: "15.6 kg",
      coins: 7800,
      commission: 780
    },
    {
      id: 2,
      date: "2025-01-27",
      machineId: "RVM-002",
      machineName: "T-Mart Gatot Subroto",
      bottles: 132,
      weight: "13.2 kg",
      coins: 6600,
      commission: 660
    },
    {
      id: 3,
      date: "2025-01-27",
      machineId: "RVM-003",
      machineName: "T-Mart Thamrin",
      bottles: 189,
      weight: "18.9 kg",
      coins: 9450,
      commission: 945
    }
  ];

  const riwayatPencairan = [
    {
      id: 1,
      date: "2025-01-25",
      time: "10:30",
      amount: 5000,
      status: "Selesai",
      method: "Transfer Bank",
      bankAccount: "BCA - 1234567890"
    },
    {
      id: 2,
      date: "2025-01-18",
      time: "14:15",
      amount: 10000,
      status: "Selesai",
      method: "Transfer Bank",
      bankAccount: "BCA - 1234567890"
    }
  ];

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
            <div className="space-y-4">
              {riwayatMesin.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">
                            {item.machineName}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                            <span className="font-mono text-xs">
                              {item.machineId}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        +{item.commission} GC
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Botol</div>
                        <div className="text-lg font-semibold text-foreground flex items-center gap-1">
                          <Recycle className="w-4 h-4" />
                          {item.bottles}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Berat</div>
                        <div className="text-lg font-semibold text-foreground flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {item.weight}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Koin</div>
                        <div className="text-lg font-semibold text-foreground">
                          {item.coins} GC
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pencairan">
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
                              {item.date} - {item.time}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-primary">
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Metode: {item.method}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Rekening: {item.bankAccount}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">
                          Rp {item.amount.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.amount} GC
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MitraRiwayat;
