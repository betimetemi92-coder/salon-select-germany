export type Booking = {
  id: string;
  userId: string;
  stylistId: string;
  stylistName: string;
  stylistImg: string;
  serviceName: string;
  price: number;
  duration: number;
  date: string; // ISO yyyy-mm-dd
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  paymentMethod: "card" | "paypal" | "klarna";
  createdAt: string;
};

const KEY = "coiffure_bookings";

const read = (): Booking[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};
const write = (b: Booking[]) => localStorage.setItem(KEY, JSON.stringify(b));

export const addBooking = (b: Omit<Booking, "id" | "createdAt" | "status">): Booking => {
  const all = read();
  const created: Booking = {
    ...b,
    id: crypto.randomUUID(),
    status: "upcoming",
    createdAt: new Date().toISOString(),
  };
  write([created, ...all]);
  return created;
};

export const getBookingsByUser = (userId: string) =>
  read().filter((b) => b.userId === userId);

export const getBookingsByStylist = (stylistId: string) =>
  read().filter((b) => b.stylistId === stylistId);

export const updateBookingStatus = (id: string, status: Booking["status"]) => {
  const all = read();
  const next = all.map((b) => (b.id === id ? { ...b, status } : b));
  write(next);
};

export const getAllBookings = () => read();
