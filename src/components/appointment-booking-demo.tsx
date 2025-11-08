"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { AnimatePresence,motion } from "motion/react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BookingStep {
  id: number;
  title: string;
  message: string;
  isBot: boolean;
}

interface AppointmentDetails {
  service: string;
  date: string;
  time: string;
  duration: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

const conversationFlow: BookingStep[] = [
  {
    id: 1,
    title: "Customer Inquiry",
    message: "Hi, I'd like to book an appointment for a consultation.",
    isBot: false,
  },
  {
    id: 2,
    title: "AI Understanding",
    message:
      "I'd be happy to help you schedule a consultation! What service are you interested in?",
    isBot: true,
  },
  {
    id: 3,
    title: "Service Selection",
    message: "I need a business strategy consultation.",
    isBot: false,
  },
  {
    id: 4,
    title: "AI Processing",
    message:
      "Perfect! I can schedule a Business Strategy Consultation for you. These sessions typically last 60 minutes. What date works best for you?",
    isBot: true,
  },
  {
    id: 5,
    title: "Date Request",
    message: "How about next Tuesday?",
    isBot: false,
  },
  {
    id: 6,
    title: "AI Availability Check",
    message:
      "Let me check availability for Tuesday, December 10th. I have these time slots available:\n\n• 10:00 AM\n• 2:00 PM\n• 4:30 PM\n\nWhich time works best for you?",
    isBot: true,
  },
  {
    id: 7,
    title: "Time Selection",
    message: "2:00 PM would be perfect.",
    isBot: false,
  },
  {
    id: 8,
    title: "Confirmation",
    message:
      "Excellent! I've scheduled your Business Strategy Consultation for:\n\n📅 Tuesday, December 10th, 2025\n🕐 2:00 PM - 3:00 PM\n\nCould you please confirm your contact details?\n\nName: John Smith\nEmail: john.smith@email.com\nPhone: (555) 123-4567",
    isBot: true,
  },
  {
    id: 9,
    title: "Final Confirmation",
    message: "Yes, those details are correct!",
    isBot: false,
  },
  {
    id: 10,
    title: "Booking Complete",
    message:
      "Perfect! Your appointment is confirmed. I've sent a confirmation email with:\n\n• Calendar invite (.ics file)\n• Meeting location/link\n• Preparation checklist\n• Cancellation policy\n\nYou'll receive a reminder 24 hours before your appointment. Is there anything else I can help you with?",
    isBot: true,
  },
];

export function AppointmentBookingDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const appointment: AppointmentDetails = {
    service: "Business Strategy Consultation",
    date: "Tuesday, December 10th, 2025",
    time: "2:00 PM - 3:00 PM",
    duration: "60 minutes",
    customer: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
    },
  };

  const handleNext = () => {
    if (currentStep < conversationFlow.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep === conversationFlow.length - 2) {
        setTimeout(() => setShowDetails(true), 1000);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowDetails(false);
  };

  const handleAutoPlay = () => {
    setIsPlaying(true);
    let step = currentStep;
    const interval = setInterval(() => {
      step++;
      if (step >= conversationFlow.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setShowDetails(true);
        return;
      }
      setCurrentStep(step);
      if (step === conversationFlow.length - 1) {
        setTimeout(() => setShowDetails(true), 1000);
      }
    }, 2000);
  };

  const visibleMessages = conversationFlow.slice(0, currentStep + 1);
  const progress = ((currentStep + 1) / conversationFlow.length) * 100;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Chat Interface */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Calendar className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle>AI Booking Assistant</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Automated scheduling and calendar management
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Step {currentStep + 1} of {conversationFlow.length}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-foreground rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="border border-border rounded-lg bg-muted/30 max-h-[400px] overflow-y-auto">
              <div className="p-4 space-y-4">
                <AnimatePresence>
                  {visibleMessages.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        "flex",
                        step.isBot ? "justify-start" : "justify-end"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] sm:max-w-[80%]",
                          step.isBot ? "" : "order-2"
                        )}
                      >
                        <div
                          className={cn(
                            "p-3 rounded-lg text-sm",
                            step.isBot
                              ? "bg-background border border-border text-foreground"
                              : "bg-muted border border-border text-foreground"
                          )}
                        >
                          <p className="whitespace-pre-line leading-relaxed">
                            {step.message}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-2">
                          {step.isBot ? "AI Assistant" : "Customer"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleAutoPlay}
                disabled={isPlaying || currentStep === conversationFlow.length - 1}
                className="flex-1 min-w-[120px]"
                size="sm"
              >
                <Sparkles className="size-4 mr-2" />
                Auto Play
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === conversationFlow.length - 1}
                variant="outline"
                size="sm"
              >
                Next Step
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details & System Actions */}
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence mode="wait">
            {showDetails ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                {/* Appointment Details Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <CheckCircle className="size-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle>Appointment Confirmed</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Booking #APT-2025-1847
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Service</p>
                        <p className="text-sm font-medium">{appointment.service}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                        <p className="text-sm font-medium">{appointment.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.time} ({appointment.duration})
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">Customer</p>
                          <p className="text-sm font-medium">{appointment.customer.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="size-4 shrink-0" />
                        <span className="break-all">{appointment.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="size-4 shrink-0" />
                        <span>{appointment.customer.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Automated Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        {
                          action: "Calendar Event Created",
                          status: "completed",
                          time: "0.2s",
                        },
                        {
                          action: "Confirmation Email Sent",
                          status: "completed",
                          time: "0.5s",
                        },
                        {
                          action: "SMS Reminder Scheduled",
                          status: "completed",
                          time: "0.7s",
                        },
                        {
                          action: "CRM Updated",
                          status: "completed",
                          time: "0.9s",
                        },
                        {
                          action: "Payment Link Generated",
                          status: "completed",
                          time: "1.1s",
                        },
                        {
                          action: "Team Calendar Synced",
                          status: "completed",
                          time: "1.3s",
                        },
                        {
                          action: "24hr Reminder Queued",
                          status: "pending",
                          time: "scheduled",
                        },
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: showDetails ? idx * 0.05 : 0 }}
                          className="flex items-center justify-between p-2 rounded-lg border border-border bg-muted/30"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div
                              className={cn(
                                "size-2 rounded-full shrink-0",
                                item.status === "completed"
                                  ? "bg-foreground"
                                  : "bg-muted-foreground/50"
                              )}
                            />
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {item.action}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {item.time}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Calendar className="size-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-sm font-medium mb-1">Appointment Details</p>
                      <p className="text-xs text-muted-foreground">
                        Complete the booking conversation to view appointment details
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Natural language understanding",
                  "Real-time availability checking",
                  "Automatic calendar integration",
                  "Multi-channel notifications",
                  "Smart rescheduling & cancellations",
                  "Payment processing integration",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-muted mt-0.5">
                      <CheckCircle className="size-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature}
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

