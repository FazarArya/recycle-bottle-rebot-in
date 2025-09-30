import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">REBOT.IN</h1>
              <p className="text-xs text-muted-foreground">Recycle Botol Indonesia</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="hidden sm:flex">
              Tentang Kami
            </Button>
            <Button variant="default">
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
