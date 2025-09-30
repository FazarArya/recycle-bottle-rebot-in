import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Recycle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/30 rounded-full px-4 py-2 text-sm font-medium text-foreground">
              <Recycle className="w-4 h-4" />
              <span>Platform Daur Ulang #1 di Indonesia</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Ubah Botol Plastik Jadi{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GreenCoin
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Daur ulang botol plastik dengan mudah melalui mesin RVM. Dapatkan GreenCoin 
              yang bisa ditukar jadi uang. Bersama wujudkan Indonesia lebih hijau!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="gap-2 text-base shadow-lg hover:shadow-xl transition-all">
                <Link to="/teman/dashboard">
                  Daftar Sebagai Teman
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 text-base">
                <Link to="/mitra/dashboard">
                  <Coins className="w-5 h-5" />
                  Daftar Sebagai Mitra
                </Link>
              </Button>
            </div>

            <div className="flex gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Pengguna Aktif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Botol Didaur Ulang</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Mesin RVM</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="Recycling bottles for a greener Indonesia"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
