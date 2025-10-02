import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, ArrowLeft, Edit2, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const TemanProfil = () => {
  const { toast } = useToast();
  const { userData, loading, refreshUserData } = useUserData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: ""
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth/teman');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (userData) {
      setFormData({
        nama: userData.nama,
        email: userData.email,
        no_hp: userData.no_hp || ""
      });
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          nama: formData.nama,
          no_hp: formData.no_hp
        })
        .eq('id', user!.id);

      if (error) throw error;

      setIsEditing(false);
      refreshUserData();
      toast({
        title: "Profil berhasil diperbarui",
        description: "Data profil Anda telah disimpan.",
      });
    } catch (error: any) {
      toast({
        title: "Gagal memperbarui profil",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20 max-w-3xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/teman/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Profil Saya
          </h1>
          <p className="text-muted-foreground">
            Kelola informasi pribadi Anda
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Informasi Pribadi</CardTitle>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                size="sm"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            <CardDescription>
              {isEditing ? "Ubah data pribadi Anda" : "Data diri Teman Rebot.in"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {userData.nama.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Ubah Foto
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nama Lengkap
                </Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled={true}
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Email tidak dapat diubah</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="no_hp" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Nomor Telepon
                </Label>
                <Input
                  id="no_hp"
                  type="tel"
                  value={formData.no_hp}
                  onChange={(e) => setFormData({...formData, no_hp: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistik Akun</CardTitle>
            <CardDescription>Ringkasan aktivitas Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{userData.total_botol}</div>
                <div className="text-sm text-muted-foreground">Botol Didaur Ulang</div>
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{userData.saldo_coin.toLocaleString('id-ID')}</div>
                <div className="text-sm text-muted-foreground">Saldo GreenCoin</div>
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{(userData.total_botol * 0.5).toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">kg CO₂ Dikurangi</div>
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{Math.floor((Date.now() - new Date(user!.created_at).getTime()) / (1000 * 60 * 60 * 24))}</div>
                <div className="text-sm text-muted-foreground">Hari Bergabung</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TemanProfil;
