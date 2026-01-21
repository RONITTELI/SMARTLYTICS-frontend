import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  Plus,
  Sparkles,
  Save,
  Download,
  Maximize2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";

const chartTypes = [
  { id: "bar", name: "Bar Chart", icon: BarChart3 },
  { id: "line", name: "Line Chart", icon: LineChart },
  { id: "pie", name: "Pie Chart", icon: PieChart },
  { id: "area", name: "Area Chart", icon: AreaChart },
];

const sampleBarData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const samplePieData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
];

const COLORS = ["hsl(173, 80%, 50%)", "hsl(199, 89%, 48%)", "hsl(280, 80%, 60%)", "hsl(43, 96%, 56%)"];

interface ChartConfig {
  id: string;
  type: string;
  title: string;
}

export default function Charts() {
  const [charts, setCharts] = useState<ChartConfig[]>([
    { id: "1", type: "bar", title: "Monthly Revenue" },
    { id: "2", type: "line", title: "User Growth" },
  ]);
  const [selectedChart, setSelectedChart] = useState<string>("bar");
  const [chartTitle, setChartTitle] = useState("");

  const addChart = () => {
    if (!chartTitle) return;
    const newChart: ChartConfig = {
      id: Date.now().toString(),
      type: selectedChart,
      title: chartTitle,
    };
    setCharts([...charts, newChart]);
    setChartTitle("");
  };

  const removeChart = (id: string) => {
    setCharts(charts.filter((c) => c.id !== id));
  };

  const renderChart = (type: string) => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={sampleBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={samplePieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {samplePieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={sampleBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.2)"
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Dashboard Builder" description="Create interactive data visualizations">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Add New Chart</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Chart Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {chartTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedChart(type.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border p-3 transition-all",
                        selectedChart === type.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary hover:border-primary/50"
                      )}
                    >
                      <type.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chartTitle">Chart Title</Label>
                <Input
                  id="chartTitle"
                  placeholder="Enter chart title..."
                  value={chartTitle}
                  onChange={(e) => setChartTitle(e.target.value)}
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label>Data Source</Label>
                <Select defaultValue="sales">
                  <SelectTrigger className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Data Q4</SelectItem>
                    <SelectItem value="customers">Customer Database</SelectItem>
                    <SelectItem value="products">Product Inventory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="gradient" className="w-full" onClick={addChart}>
                <Plus className="h-4 w-4 mr-2" />
                Add Chart
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your data, we recommend these visualizations:
            </p>
            <div className="space-y-2">
              {["Revenue Trend (Line)", "Category Split (Pie)", "Monthly Comparison (Bar)"].map(
                (rec) => (
                  <button
                    key={rec}
                    className="w-full text-left px-3 py-2 text-sm rounded-lg border border-border bg-secondary hover:bg-primary/10 hover:border-primary/50 transition-colors"
                  >
                    {rec}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Your Dashboard</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {charts.map((chart) => (
              <div
                key={chart.id}
                className="rounded-xl border border-border bg-card shadow-card overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-medium text-foreground">{chart.title}</h3>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeChart(chart.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-64 p-4">{renderChart(chart.type)}</div>
              </div>
            ))}

            {charts.length === 0 && (
              <div className="col-span-2 flex flex-col items-center justify-center h-64 rounded-xl border-2 border-dashed border-border bg-muted/20">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground">No charts yet</p>
                <p className="text-sm text-muted-foreground">
                  Add a chart from the configuration panel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
