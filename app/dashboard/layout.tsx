import Link from "next/link";
import { Home, ScanLine, FileText, Settings, Leaf } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Desktop Sidebar & Mobile Topbar Header could go here, but for now let's just make it a clean top bar and bottom nav */}
      
      <header className="flex h-14 items-center px-4 md:px-6 border-b bg-white dark:bg-zinc-900 sticky top-0 z-40">
        <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
          <Leaf className="h-5 w-5 text-green-600" />
          <span>SoilSense</span>
        </Link>
      </header>

      <main className="flex-1 pb-16 md:pb-0 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 border-t bg-white dark:bg-zinc-900 flex items-center justify-around z-50 px-2 pb-safe">
        <Link href="/dashboard" className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-green-600 active:text-green-600">
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link href="/scan" className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-green-600">
          <div className="bg-green-600 text-white p-3 rounded-full -mt-6 shadow-lg shadow-green-600/30">
            <ScanLine className="h-6 w-6" />
          </div>
          <span className="text-[10px] mt-1 font-medium">Scan</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-green-600">
          <FileText className="h-5 w-5" />
          <span className="text-[10px] mt-1 font-medium">History</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center justify-center w-full h-full text-zinc-500 hover:text-green-600">
          <Settings className="h-5 w-5" />
          <span className="text-[10px] mt-1 font-medium">Settings</span>
        </Link>
      </nav>

      {/* Desktop Sidebar (Optional enhancement later) */}
    </div>
  );
}
