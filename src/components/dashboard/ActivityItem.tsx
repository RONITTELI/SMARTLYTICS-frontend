import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
  type: "upload" | "generate" | "insight" | "dashboard";
}

const typeColors = {
  upload: "bg-info/20 text-info",
  generate: "bg-primary/20 text-primary",
  insight: "bg-warning/20 text-warning",
  dashboard: "bg-chart-3/20 text-chart-3",
};

export function ActivityItem({ icon, title, description, time, type }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-border last:border-0">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", typeColors[type])}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
    </div>
  );
}
