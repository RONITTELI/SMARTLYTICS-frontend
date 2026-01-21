import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  FileSpreadsheet,
  Image,
  Calendar,
  Plus,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const reports = [
  {
    id: "1",
    name: "Q4 Sales Analysis Report",
    type: "pdf",
    date: "2024-01-15",
    size: "2.4 MB",
    source: "Sales Dashboard",
  },
  {
    id: "2",
    name: "Customer Insights Summary",
    type: "pdf",
    date: "2024-01-14",
    size: "1.8 MB",
    source: "AI Insights",
  },
  {
    id: "3",
    name: "Product Performance Data",
    type: "xlsx",
    date: "2024-01-12",
    size: "890 KB",
    source: "Dataset Export",
  },
  {
    id: "4",
    name: "Revenue Trend Analysis",
    type: "pdf",
    date: "2024-01-10",
    size: "3.1 MB",
    source: "Revenue Dashboard",
  },
  {
    id: "5",
    name: "Marketing Campaign Results",
    type: "csv",
    date: "2024-01-08",
    size: "450 KB",
    source: "Dataset Export",
  },
];

const typeIcons = {
  pdf: { icon: FileText, color: "text-destructive", bg: "bg-destructive/20" },
  xlsx: { icon: FileSpreadsheet, color: "text-success", bg: "bg-success/20" },
  csv: { icon: FileSpreadsheet, color: "text-info", bg: "bg-info/20" },
  png: { icon: Image, color: "text-chart-3", bg: "bg-chart-3/20" },
};

export default function Reports() {
  const handleDownload = (name: string) => {
    toast.success(`Downloading ${name}...`);
  };

  const handleGenerate = () => {
    toast.success("Generating new report...");
  };

  return (
    <DashboardLayout title="Reports" description="Export and download your analysis reports">
      {/* Quick Export Options */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {[
          {
            title: "Export Dashboard",
            description: "Download your dashboards as PDF",
            icon: BarChart3,
            action: "Export as PDF",
          },
          {
            title: "Export Insights",
            description: "Get AI insights as a report",
            icon: Sparkles,
            action: "Generate Report",
          },
          {
            title: "Export Data",
            description: "Download cleaned datasets",
            icon: FileSpreadsheet,
            action: "Export Data",
          },
        ].map((option) => (
          <div
            key={option.title}
            className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
              <option.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{option.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
            <Button variant="outline" className="w-full mt-4" onClick={handleGenerate}>
              {option.action}
            </Button>
          </div>
        ))}
      </div>

      {/* Report History */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Report History</h2>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filter by Date
          </Button>
        </div>

        <div className="divide-y divide-border">
          {reports.map((report) => {
            const config = typeIcons[report.type as keyof typeof typeIcons];
            const Icon = config.icon;

            return (
              <div
                key={report.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    config.bg
                  )}
                >
                  <Icon className={cn("h-6 w-6", config.color)} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{report.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span className="uppercase">{report.type}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                    <span>•</span>
                    <span>{report.source}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(report.date).toLocaleDateString()}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1"
                    onClick={() => handleDownload(report.name)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
        <Plus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground">
          Generate Custom Report
        </h3>
        <p className="mt-1 text-muted-foreground max-w-md mx-auto">
          Create a tailored report by selecting specific dashboards, insights, and data
          to include.
        </p>
        <Button variant="gradient" className="mt-4" onClick={handleGenerate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Report
        </Button>
      </div>
    </DashboardLayout>
  );
}
