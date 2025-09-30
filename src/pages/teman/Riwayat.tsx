import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Recycle, DollarSign, Calendar, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TemanRiwayat = () => {
  // Mock data - nanti akan diganti dengan data real dari backend
  const riwayatBotol = [
    {
      id: 1,
      date: "2025-01-28",
      time: "14:30",
      location: "RVM T-Mart Sudirman",
      bottles: 12,
      coins: 600,
      weight: "1.2 kg"
    },
    {
      id: 2,
      date: "2025-01-25",
      time: "09:15",
      location: "RVM T-Mart Gatot Subroto",
      bottles: 8,
      coins: 400,
      weight: "0.8 kg"
    },
    {
      id: 3,
      date: "2025-01-20",
      time: "16:45",
      location: "RVM T-Mart Sudirman",
      bottles: 15,
      coins: 750,
      weight: "1.5 kg"
    }
  ];

  const riwayatPencairan = [
    {
      id: 1,
      date: "2025-01-27",
      time: "11:20",
      amount: 5000,
      status: "Selesai",
      method: "T-Mart Scan",
      location: "T-Mart Sudirman"
    },
    {
      id: 2,
      date: "2025-01-15",
      time: "15:30",
      amount: 10000,
      status: "Selesai",
      method: "T-Mart Scan",
      location: "T-Mart Gatot Subroto"
    }
  ];

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
            <div className="space-y-4">
              {riwayatBotol.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Recycle className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">
                            {item.bottles} Botol Didaur Ulang
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date} - {item.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        +{item.coins} GC
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Berat: {item.weight}
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
                              {item.date} - {item.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
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
                      <div className="text-sm text-muted-foreground">
                        Metode: {item.method}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        Rp {item.amount.toLocaleString('id-ID')}
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

export default TemanRiwayat;
