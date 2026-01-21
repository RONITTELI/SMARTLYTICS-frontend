import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileSpreadsheet,
  Sparkles,
  BarChart3,
  Search,
  Calendar,
  Download,
  Trash2,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const historyItems = [
  {
    id: "1",
    name: "Sales Data Q4 2024",
    type: "uploaded",
    date: "2024-01-15",
    rows: 2450,
    columns: 12,
    size: "1.2 MB",
  },
  {
    id: "2",
    name: "Customer Demographics",
    type: "generated",
    date: "2024-01-14",
    rows: 1000,
    columns: 8,
    size: "450 KB",
  },
  {
    id: "3",
    name: "Revenue Dashboard",
    type: "dashboard",
    date: "2024-01-13",
    charts: 6,
  },
  {
    id: "4",
    name: "Product Inventory",
    type: "uploaded",
    date: "2024-01-12",
    rows: 5600,
    columns: 15,
    size: "2.8 MB",
  },
  {
    id: "5",
    name: "Marketing Leads",
    type: "generated",
    date: "2024-01-10",
    rows: 500,
    columns: 6,
    size: "180 KB",
  },
  {
    id: "6",
    name: "Sales Performance",
    type: "dashboard",
    date: "2024-01-08",
    charts: 4,
  },
  {
    id: "7",
    name: "Employee Records",
    type: "uploaded",
    date: "2024-01-05",
    rows: 350,
    columns: 10,
    size: "220 KB",
  },
];

const typeConfig = {
  uploaded: { icon: FileSpreadsheet, color: "text-info", bg: "bg-info/20", label: "Uploaded" },
  generated: { icon: Sparkles, color: "text-primary", bg: "bg-primary/20", label: "AI Generated" },
  dashboard: { icon: BarChart3, color: "text-chart-3", bg: "bg-chart-3/20", label: "Dashboard" },
};

export default function History() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredItems.length) {
      setSelected([]);
    } else {
      setSelected(filteredItems.map((i) => i.id));
    }
  };

  return (
    <DashboardLayout title="History" description="View your past datasets and dashboards">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48 bg-secondary">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="uploaded">Uploaded</SelectItem>
            <SelectItem value="generated">AI Generated</SelectItem>
            <SelectItem value="dashboard">Dashboards</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Date Range
        </Button>
      </div>

      {/* Actions Bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-foreground">
            {selected.length} item(s) selected
          </span>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* History Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selected.length === filteredItems.length && filteredItems.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Details
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredItems.map((item) => {
              const config = typeConfig[item.type as keyof typeof typeConfig];
              const Icon = config.icon;

              return (
                <tr
                  key={item.id}
                  className={cn(
                    "hover:bg-muted/30 transition-colors",
                    selected.includes(item.id) && "bg-primary/5"
                  )}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", config.bg)}>
                        <Icon className={cn("h-5 w-5", config.color)} />
                      </div>
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        config.bg,
                        config.color
                      )}
                    >
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {item.type === "dashboard" ? (
                      <span>{item.charts} charts</span>
                    ) : (
                      <span>
                        {item.rows?.toLocaleString()} rows • {item.columns} cols •{" "}
                        {item.size}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No items found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredItems.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {historyItems.length} items
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
