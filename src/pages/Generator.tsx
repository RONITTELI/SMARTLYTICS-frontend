import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Download,
  FileSpreadsheet,
  Table2,
  Wand2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const sampleData = [
  { id: 1, name: "John Smith", email: "john@example.com", age: 28, city: "New York", salary: 75000 },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", age: 34, city: "Los Angeles", salary: 82000 },
  { id: 3, name: "Mike Williams", email: "mike@example.com", age: 41, city: "Chicago", salary: 95000 },
  { id: 4, name: "Emily Brown", email: "emily@example.com", age: 26, city: "Houston", salary: 68000 },
  { id: 5, name: "David Lee", email: "david@example.com", age: 38, city: "Phoenix", salary: 88000 },
];

export default function Generator() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [rows, setRows] = useState("100");
  const [columns, setColumns] = useState("6");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<typeof sampleData | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error("Please enter a dataset topic");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setGeneratedData(sampleData);
    setIsGenerating(false);
    toast.success("Dataset generated successfully!");
  };

  const handleDownload = (format: "csv" | "xlsx") => {
    toast.success(`Downloading as ${format.toUpperCase()}...`);
  };

  return (
    <DashboardLayout title="AI Dataset Generator" description="Generate structured datasets using AI">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <Wand2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Dataset Configuration</h2>
                <p className="text-sm text-muted-foreground">Define your dataset parameters</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="topic">Dataset Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Employee Records, Sales Data, Customer Information"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the specific fields or data types you need..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-secondary min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rows">Number of Rows</Label>
                  <Select value={rows} onValueChange={setRows}>
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50 rows</SelectItem>
                      <SelectItem value="100">100 rows</SelectItem>
                      <SelectItem value="500">500 rows</SelectItem>
                      <SelectItem value="1000">1,000 rows</SelectItem>
                      <SelectItem value="5000">5,000 rows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="columns">Number of Columns</Label>
                  <Select value={columns} onValueChange={setColumns}>
                    <SelectTrigger className="bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 columns</SelectItem>
                      <SelectItem value="6">6 columns</SelectItem>
                      <SelectItem value="8">8 columns</SelectItem>
                      <SelectItem value="10">10 columns</SelectItem>
                      <SelectItem value="12">12 columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Dataset
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-semibold text-foreground mb-4">Popular Templates</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Sales Data",
                "Customer Database",
                "Employee Records",
                "Product Inventory",
                "Financial Transactions",
                "Survey Responses",
              ].map((template) => (
                <button
                  key={template}
                  onClick={() => setTopic(template)}
                  className="px-3 py-1.5 text-sm rounded-full border border-border bg-secondary hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Table2 className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Data Preview</h2>
            </div>
            {generatedData && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDownload("csv")}>
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload("xlsx")}>
                  <FileSpreadsheet className="h-4 w-4 mr-1" />
                  Excel
                </Button>
              </div>
            )}
          </div>

          <div className="p-4">
            {!generatedData ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No Data Generated Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  Configure your dataset parameters and click "Generate Dataset" to create AI-powered data.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {Object.keys(generatedData[0]).map((key) => (
                        <th
                          key={key}
                          className="px-4 py-3 text-left font-medium text-muted-foreground uppercase text-xs tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {generatedData.map((row, index) => (
                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="px-4 py-3 text-foreground whitespace-nowrap">
                            {typeof value === "number" && value > 1000
                              ? `$${value.toLocaleString()}`
                              : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Showing 5 of {rows} rows
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
