import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SoilReport, User } from "@/types";
import mockReportsData from "@/data/mock-reports.json";

interface AppState {
  user: User | null;
  reports: SoilReport[];
  theme: "light" | "dark" | "system";
  login: (user: User) => void;
  logout: () => void;
  addReport: (report: SoilReport) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

const initialReports: SoilReport[] = mockReportsData as SoilReport[];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      reports: initialReports,
      theme: "system",
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addReport: (report) => set((state) => ({ reports: [report, ...state.reports] })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "soilsense-storage",
    }
  )
);
