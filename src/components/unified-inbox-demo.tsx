"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Inbox,
  Facebook,
  Instagram,
  Globe,
  MessageSquare,
  Clock,
  Languages,
  Zap,
  CheckCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  channel: "facebook" | "instagram" | "website";
  customer: string;
  text: string;
  timestamp: string;
  status: "unread" | "read" | "replied";
  language?: "en" | "si";
  translation?: string;
}

const messages: Message[] = [
  {
    id: 1,
    channel: "facebook",
    customer: "Sarah Martinez",
    text: "Hi! Do you have the blue sneakers in size 8?",
    timestamp: "9:23 AM",
    status: "unread",
  },
  {
    id: 2,
    channel: "instagram",
    customer: "Mike Johnson",
    text: "Love your new collection! When will it be available?",
    timestamp: "9:31 AM",
    status: "unread",
  },
  {
    id: 3,
    channel: "website",
    customer: "Emma Wilson",
    text: "My order #12847 hasn't arrived yet. Can you check?",
    timestamp: "9:45 AM",
    status: "unread",
  },
  {
    id: 4,
    channel: "facebook",
    customer: "David Chen",
    text: "What are your store hours this weekend?",
    timestamp: "10:02 AM",
    status: "unread",
  },
  {
    id: 5,
    channel: "instagram",
    customer: "Lisa Anderson",
    text: "Can I return items bought online to your physical store?",
    timestamp: "10:15 AM",
    status: "unread",
  },
  {
    id: 6,
    channel: "website",
    customer: "James Taylor",
    text: "Do you ship internationally? I'm in Canada.",
    timestamp: "10:28 AM",
    status: "unread",
  },
  {
    id: 7,
    channel: "facebook",
    customer: "Maria Garcia",
    text: "Is the 20% off code still valid?",
    timestamp: "10:41 AM",
    status: "unread",
  },
  {
    id: 8,
    channel: "instagram",
    customer: "Alex Kim",
    text: "Just placed an order! How long until it ships?",
    timestamp: "10:55 AM",
    status: "unread",
  },
  {
    id: 9,
    channel: "facebook",
    customer: "Priyanka Perera",
    text: "මගේ ඇණවුම #12850 ගැන තොරතුරු දෙන්න පුළුවන්ද? කොහොමද බාරදීම?",
    timestamp: "11:12 AM",
    status: "unread",
    language: "si",
    translation:
      "Can you give me information about my order #12850? How is the delivery?",
  },
];

const channelConfig = {
  facebook: {
    icon: Facebook,
    label: "Facebook",
  },
  instagram: {
    icon: Instagram,
    label: "Instagram",
  },
  website: {
    icon: Globe,
    label: "Website",
  },
};

export function UnifiedInboxDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleAutoPlay = () => {
    setIsPlaying(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= messages.length) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 800);
  };

  const handleNext = () => {
    if (visibleCount < messages.length) {
      setVisibleCount(visibleCount + 1);
    }
  };

  const handleReset = () => {
    setVisibleCount(0);
    setIsPlaying(false);
    setSelectedMessage(null);
  };

  const visibleMessages = messages.slice(0, visibleCount);

  const channelCounts = messages.reduce((acc, msg) => {
    acc[msg.channel] = (acc[msg.channel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Unified Inbox */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Inbox className="size-4 text-muted-foreground" />
              </div>
              <div>
                <CardTitle>Unified Inbox</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  All channels in one chronological view
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Channel Pills */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(channelConfig).map(([key, config]) => {
                const Icon = config.icon;
                const count =
                  channelCounts[key as keyof typeof channelConfig] || 0;
                return (
                  <Badge key={key} variant="outline" className="gap-1.5">
                    <Icon className="size-3" />
                    {config.label}
                    <span className="text-muted-foreground">({count})</span>
                  </Badge>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Messages loaded</span>
                <span className="text-muted-foreground">
                  {Math.round((visibleCount / messages.length) * 100)}%
                </span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-foreground rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(visibleCount / messages.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Messages List */}
            <div className="border border-border rounded-lg bg-muted/30 max-h-[400px] overflow-y-auto">
              <div className="p-4 space-y-3">
                <AnimatePresence>
                  {visibleMessages.map((message) => {
                    const config = channelConfig[message.channel];
                    const Icon = config.icon;

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMessage(message)}
                        className={cn(
                          "p-3 rounded-lg border border-border bg-background cursor-pointer transition-colors",
                          "hover:border-foreground/20 hover:bg-muted/50",
                          selectedMessage?.id === message.id &&
                            "border-foreground/30 bg-muted"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Icon className="size-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium">
                                {message.customer}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {message.timestamp}
                                </span>
                                {message.status === "unread" && (
                                  <div className="size-2 rounded-full bg-foreground" />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {message.text}
                            </p>
                            {message.translation && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Languages className="size-3" />
                                <span className="italic">
                                  {message.translation}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {config.label}
                              </Badge>
                              {message.language === "si" && (
                                <Badge variant="outline" className="text-xs gap-1">
                                  <Languages className="size-3" />
                                  සිංහල
                                </Badge>
                              )}
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  message.status === "unread" &&
                                    "border-foreground/30"
                                )}
                              >
                                {message.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {visibleCount === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Inbox className="size-12 text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Click "Auto Play" to load messages
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleAutoPlay}
                disabled={isPlaying || visibleCount === messages.length}
                variant="default"
                size="sm"
                className="flex-1"
              >
                <Zap className="size-4 mr-2" />
                Auto Play
              </Button>
              <Button
                onClick={handleNext}
                disabled={visibleCount === messages.length}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Message Detail & Benefits */}
        <div className="space-y-6">
          {/* Selected Message Detail */}
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Message Details</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMessage(null)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Customer
                      </p>
                      <p className="text-sm font-medium">
                        {selectedMessage.customer}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                        Channel
                      </p>
                      {(() => {
                        const ChannelIcon =
                          channelConfig[selectedMessage.channel].icon;
                        return (
                          <Badge variant="outline" className="gap-1.5">
                            <ChannelIcon className="size-3" />
                            {channelConfig[selectedMessage.channel].label}
                          </Badge>
                        );
                      })()}
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                        Message
                      </p>
                      <p className="text-sm text-foreground mb-2">
                        {selectedMessage.text}
                      </p>
                      {selectedMessage.translation && (
                        <div className="space-y-2">
                          {selectedMessage.language === "si" && (
                            <Badge variant="outline" className="text-xs gap-1.5">
                              <Languages className="size-3" />
                              සිංහල
                            </Badge>
                          )}
                          <p className="text-xs text-muted-foreground italic">
                            <span className="font-medium">Translation:</span>{" "}
                            {selectedMessage.translation}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Timestamp
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <p className="text-sm">{selectedMessage.timestamp}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button variant="outline" className="w-full" size="sm">
                        <MessageSquare className="size-4 mr-2" />
                        Reply to Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <MessageSquare className="size-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Click on any message to view details
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Key Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    icon: Inbox,
                    text: "All channels in one chronological view",
                  },
                  {
                    icon: Clock,
                    text: "No switching between platforms",
                  },
                  {
                    icon: MessageSquare,
                    text: "Unified customer conversation history",
                  },
                  {
                    icon: Zap,
                    text: "Faster response times",
                  },
                  {
                    icon: CheckCircle,
                    text: "Improved customer satisfaction",
                  },
                  {
                    icon: Languages,
                    text: "Multilingual support (Sinhala, Tamil, English)",
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-muted mt-0.5">
                      <benefit.icon className="size-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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

