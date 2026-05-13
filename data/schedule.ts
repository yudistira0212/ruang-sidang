import type { DayName, ProgramStudi } from "@/types/booking";

export const DAYS: DayName[] = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

export const TIME_SLOTS: Record<DayName, string[]> = {
  Senin: ["08.00–10.00", "10.00–12.00", "12.00–14.00", "14.00–16.00"],
  Selasa: ["08.00–10.00", "10.00–12.00", "12.00–14.00", "14.00–16.00"],
  Rabu: ["08.00–10.00", "10.00–12.00", "12.00–14.00", "14.00–16.00"],
  Kamis: ["08.00–10.00", "10.00–12.00", "12.00–14.00", "14.00–16.00"],
  Jumat: ["08.00–10.00", "10.00–12.00", "12.00–14.00"],
};

export const PROGRAM_STUDI: ProgramStudi[] = [
  "Informatika",
  "Sistem Informasi",
  "Teknik Elektro",
  "Teknik Sipil",
  "Teknik Mesin",
];
