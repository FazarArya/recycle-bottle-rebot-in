import { Card } from "@/components/ui/card";
import { UserCheck, Smartphone, Recycle, Coins, DollarSign, BarChart3 } from "lucide-react";
import rvmImage from "@/assets/rvm-machine.jpg";

const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-poppins">
            Cara Kerja
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Proses mudah dan cepat untuk mulai berkontribusi dalam daur ulang
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-foreground mb-8 font-poppins">Untuk Teman Rebot.in</h3>
            <div className="space-y-6">
              {[
                {
                  icon: UserCheck,
                  title: "Daftar & Verifikasi",
                  description: "Buat akun dan verifikasi dengan kode OTP",
                  step: "1"
                },
                {
                  icon: Smartphone,
                  title: "Akses Dashboard",
                  description: "Lihat GreenCoin dan jejak hijau Anda",
                  step: "2"
                },
                {
                  icon: Recycle,
                  title: "Tukar Botol",
                  description: "Masukkan botol di mesin RVM terdekat",
                  step: "3"
                },
                {
                  icon: Coins,
                  title: "Dapatkan GreenCoin",
                  description: "GreenCoin otomatis masuk ke akun Anda",
                  step: "4"
                },
                {
                  icon: DollarSign,
                  title: "Cairkan ke Uang",
                  description: "Scan barcode di T-Mart untuk tukar uang",
                  step: "5"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-secondary text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 font-poppins">{item.title}</h4>
                    <p className="text-sm text-muted-foreground font-sans">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img 
              src={rvmImage} 
              alt="RVM Machine for recycling bottles"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 font-poppins">Untuk Mitra Rebot.in</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: UserCheck,
                title: "Registrasi Mitra",
                description: "Daftar dengan kode registrasi khusus mitra"
              },
              {
                icon: BarChart3,
                title: "Monitor Mesin",
                description: "Kelola status, isi, dan lokasi mesin RVM"
              },
              {
                icon: Coins,
                title: "Cairkan Komisi",
                description: "Dapatkan komisi GreenCoin secara berkala"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-2 hover:border-primary transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-2 font-poppins">{item.title}</h4>
                <p className="text-sm text-muted-foreground font-sans">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
