import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickAction } from "@/components/dashboard/QuickAction";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import {
  Database,
  BarChart3,
  Sparkles,
  Upload,
  MessageSquare,
  Zap,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";

const stats = [
  { title: "Total Datasets", value: "24", change: 12, icon: <Database className="h-5 w-5" /> },
  { title: "Dashboards Created", value: "18", change: 8, icon: <BarChart3 className="h-5 w-5" /> },
  { title: "AI Insights", value: "156", change: 24, icon: <Sparkles className="h-5 w-5" /> },
  { title: "Data Processed", value: "2.4M", change: 18, icon: <TrendingUp className="h-5 w-5" /> },
];

const quickActions = [
  {
    title: "Generate Dataset",
    description: "Create structured data using AI",
    icon: <Sparkles className="h-6 w-6" />,
    href: "/generator",
    gradient: true,
  },
  {
    title: "Upload Data",
    description: "Import CSV or Excel files",
    icon: <Upload className="h-6 w-6" />,
    href: "/upload",
  },
  {
    title: "Create Dashboard",
    description: "Build interactive visualizations",
    icon: <BarChart3 className="h-6 w-6" />,
    href: "/charts",
  },
  {
    title: "Ask AI",
    description: "Get insights from your data",
    icon: <MessageSquare className="h-6 w-6" />,
    href: "/chat",
  },
];

const recentActivity = [
  {
    icon: <Upload className="h-5 w-5" />,
    title: "Sales Data Q4.xlsx uploaded",
    description: "2,450 rows processed successfully",
    time: "2 min ago",
    type: "upload" as const,
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Customer Demographics generated",
    description: "AI created 1,000 sample records",
    time: "15 min ago",
    type: "generate" as const,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "New insight discovered",
    description: "Revenue trend shows 23% growth",
    time: "1 hour ago",
    type: "insight" as const,
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Sales Dashboard updated",
    description: "Added 3 new visualizations",
    time: "3 hours ago",
    type: "dashboard" as const,
  },
  {
    icon: <FileSpreadsheet className="h-5 w-5" />,
    title: "Marketing Data cleaned",
    description: "Removed 145 duplicates",
    time: "Yesterday",
    type: "upload" as const,
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard" description="Welcome back! Here's your data overview.">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <QuickAction
              key={action.title}
              {...action}
            />
          ))}
        </div>
      </div>

      {/* Activity & Charts Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in-up">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-1">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Data Overview Chart Placeholder */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in-up">
          <h2 className="text-lg font-semibold text-foreground mb-4">Data Processing Overview</h2>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Chart visualization will appear here</p>
              <p className="text-xs text-muted-foreground">Upload or generate data to see insights</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
