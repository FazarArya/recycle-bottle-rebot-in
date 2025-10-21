import { Mail, MapPin, Phone } from "lucide-react";
import logoImage from "@/assets/Logo Rebot.in.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImage} 
                alt="REBOT.IN Logo" 
                className="w-25 h-20 object-contain"
              />
            </div>
            <p className="text-sm opacity-90 max-w-md mb-4 font-sans">
              Platform daur ulang botol plastik menjadi GreenCoin. 
              Bersama wujudkan Indonesia yang lebih hijau dan berkelanjutan.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-poppins">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm opacity-90 font-sans">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Tentang Kami</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Cara Kerja</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Lokasi RVM</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-poppins">Kontak</h4>
            <ul className="space-y-3 text-sm opacity-90 font-sans">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@rebot.in</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bandung, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p className="font-sans">&copy; 2025 REBOT.IN - Recycle Botol Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
