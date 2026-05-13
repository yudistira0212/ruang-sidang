export type DayName = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";

export type ProgramStudi =
  | "Informatika"
  | "Sistem Informasi"
  | "Teknik Elektro"
  | "Teknik Sipil"
  | "Teknik Mesin";

export interface Booking {
  id: string;
  nama: string;
  nim: string;
  programStudi: ProgramStudi;
  hari: DayName;
  jam: string;
  createdAt: string;
}

export interface UserAccount {
  id?: string;
  username: string;
  password?: string;
  programStudi: string;
}
