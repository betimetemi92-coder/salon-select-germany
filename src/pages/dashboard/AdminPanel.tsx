import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Users,
  Euro,
  CheckCircle2,
  XCircle,
  Search,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  getAllBookings,
  updateBookingStatus,
  type Booking,
} from "@/data/bookings";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type StatusFilter = "all" | Booking["status"];

const statusLabels: Record<Booking["status"], string> = {
  upcoming: "Bevorstehend",
  completed: "Abgeschlossen",
  cancelled: "Storniert",
};

const statusVariants: Record<Booking["status"], "default" | "secondary" | "destructive"> = {
  upcoming: "default",
  completed: "secondary",
  cancelled: "destructive",
};

const AdminPanel = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>(() => getAllBookings());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const refresh = () => setBookings(getAllBookings());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (status !== "all" && b.status !== status) return false;
      if (!q) return true;
      return (
        b.stylistName.toLowerCase().includes(q) ||
        b.serviceName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    });
  }, [bookings, query, status]);

  const stats = useMemo(() => {
    const revenue = bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + b.price, 0);
    const upcoming = bookings.filter((b) => b.status === "upcoming").length;
    const uniqueCustomers = new Set(bookings.map((b) => b.userId)).size;
    return { revenue, upcoming, uniqueCustomers, total: bookings.length };
  }, [bookings]);

  const setStatusFor = (id: string, next: Booking["status"]) => {
    updateBookingStatus(id, next);
    refresh();
    toast.success(`Status aktualisiert: ${statusLabels[next]}`);
  };

  const exportCsv = () => {
    const header = [
      "ID",
      "Datum",
      "Uhrzeit",
      "Stylist",
      "Service",
      "Preis",
      "Status",
      "Zahlung",
    ];
    const rows = filtered.map((b) => [
      b.id,
      b.date,
      b.time,
      b.stylistName,
      b.serviceName,
      String(b.price),
      b.status,
      b.paymentMethod,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `termine-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="pt-32 pb-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Admin</p>
              <h1 className="font-display text-4xl md:text-5xl">Termin Übersicht</h1>
              <p className="text-muted-foreground mt-2">
                Willkommen zurück, {user?.name}. Verwalte alle Buchungen der Plattform.
              </p>
            </div>
            <Button variant="outline" onClick={exportCsv} className="gap-2">
              <Download className="h-4 w-4" /> CSV exportieren
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<CalendarIcon className="h-5 w-5 text-gold" />}
              label="Termine gesamt"
              value={stats.total.toString()}
            />
            <StatCard
              icon={<CheckCircle2 className="h-5 w-5 text-gold" />}
              label="Bevorstehend"
              value={stats.upcoming.toString()}
            />
            <StatCard
              icon={<Users className="h-5 w-5 text-gold" />}
              label="Kund:innen"
              value={stats.uniqueCustomers.toString()}
            />
            <StatCard
              icon={<Euro className="h-5 w-5 text-gold" />}
              label="Umsatz"
              value={`${stats.revenue.toLocaleString("de-DE")} €`}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alle Termine</CardTitle>
              <CardDescription>
                Filtere, suche und verwalte sämtliche Buchungen auf der Plattform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nach Stylist, Service oder ID suchen…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
                  <SelectTrigger className="sm:w-56">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="all">Alle Status</SelectItem>
                    <SelectItem value="upcoming">Bevorstehend</SelectItem>
                    <SelectItem value="completed">Abgeschlossen</SelectItem>
                    <SelectItem value="cancelled">Storniert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <CalendarIcon className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p>Keine Termine gefunden.</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Datum</TableHead>
                        <TableHead>Stylist</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Preis</TableHead>
                        <TableHead>Zahlung</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell>
                            <div className="font-medium">
                              {format(parseISO(b.date), "dd. MMM yyyy", { locale: de })}
                            </div>
                            <div className="text-xs text-muted-foreground">{b.time}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={b.stylistImg}
                                alt={b.stylistName}
                                className="h-9 w-9 rounded-full object-cover"
                              />
                              <span className="text-sm">{b.stylistName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{b.serviceName}</div>
                            <div className="text-xs text-muted-foreground">
                              {b.duration} Min.
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{b.price} €</TableCell>
                          <TableCell className="capitalize text-sm text-muted-foreground">
                            {b.paymentMethod}
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusVariants[b.status]}>
                              {statusLabels[b.status]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="inline-flex gap-1">
                              {b.status !== "completed" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setStatusFor(b.id, "completed")}
                                  title="Als abgeschlossen markieren"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              )}
                              {b.status !== "cancelled" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setStatusFor(b.id, "cancelled")}
                                  title="Stornieren"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Card>
    <CardContent className="p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {icon} {label}
      </div>
      <div className="font-display text-3xl">{value}</div>
    </CardContent>
  </Card>
);

export default AdminPanel;
