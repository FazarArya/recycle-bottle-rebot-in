import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logoAuthImage from '@/assets/Logo Botol Auth.png';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      toast.success('Berhasil keluar');
      navigate('/');
    } else {
      toast.error('Gagal keluar');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={logoAuthImage} 
              alt="REBOT.IN Auth Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground font-poppins brand-text">Rebot.in</h1>
              <p className="text-xs text-muted-foreground font-sans">Recycle Botol Indonesia</p>
            </div>
          </div>
          
          {user && (
            <div className="flex gap-3 items-center">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
