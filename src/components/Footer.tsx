import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">REBOT.IN</h3>
                <p className="text-xs opacity-90">Recycle Botol Indonesia</p>
              </div>
            </div>
            <p className="text-sm opacity-90 max-w-md mb-4">
              Platform daur ulang botol plastik menjadi GreenCoin. 
              Bersama wujudkan Indonesia yang lebih hijau dan berkelanjutan.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Tentang Kami</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Cara Kerja</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Lokasi RVM</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm opacity-90">
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
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>&copy; 2025 REBOT.IN - Recycle Botol Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
