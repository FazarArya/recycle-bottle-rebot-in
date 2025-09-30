import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Coins, LineChart, Recycle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const UserTypes = () => {
  return (
    <section className="py-24 px-4 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pilih Peran Anda
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bergabunglah sebagai Teman atau Mitra REBOT.IN dan mulai berkontribusi 
            untuk lingkungan yang lebih hijau
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Teman Rebot.in</CardTitle>
              <CardDescription className="text-base">
                Untuk individu yang ingin menukar botol menjadi GreenCoin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Recycle className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Tukar Botol</h4>
                    <p className="text-sm text-muted-foreground">Masukkan botol di mesin RVM dan dapatkan GreenCoin</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Coins className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cairkan Koin</h4>
                    <p className="text-sm text-muted-foreground">Tukar GreenCoin menjadi uang melalui T-Mart</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Jejak Hijau</h4>
                    <p className="text-sm text-muted-foreground">Pantau kontribusi Anda untuk lingkungan</p>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link to="/teman/dashboard">
                  Daftar Sebagai Teman
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-all hover:shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Mitra Rebot.in</CardTitle>
              <CardDescription className="text-base">
                Untuk pengelola mesin RVM yang ingin mendapatkan komisi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Kelola Mesin</h4>
                    <p className="text-sm text-muted-foreground">Monitor status, isi, dan lokasi mesin RVM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Coins className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Komisi GreenCoin</h4>
                    <p className="text-sm text-muted-foreground">Dapatkan komisi dari setiap transaksi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Statistik Detail</h4>
                    <p className="text-sm text-muted-foreground">Lihat data botol dan berat yang terkumpul</p>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full" variant="secondary" size="lg">
                <Link to="/mitra/dashboard">
                  Daftar Sebagai Mitra
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
