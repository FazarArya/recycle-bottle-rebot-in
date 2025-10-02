import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { z } from 'zod';
import { Leaf } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' })
});

const signupSchema = z.object({
  nama: z.string().trim().min(2, { message: 'Nama minimal 2 karakter' }).max(100, { message: 'Nama maksimal 100 karakter' }),
  email: z.string().trim().email({ message: 'Email tidak valid' }),
  no_hp: z.string().trim().min(10, { message: 'Nomor HP tidak valid' }).max(15, { message: 'Nomor HP tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword']
});

export default function TemanAuth() {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in - use useEffect to prevent setState during render
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/teman/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const validated = loginSchema.parse({ email, password });
      const { error } = await signIn(validated.email, validated.password);

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email atau password salah');
        } else {
          toast.error(error.message);
        }
        setLoading(false);
      } else {
        toast.success('Berhasil masuk!');
        // Don't navigate here - useEffect will handle redirect automatically
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const nama = formData.get('nama') as string;
    const email = formData.get('email') as string;
    const no_hp = formData.get('no_hp') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    try {
      const validated = signupSchema.parse({ nama, email, no_hp, password, confirmPassword });
      const { error } = await signUp(
        validated.email,
        validated.password,
        validated.nama,
        validated.no_hp,
        'teman'
      );

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Email sudah terdaftar');
        } else {
          toast.error(error.message);
        }
        setLoading(false);
      } else {
        toast.success('Pendaftaran berhasil! Silakan cek email untuk verifikasi.');
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Teman Rebot.in</CardTitle>
          <CardDescription>Masuk atau daftar untuk mulai menukar botol</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="signup">Daftar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Memproses...' : 'Masuk'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-nama">Nama Lengkap</Label>
                  <Input
                    id="signup-nama"
                    name="nama"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-no_hp">Nomor HP</Label>
                  <Input
                    id="signup-no_hp"
                    name="no_hp"
                    type="tel"
                    placeholder="08123456789"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Konfirmasi Password</Label>
                  <Input
                    id="signup-confirm"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Memproses...' : 'Daftar'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
            Kembali ke Beranda
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
