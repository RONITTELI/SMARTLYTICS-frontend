import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Upload as UploadIcon,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Download,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
  rows?: number;
  columns?: number;
}

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
    };

    setFiles((prev) => [...prev, newFile]);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setFiles((prev) =>
        prev.map((f) =>
          f.name === file.name
            ? { ...f, progress: i, status: i < 100 ? "uploading" : "processing" }
            : f
        )
      );
    }

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFiles((prev) =>
      prev.map((f) =>
        f.name === file.name
          ? { ...f, status: "completed", rows: Math.floor(Math.random() * 5000) + 500, columns: Math.floor(Math.random() * 10) + 5 }
          : f
      )
    );

    toast.success(`${file.name} processed successfully!`);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(processFile);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(processFile);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <DashboardLayout title="Upload Data" description="Import and clean your CSV or Excel files">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
          )}
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300",
                isDragging ? "gradient-primary shadow-glow" : "bg-primary/10"
              )}
            >
              <UploadIcon
                className={cn(
                  "h-10 w-10 transition-colors",
                  isDragging ? "text-primary-foreground" : "text-primary"
                )}
              />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-foreground">
              {isDragging ? "Drop files here" : "Drag & drop files here"}
            </h3>
            <p className="mt-2 text-muted-foreground">
              or <span className="text-primary font-medium">browse</span> to upload
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Supports CSV, XLS, and XLSX files up to 50MB
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Uploaded Files</h2>
            
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      {file.status === "completed" && (
                        <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      )}
                      {file.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.rows && (
                        <>
                          <span>•</span>
                          <span>{file.rows.toLocaleString()} rows</span>
                          <span>•</span>
                          <span>{file.columns} columns</span>
                        </>
                      )}
                    </div>

                    {(file.status === "uploading" || file.status === "processing") && (
                      <div className="mt-2">
                        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full gradient-primary transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {file.status === "uploading" ? "Uploading..." : "Processing with AI..."}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === "completed" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Sparkles className="h-4 w-4 mr-1" />
                          Clean
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.name)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cleaning Summary (shown after processing) */}
        {files.some((f) => f.status === "completed") && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
                <Sparkles className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Cleaning Summary</h3>
                <p className="text-sm text-muted-foreground">Automated data quality improvements</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Duplicates Removed", value: "145", color: "text-destructive" },
                { label: "Missing Values Fixed", value: "89", color: "text-warning" },
                { label: "Columns Normalized", value: "12", color: "text-info" },
                { label: "Data Quality Score", value: "98%", color: "text-success" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-muted/30 p-4">
                  <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="gradient">
                <Download className="h-4 w-4 mr-2" />
                Download Cleaned Data
              </Button>
              <Button variant="outline">View Detailed Report</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
