import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Building2, MapPin, TrendingUp, Calendar, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MachineDetail = () => {
  const { id } = useParams();

  // Mock data - will be replaced with real data later
  const machineData = {
    id: "RVM2342",
    name: "T-Mart TUCH TELKOM UNIVERSITY",
    location: "Jl. Telekomunikasi No. 1, Bandung",
    status: "Aktif",
    connection: "85%",
    capacity: "Penuh",
    performance: "3%",
    bottleCount: 87,
    totalBottles: 21,
    slots: [
      { name: "Slot 1", bottleCount: "165 botol plastik", percentage: 165 },
      { name: "Slot 2", bottleCount: "12 botol kaca", percentage: 12 },
      { name: "Slot 3", bottleCount: "23 botol kaleng", percentage: 23 },
      { name: "Slot 4", bottleCount: "75 botol campuran", percentage: 75 }
    ],
    wasteLevel: "85%",
    maintenanceSchedule: "2.5 kg"
  };

  const getStatusColor = (status: string) => {
    return status === "Aktif" ? "bg-primary" : "bg-destructive";
  };

  const getConnectionColor = (connection: string) => {
    const value = parseInt(connection);
    if (value >= 70) return "text-primary";
    if (value >= 40) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20 max-w-5xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/mitra/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Link>
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                ID {machineData.id}
              </h1>
              <p className="text-lg text-muted-foreground mb-1">
                {machineData.name}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {machineData.location}
              </p>
            </div>
            <Badge className={getStatusColor(machineData.status)}>
              {machineData.status}
            </Badge>
          </div>
        </div>

        {/* Statistik Utama */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Koneksi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${getConnectionColor(machineData.connection)}`}>
                {machineData.connection}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Koneksi stabil
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Kapasitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-destructive">
                {machineData.capacity}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Segera kosongkan
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kinerja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {machineData.performance}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Efisiensi mesin
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Surat Keseluruhan Botol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-foreground">
                {machineData.bottleCount} botol
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Total botol terkumpul
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail Slot */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detail Slot Mesin</CardTitle>
            <CardDescription>Kapasitas per slot dan jenis botol</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slot</TableHead>
                  <TableHead>Jenis Botol</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead className="text-right">Kapasitas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machineData.slots.map((slot, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{slot.name}</TableCell>
                    <TableCell>{slot.bottleCount}</TableCell>
                    <TableCell className="text-right">{slot.percentage}</TableCell>
                    <TableCell className="text-right">
                      <Progress value={Math.min(slot.percentage, 100)} className="w-20 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Informasi Tambahan */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Level Sampah Plastik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {machineData.wasteLevel}
              </div>
              <Progress value={parseInt(machineData.wasteLevel)} className="mb-2" />
              <div className="text-sm text-muted-foreground">
                Status: {parseInt(machineData.wasteLevel) >= 80 ? "Hampir penuh" : "Normal"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-secondary" />
                Surat Keseluruhan Botol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {machineData.maintenanceSchedule}
              </div>
              <div className="text-sm text-muted-foreground">
                Total berat sampah plastik
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Riwayat Pengumpulan Hari Ini */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Pengumpulan Hari Ini
            </CardTitle>
            <CardDescription>Total botol yang terkumpul hari ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">
              {machineData.totalBottles} botol
            </div>
            <div className="text-sm text-muted-foreground">
              Pengumpulan dari semua jenis botol
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MachineDetail;
