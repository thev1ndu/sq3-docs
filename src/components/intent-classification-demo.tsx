"use client";

import {
  AlertCircle,
  Brain,
  CheckCircle,
  Clock,
  MessageSquare,
  Target,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Scenario {
  id: number;
  customer: string;
  message: string;
  timestamp: string;
  channel: string;
}

interface IntentClassification {
  primaryIntent: string;
  confidence: number;
  secondaryIntents: Array<{
    intent: string;
    confidence: number;
  }>;
  reasoning: string[];
  category: "support" | "sales" | "service" | "information";
  suggestedActions: string[];
  urgency: "low" | "medium" | "high";
}

const scenarios: Scenario[] = [
  {
    id: 1,
    customer: "Sarah Martinez",
    message: "Hi! Do you have the blue sneakers in size 8?",
    timestamp: "9:23 AM",
    channel: "Facebook",
  },
  {
    id: 2,
    customer: "Mike Johnson",
    message:
      "My order #12847 hasn't arrived yet. It's been 3 weeks and I need it urgently for work.",
    timestamp: "9:45 AM",
    channel: "Instagram",
  },
  {
    id: 3,
    customer: "Emma Wilson",
    message:
      "I'd like to schedule a consultation for next Tuesday afternoon if possible.",
    timestamp: "10:12 AM",
    channel: "Website",
  },
];

const classifications: Record<number, IntentClassification> = {
  1: {
    primaryIntent: "Product Inquiry",
    confidence: 94,
    secondaryIntents: [
      { intent: "Availability Check", confidence: 85 },
      { intent: "Purchase Intent", confidence: 72 },
    ],
    reasoning: [
      "Direct question about specific product attributes",
      "Mentions size and color (specific purchase criteria)",
      "Neutral tone suggests information gathering",
    ],
    category: "sales",
    suggestedActions: [
      "Check inventory for blue sneakers size 8",
      "Provide product details and pricing",
      "Offer similar alternatives if out of stock",
    ],
    urgency: "medium",
  },
  2: {
    primaryIntent: "Order Status Complaint",
    confidence: 97,
    secondaryIntents: [
      { intent: "Delivery Inquiry", confidence: 92 },
      { intent: "Urgent Request", confidence: 88 },
    ],
    reasoning: [
      "Mentions specific order number (#12847)",
      "Expresses frustration with delay (3 weeks)",
      'Indicates urgency ("need it urgently")',
    ],
    category: "support",
    suggestedActions: [
      "Immediately check order status",
      "Provide tracking information",
      "Offer expedited shipping if available",
      "Escalate to customer service manager",
    ],
    urgency: "high",
  },
  3: {
    primaryIntent: "Appointment Booking",
    confidence: 91,
    secondaryIntents: [
      { intent: "Service Request", confidence: 78 },
      { intent: "Scheduling Inquiry", confidence: 82 },
    ],
    reasoning: [
      'Explicit scheduling request ("schedule a consultation")',
      'Specific time mentioned ("next Tuesday afternoon")',
      "Polite, structured request format",
    ],
    category: "service",
    suggestedActions: [
      "Check calendar availability for Tuesday afternoon",
      "Confirm consultation type and duration",
      "Send calendar invitation",
    ],
    urgency: "low",
  },
};

const categoryLabels = {
  support: "Support",
  sales: "Sales",
  service: "Service",
  information: "Information",
};

const urgencyConfig = {
  high: { icon: AlertCircle, label: "High" },
  medium: { icon: Clock, label: "Medium" },
  low: { icon: CheckCircle, label: "Low" },
};

export function IntentClassificationDemo() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [showClassification, setShowClassification] = useState(false);

  const handleAnalyze = () => {
    if (analyzing || showClassification) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowClassification(true);
    }, 1500);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setShowClassification(false);
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentScenario(0);
    setShowClassification(false);
    setAnalyzing(false);
  };

  const currentScenarioData = scenarios[currentScenario];
  const classification = classifications[currentScenarioData?.id];
  const urgencyInfo = classification
    ? urgencyConfig[classification.urgency]
    : null;

  return (
    <div className="space-y-6">
      {/* Message Display */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Customer Message</h3>
                <p className="text-sm text-muted-foreground">
                  Scenario {currentScenario + 1} of {scenarios.length}
                </p>
              </div>
            </div>
            <Badge variant="outline">Live Demo</Badge>
          </div>

          <AnimatePresence mode="wait">
            {currentScenarioData && (
              <motion.div
                key={currentScenarioData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {currentScenarioData.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {currentScenarioData.timestamp}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {currentScenarioData.channel}
                    </Badge>
                  </div>
                  <p className="leading-relaxed text-foreground">
                    {currentScenarioData.message}
                  </p>
                </div>

                {analyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg border border-border bg-muted/30 p-6 text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mx-auto mb-3 h-10 w-10"
                    >
                      <Brain className="h-10 w-10 text-foreground" />
                    </motion.div>
                    <p className="font-medium">Analyzing intent...</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Extracting meaning and classifying intent
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleAnalyze}
              disabled={analyzing || showClassification}
              className="flex-1"
            >
              Analyze Intent
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                !showClassification || currentScenario === scenarios.length - 1
              }
              variant="outline"
            >
              Next
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Classification Results */}
      <AnimatePresence mode="wait">
        {showClassification && classification && urgencyInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Primary Intent */}
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-foreground" />
                    <div>
                      <h3 className="font-semibold">Primary Intent</h3>
                      <p className="text-sm text-muted-foreground">
                        AI Classification
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {categoryLabels[classification.category]}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="mb-2 text-lg font-semibold">
                      {classification.primaryIntent}
                    </p>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Confidence
                      </span>
                      <span className="text-sm font-medium">
                        {classification.confidence}%
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-foreground"
                        initial={{ width: 0 }}
                        animate={{ width: `${classification.confidence}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-border pt-2">
                    <urgencyInfo.icon className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline">{urgencyInfo.label} Urgency</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Intents */}
            <Card>
              <CardContent className="space-y-3 p-6">
                <h3 className="font-semibold">Secondary Intents</h3>
                <div className="space-y-3">
                  {classification.secondaryIntents.map((intent, idx) => (
                    <div key={idx} className="rounded-lg bg-muted/30 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-medium">{intent.intent}</p>
                        <span className="text-xs text-muted-foreground">
                          {intent.confidence}%
                        </span>
                      </div>
                      <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-foreground/60"
                          initial={{ width: 0 }}
                          animate={{ width: `${intent.confidence}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reasoning */}
            <Card>
              <CardContent className="space-y-3 p-6">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-foreground" />
                  <h3 className="font-semibold">AI Reasoning</h3>
                </div>
                <div className="space-y-2">
                  {classification.reasoning.map((reason, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3 rounded-lg bg-muted/30 p-3"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                      <p className="text-sm text-foreground">{reason}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Actions */}
            <Card>
              <CardContent className="space-y-3 p-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-foreground" />
                  <h3 className="font-semibold">Suggested Actions</h3>
                </div>
                <div className="space-y-2">
                  {classification.suggestedActions.map((action, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-medium text-foreground">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-foreground">{action}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {!showClassification && !analyzing && (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted/30">
                  <Brain className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-semibold">Intent Classification</h3>
                <p className="text-sm text-muted-foreground">
                  Click &quot;Analyze Intent&quot; to see AI-powered
                  classification results
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </AnimatePresence>
    </div>
  );
}
