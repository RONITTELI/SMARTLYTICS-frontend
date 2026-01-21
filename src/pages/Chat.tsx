import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Sparkles,
  User,
  Database,
  TrendingUp,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What is the highest sales month?",
  "Which product category performs best?",
  "Show me the revenue trend for Q4",
  "What percentage of customers are from New York?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI data analyst. I can help you understand your datasets, find patterns, and answer questions about your data. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponses: Record<string, string> = {
      "highest sales":
        "Based on your sales data, **December** had the highest sales with a total revenue of **$156,000**, representing a 23% increase compared to November. The top-performing products were Electronics and Home Appliances.",
      "product category":
        "Looking at your data, the **Electronics** category performs best with:\n\n• 35% of total revenue\n• Average order value: $245\n• 12% month-over-month growth\n\nThis is followed by Clothing (28%) and Home & Garden (22%).",
      "revenue trend":
        "The Q4 revenue trend shows strong growth:\n\n📈 October: $98,000\n📈 November: $127,000 (+29.6%)\n📈 December: $156,000 (+22.8%)\n\nOverall Q4 growth: **59.2%** compared to Q3.",
      default:
        "I've analyzed your data and found some interesting patterns. Based on the dataset, I can see correlations between various metrics. Would you like me to dive deeper into any specific aspect?",
    };

    const responseKey = Object.keys(aiResponses).find((key) =>
      input.toLowerCase().includes(key)
    );

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponses[responseKey || "default"],
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout title="AI Chat" description="Ask questions about your data">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Data AI Assistant</h2>
              <p className="text-sm text-muted-foreground">
                Connected to: Sales Data Q4.xlsx
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-primary"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>

                <div
                  className={cn(
                    "max-w-[80%] rounded-xl p-4",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-2",
                      message.role === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Analyzing your data...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => setInput(question)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border border-border bg-secondary hover:bg-primary/10 hover:border-primary/50 transition-colors"
                  >
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex gap-3">
              <Textarea
                placeholder="Ask a question about your data..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[48px] max-h-32 bg-secondary resize-none"
                rows={1}
              />
              <Button
                variant="gradient"
                size="icon"
                className="h-12 w-12 shrink-0"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { icon: Database, label: "Dataset Rows", value: "2,450" },
            { icon: BarChart3, label: "Columns Analyzed", value: "12" },
            { icon: Sparkles, label: "Insights Generated", value: "24" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
