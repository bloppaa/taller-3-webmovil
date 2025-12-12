"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Table as TableIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Data Grid", href: "/grid", icon: TableIcon },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("h-full border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            DataMobile
          </h2>
          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer mb-1",
                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "transparent"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{link.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
