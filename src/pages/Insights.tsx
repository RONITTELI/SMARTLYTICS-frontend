import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  Sparkles,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const insights = [
  {
    id: "1",
    type: "trend",
    icon: TrendingUp,
    title: "Revenue Growth Detected",
    description:
      "Your revenue has increased by 23% in the last month, primarily driven by the Electronics category.",
    impact: "high",
    recommendation: "Consider increasing inventory for Electronics products.",
    metric: "+23%",
    metricLabel: "Revenue Growth",
  },
  {
    id: "2",
    type: "pattern",
    icon: Lightbulb,
    title: "Seasonal Pattern Identified",
    description:
      "Sales consistently peak on Fridays and weekends. Weekend sales are 45% higher than weekdays.",
    impact: "medium",
    recommendation: "Optimize marketing campaigns for Thursday-Friday.",
    metric: "45%",
    metricLabel: "Weekend Premium",
  },
  {
    id: "3",
    type: "anomaly",
    icon: AlertTriangle,
    title: "Unusual Drop in Northeast Region",
    description:
      "Sales in the Northeast region dropped 15% compared to the previous period without clear cause.",
    impact: "high",
    recommendation: "Investigate regional factors and customer feedback.",
    metric: "-15%",
    metricLabel: "Regional Decline",
  },
  {
    id: "4",
    type: "trend",
    icon: TrendingDown,
    title: "Customer Acquisition Cost Rising",
    description:
      "CAC has increased by 8% over the last quarter. Consider optimizing marketing spend.",
    impact: "medium",
    recommendation: "Review and optimize advertising channels.",
    metric: "+8%",
    metricLabel: "CAC Increase",
  },
  {
    id: "5",
    type: "opportunity",
    icon: Sparkles,
    title: "Cross-Sell Opportunity",
    description:
      "Customers who buy Product A have a 67% chance of buying Product B within 30 days.",
    impact: "high",
    recommendation: "Create bundled offers for Products A and B.",
    metric: "67%",
    metricLabel: "Cross-sell Rate",
  },
];

const impactColors = {
  high: "border-l-primary bg-primary/5",
  medium: "border-l-warning bg-warning/5",
  low: "border-l-muted-foreground bg-muted/30",
};

const impactBadges = {
  high: "bg-primary/20 text-primary",
  medium: "bg-warning/20 text-warning",
  low: "bg-muted text-muted-foreground",
};

export default function Insights() {
  return (
    <DashboardLayout
      title="AI Insights"
      description="Smart analysis and recommendations from your data"
    >
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {[
          { label: "Total Insights", value: "24", icon: Sparkles, color: "text-primary" },
          { label: "Trends Found", value: "8", icon: TrendingUp, color: "text-success" },
          { label: "Anomalies", value: "3", icon: AlertTriangle, color: "text-warning" },
          { label: "Opportunities", value: "5", icon: Lightbulb, color: "text-info" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={cn("h-6 w-6", stat.color)} />
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Latest Insights</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: 5 minutes ago
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Insights
        </Button>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "rounded-xl border border-border bg-card shadow-card overflow-hidden border-l-4 transition-all hover:shadow-elevated",
              impactColors[insight.impact as keyof typeof impactColors]
            )}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    insight.type === "anomaly"
                      ? "bg-warning/20 text-warning"
                      : insight.type === "opportunity"
                      ? "bg-primary/20 text-primary"
                      : "bg-success/20 text-success"
                  )}
                >
                  <insight.icon className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {insight.title}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs font-medium rounded-full capitalize",
                            impactBadges[insight.impact as keyof typeof impactBadges]
                          )}
                        >
                          {insight.impact} impact
                        </span>
                      </div>
                      <p className="mt-1 text-muted-foreground">{insight.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p
                        className={cn(
                          "text-2xl font-bold",
                          insight.metric.startsWith("+")
                            ? "text-success"
                            : insight.metric.startsWith("-")
                            ? "text-destructive"
                            : "text-primary"
                        )}
                      >
                        {insight.metric}
                      </p>
                      <p className="text-sm text-muted-foreground">{insight.metricLabel}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex-1 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Recommendation
                      </p>
                      <p className="text-sm text-foreground">{insight.recommendation}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Explore
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generate More */}
      <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
        <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
        <h3 className="text-lg font-semibold text-foreground">Want deeper analysis?</h3>
        <p className="mt-1 text-muted-foreground max-w-md mx-auto">
          Our AI can generate more detailed insights by analyzing patterns across your
          entire dataset history.
        </p>
        <Button variant="gradient" className="mt-4">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Deep Analysis
        </Button>
      </div>
    </DashboardLayout>
  );
}
