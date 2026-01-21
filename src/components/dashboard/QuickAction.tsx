import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface QuickActionProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  gradient?: boolean;
}

export function QuickAction({ title, description, icon, href, gradient }: QuickActionProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        gradient
          ? "border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
            gradient
              ? "bg-primary text-primary-foreground shadow-glow"
              : "bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          )}
        >
          {icon}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
          Get started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
