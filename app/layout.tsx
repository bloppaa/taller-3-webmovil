import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DataMobile",
  description: "Mobile First Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Desktop Sidebar - Hidden on mobile */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <Sidebar />
            </aside>

            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Mobile Header */}
              <header className="md:hidden flex items-center border-b px-4 h-14 bg-background z-20 shrink-0">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64 max-w-[80vw]">
                    <Sidebar className="border-none" />
                  </SheetContent>
                </Sheet>
                <span className="font-bold ml-4">DataMobile</span>
              </header>

              <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
