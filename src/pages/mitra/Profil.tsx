import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, ArrowLeft, Edit2, Save, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const MitraProfil = () => {
  const { toast } = useToast();
  const { userData, loading: dataLoading, refreshUserData } = useUserData();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: ""
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/mitra');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (userData) {
      setFormData({
        nama: userData.nama,
        email: userData.email,
        no_hp: userData.no_hp || ""
      });
    }
  }, [userData]);

  const machines = [
    { id: "RVM-001", location: "T-Mart Sudirman", status: "Aktif" },
    { id: "RVM-002", location: "T-Mart Gatot Subroto", status: "Aktif" },
    { id: "RVM-003", location: "T-Mart Thamrin", status: "Aktif" },
    { id: "RVM-004", location: "T-Mart Kuningan", status: "Aktif" },
    { id: "RVM-005", location: "T-Mart Senayan", status: "Maintenance" }
  ];

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
        description: "Data profil perusahaan Anda telah disimpan.",
      });
    } catch (error: any) {
      toast({
        title: "Gagal memperbarui profil",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (authLoading || dataLoading || !userData) {
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
      <main className="container mx-auto px-4 py-8 mt-20 max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/mitra/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Profil Mitra
          </h1>
          <p className="text-muted-foreground">
            Kelola informasi perusahaan dan mesin RVM
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Informasi Perusahaan</CardTitle>
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
                {isEditing ? "Ubah data perusahaan" : "Data perusahaan mitra"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-secondary text-primary-foreground text-xl">
                    <Building2 className="w-10 h-10" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Ubah Logo
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Nama Perusahaan
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
              <CardTitle>Statistik Mitra</CardTitle>
              <CardDescription>Ringkasan kinerja Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">5</div>
                  <div className="text-sm text-muted-foreground">Total Mesin</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,250</div>
                  <div className="text-sm text-muted-foreground">Total Botol</div>
                </div>
                <div className="p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{userData.saldo_coin.toLocaleString('id-ID')}</div>
                  <div className="text-sm text-muted-foreground">GC Terdistribusi</div>
                </div>
                <div className="p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{Math.floor(userData.saldo_coin * 0.1).toLocaleString('id-ID')}</div>
                  <div className="text-sm text-muted-foreground">Total Komisi (10%)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Daftar Mesin RVM
            </CardTitle>
            <CardDescription>Mesin yang dikelola oleh mitra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {machines.map((machine) => (
                <div 
                  key={machine.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        {machine.location}
                        <Badge 
                          variant={machine.status === "Aktif" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {machine.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">
                        {machine.id}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Detail
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MitraProfil;
