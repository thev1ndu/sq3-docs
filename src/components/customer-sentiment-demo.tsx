"use client";

import {
  AlertCircle,
  CheckCircle,
  Heart,
  MessageSquare,
  Smile,
  TrendingDown,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  customer: string;
  message: string;
  timestamp: string;
  channel: string;
  language?: "en" | "si";
}

interface SentimentAnalysis {
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  score: number; // -1 to 1, where -1 is very negative, 1 is very positive
  emotions: string[];
  priority: "low" | "medium" | "high";
  reasoning: string[];
  suggestedActions: string[];
}

const messages: Message[] = [
  {
    id: 1,
    customer: "Sarah Martinez",
    message:
      "I absolutely love my new purchase! The quality is amazing and delivery was super fast. Highly recommend!",
    timestamp: "9:23 AM",
    channel: "Facebook",
  },
  {
    id: 2,
    customer: "Mike Johnson",
    message:
      "Very disappointed with my order. The item arrived damaged and customer service hasn't responded to my complaint yet.",
    timestamp: "9:45 AM",
    channel: "Instagram",
  },
  {
    id: 3,
    customer: "Emma Wilson",
    message: "What are your store hours? I'd like to visit this weekend.",
    timestamp: "10:12 AM",
    channel: "Website",
  },
  {
    id: 4,
    customer: "David Chen",
    message:
      "This is the worst experience I've ever had. The product doesn't work at all and I want a full refund immediately!",
    timestamp: "10:28 AM",
    channel: "Facebook",
  },
  {
    id: 5,
    customer: "Lisa Anderson",
    message:
      "Thanks for the quick response! The issue has been resolved perfectly. Great service!",
    timestamp: "10:45 AM",
    channel: "Instagram",
  },
  {
    id: 6,
    customer: "James Taylor",
    message: "Can you provide more information about the warranty policy?",
    timestamp: "11:02 AM",
    channel: "Website",
  },
  {
    id: 7,
    customer: "Maria Garcia",
    message:
      "සිංහල: මගේ ඇණවුම ඉතාමත් හොඳයි! තෑගි ඇසුරුම් කිරීම ද ඉතා සුන්දරයි. ස්තූතියි!",
    timestamp: "11:18 AM",
    channel: "Facebook",
    language: "si",
  },
];

const sentimentAnalyses: Record<number, SentimentAnalysis> = {
  1: {
    sentiment: "positive",
    confidence: 96,
    score: 0.92,
    emotions: ["Happy", "Satisfied", "Grateful"],
    priority: "low",
    reasoning: [
      "Strong positive language ('absolutely love', 'amazing', 'highly recommend')",
      "Expresses satisfaction with product quality and delivery",
      "Recommendation indicates high satisfaction",
    ],
    suggestedActions: [
      "Thank the customer for their feedback",
      "Ask if they'd like to leave a review",
      "Offer loyalty rewards or referral incentives",
    ],
  },
  2: {
    sentiment: "negative",
    confidence: 94,
    score: -0.78,
    emotions: ["Disappointed", "Frustrated", "Concerned"],
    priority: "high",
    reasoning: [
      "Expresses disappointment with product quality",
      "Mentions unaddressed complaint (service issue)",
      "Negative language indicates frustration",
    ],
    suggestedActions: [
      "Immediately acknowledge the complaint",
      "Apologize for the damage and poor service",
      "Offer replacement or refund",
      "Escalate to customer service manager",
      "Follow up within 24 hours",
    ],
  },
  3: {
    sentiment: "neutral",
    confidence: 89,
    score: 0.05,
    emotions: ["Inquisitive", "Neutral"],
    priority: "low",
    reasoning: [
      "Factual inquiry without emotional indicators",
      "Polite but neutral tone",
      "Standard information request",
    ],
    suggestedActions: [
      "Provide store hours information",
      "Offer additional store location details if available",
    ],
  },
  4: {
    sentiment: "negative",
    confidence: 98,
    score: -0.95,
    emotions: ["Angry", "Frustrated", "Urgent"],
    priority: "high",
    reasoning: [
      "Extreme negative language ('worst experience')",
      "Expresses urgency and demand for refund",
      "Strong emotional indicators suggest high priority",
    ],
    suggestedActions: [
      "Immediate response required (within 1 hour)",
      "Apologize profusely",
      "Process refund immediately",
      "Escalate to senior management",
      "Offer compensation or discount for future purchase",
    ],
  },
  5: {
    sentiment: "positive",
    confidence: 91,
    score: 0.85,
    emotions: ["Grateful", "Satisfied", "Appreciative"],
    priority: "low",
    reasoning: [
      "Positive feedback on service resolution",
      "Expresses gratitude and satisfaction",
      "Indicates successful problem resolution",
    ],
    suggestedActions: [
      "Thank the customer for their patience",
      "Ask for feedback on the resolution process",
      "Document as positive case study",
    ],
  },
  6: {
    sentiment: "neutral",
    confidence: 87,
    score: -0.02,
    emotions: ["Inquisitive", "Neutral"],
    priority: "low",
    reasoning: [
      "Standard information request",
      "No emotional indicators",
      "Factual inquiry",
    ],
    suggestedActions: [
      "Provide warranty policy information",
      "Offer to clarify any specific questions",
    ],
  },
  7: {
    sentiment: "positive",
    confidence: 93,
    score: 0.88,
    emotions: ["Happy", "Satisfied", "Grateful"],
    priority: "low",
    reasoning: [
      "Positive Sinhala language indicators",
      "Expresses satisfaction with order and packaging",
      "Thankful tone indicates positive sentiment",
    ],
    suggestedActions: [
      "Thank the customer in Sinhala",
      "Ask if they'd like to leave a review",
      "Offer loyalty rewards",
    ],
  },
};

const sentimentConfig = {
  positive: {
    icon: Smile,
    label: "Positive",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    badgeVariant: "default" as const,
  },
  negative: {
    icon: XCircle,
    label: "Negative",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    badgeVariant: "destructive" as const,
  },
  neutral: {
    icon: MessageSquare,
    label: "Neutral",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    badgeVariant: "outline" as const,
  },
};

const priorityConfig = {
  high: { icon: AlertCircle, label: "High Priority", color: "text-red-600" },
  medium: {
    icon: TrendingDown,
    label: "Medium Priority",
    color: "text-yellow-600",
  },
  low: { icon: CheckCircle, label: "Low Priority", color: "text-green-600" },
};

export function CustomerSentimentDemo() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalyze = () => {
    if (analyzing || showAnalysis) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowAnalysis(true);
    }, 1500);
  };

  const handleNext = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
      setShowAnalysis(false);
      setAnalyzing(false);
    }
  };

  const handlePrevious = () => {
    if (currentMessage > 0) {
      setCurrentMessage(currentMessage - 1);
      setShowAnalysis(false);
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentMessage(0);
    setShowAnalysis(false);
    setAnalyzing(false);
  };

  const message = messages[currentMessage];
  const analysis = sentimentAnalyses[message.id];
  const sentiment = sentimentConfig[analysis.sentiment];
  const priority = priorityConfig[analysis.priority];
  const PriorityIcon = priority.icon;

  // Calculate sentiment distribution for analytics
  const sentimentStats = messages.reduce(
    (acc, msg) => {
      const msgAnalysis = sentimentAnalyses[msg.id];
      acc[msgAnalysis.sentiment]++;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

  const totalMessages = messages.length;
  const positivePercentage = (sentimentStats.positive / totalMessages) * 100;
  const negativePercentage = (sentimentStats.negative / totalMessages) * 100;
  const neutralPercentage = (sentimentStats.neutral / totalMessages) * 100;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Message Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Heart className="size-4 text-muted-foreground" />
              </div>
              <div>
                <CardTitle>Sentiment Analysis</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time sentiment detection
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Message Display */}
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{message.customer}</p>
                  <p className="text-xs text-muted-foreground">
                    {message.timestamp}
                  </p>
                </div>
                <Badge variant="outline">{message.channel}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {message.message}
              </p>
              {message.language === "si" && (
                <Badge variant="outline" className="gap-1.5 text-xs">
                  සිංහල
                </Badge>
              )}
            </div>

            {/* Analysis Button */}
            <Button
              onClick={handleAnalyze}
              disabled={analyzing || showAnalysis}
              variant="default"
              className="w-full"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Zap className="mr-2 size-4 animate-pulse" />
                  Analyzing Sentiment...
                </>
              ) : showAnalysis ? (
                <>
                  <CheckCircle className="mr-2 size-4" />
                  Analysis Complete
                </>
              ) : (
                <>
                  <Heart className="mr-2 size-4" />
                  Analyze Sentiment
                </>
              )}
            </Button>

            {/* Analysis Results */}
            <AnimatePresence>
              {showAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "space-y-4 rounded-lg border p-4",
                    sentiment.bgColor,
                    sentiment.borderColor
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <sentiment.icon
                        className={cn("size-5", sentiment.color)}
                      />
                      <div>
                        <p className="text-sm font-semibold">
                          {sentiment.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Confidence: {analysis.confidence}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityIcon className={cn("size-4", priority.color)} />
                      <span className="text-xs font-medium">
                        {priority.label}
                      </span>
                    </div>
                  </div>

                  {/* Sentiment Score */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Sentiment Score
                      </span>
                      <span className="font-medium">
                        {analysis.score > 0 ? "+" : ""}
                        {analysis.score.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full",
                          analysis.sentiment === "positive"
                            ? "bg-green-500"
                            : analysis.sentiment === "negative"
                              ? "bg-red-500"
                              : "bg-gray-500"
                        )}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.abs(analysis.score) * 100}%`,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-px bg-foreground/20" />
                      </div>
                    </div>
                  </div>

                  {/* Emotions */}
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Detected Emotions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.emotions.map((emotion, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Analysis Reasoning
                    </p>
                    <ul className="space-y-1">
                      {analysis.reasoning.map((reason, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <span className="mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested Actions */}
                  <div className="border-t border-border/50 pt-3">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Suggested Actions
                    </p>
                    <ul className="space-y-1.5">
                      {analysis.suggestedActions.map((action, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-foreground"
                        >
                          <CheckCircle className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-2">
              <Button
                onClick={handlePrevious}
                disabled={currentMessage === 0}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentMessage === messages.length - 1}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Next
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analytics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sentiment Distribution */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smile className="size-4 text-green-600" />
                    <span className="text-sm font-medium">Positive</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {sentimentStats.positive}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {positivePercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${positivePercentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-4 text-gray-600" />
                    <span className="text-sm font-medium">Neutral</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {sentimentStats.neutral}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {neutralPercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gray-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${neutralPercentage}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="size-4 text-red-600" />
                    <span className="text-sm font-medium">Negative</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {sentimentStats.negative}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {negativePercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${negativePercentage}%` }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Key Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    icon: Heart,
                    text: "Real-time sentiment detection across all channels",
                  },
                  {
                    icon: AlertCircle,
                    text: "Priority alerts for negative sentiments",
                  },
                  {
                    icon: TrendingUp,
                    text: "Track customer satisfaction trends over time",
                  },
                  {
                    icon: Zap,
                    text: "Proactive customer service for at-risk customers",
                  },
                  {
                    icon: MessageSquare,
                    text: "Multilingual sentiment analysis (Sinhala, English)",
                  },
                  {
                    icon: CheckCircle,
                    text: "Data-driven insights for service improvement",
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-muted">
                      <benefit.icon className="size-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
