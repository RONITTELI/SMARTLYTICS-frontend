import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Database,
  Sparkles,
  BarChart3,
  Upload,
  MessageSquare,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Dataset Generator",
    description: "Generate structured datasets on any topic using advanced AI models.",
  },
  {
    icon: Upload,
    title: "Smart Data Upload",
    description: "Upload CSV or Excel files and let AI clean and normalize your data.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Builder",
    description: "Create beautiful interactive charts and dashboards with drag & drop.",
  },
  {
    icon: Zap,
    title: "AI Insights",
    description: "Discover hidden patterns, trends, and anomalies in your data automatically.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description: "Ask questions about your data in plain English and get instant answers.",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Organize, version, and export your datasets and reports with ease.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen gradient-hero">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-chart-3/5 blur-3xl animate-pulse-slow" />
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-glow">
            <Database className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">Smartlytics</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button variant="gradient">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 pt-20 pb-32 lg:px-12 lg:pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-8">
            <Sparkles className="h-4 w-4" />
            AI-Powered Data Analytics Platform
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Transform Your Data
            <br />
            <span className="text-gradient">Into Actionable Insights</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate, clean, visualize, and analyze your data with the power of AI.
            Make data-driven decisions faster than ever before.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button variant="gradient" size="xl">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="xl">
                View Demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            {["No credit card required", "14-day free trial", "Cancel anytime"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need for
              <br />
              <span className="text-gradient">Data Excellence</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete suite of AI-powered tools to help you understand and leverage
              your data.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6 transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-12 md:p-16 shadow-elevated">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to unlock your data's potential?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of data professionals using Smartlytics to make better decisions.
            </p>
            <Link to="/auth" className="inline-block mt-8">
              <Button variant="glow" size="xl">
                <Sparkles className="h-5 w-5 mr-2" />
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-6 py-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Database className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Smartlytics</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Smartlytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
