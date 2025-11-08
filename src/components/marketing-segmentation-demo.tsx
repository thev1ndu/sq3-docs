"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronRight, ChevronDown, Target, Mail, CheckCircle, MessageSquare, User, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeNode {
  id: string;
  label: string;
  count: number;
  children?: TreeNode[];
  level: number;
}

const segmentationTree: TreeNode = {
  id: "all",
  label: "All Customers",
  count: 12450,
  level: 0,
  children: [
    {
      id: "men",
      label: "Male Customers",
      count: 5620,
      level: 1,
      children: [
        {
          id: "men-shoes",
          label: "Running Shoes Buyers",
          count: 2340,
          level: 2,
        },
        {
          id: "men-apparel",
          label: "Athletic Apparel Buyers",
          count: 1890,
          level: 2,
        },
      ],
    },
    {
      id: "women",
      label: "Female Customers",
      count: 6830,
      level: 1,
      children: [
        {
          id: "women-shoes",
          label: "Running Shoes Buyers",
          count: 3120,
          level: 2,
          children: [
            {
              id: "women-shoes-premium",
              label: "Premium Buyers",
              count: 1340,
              level: 3,
            },
            {
              id: "women-shoes-day",
              label: "Daytime Shoppers",
              count: 1200,
              level: 3,
            },
          ],
        },
        {
          id: "women-equipment",
          label: "Fitness Equipment Buyers",
          count: 2450,
          level: 2,
        },
      ],
    },
  ],
};

interface ConversationMessage {
  id: number;
  sender: "customer" | "agent";
  content: string;
  timestamp: string;
  segmentAction?: {
    segmentId: string;
    segmentName: string;
  };
}

const conversationMessages: ConversationMessage[] = [
  {
    id: 1,
    sender: "customer",
    content: "Hi! I'm looking for some running shoes. What do you recommend?",
    timestamp: "2:15 PM",
  },
  {
    id: 2,
    sender: "agent",
    content: "Hello! I'd be happy to help. What type of running do you primarily do?",
    timestamp: "2:15 PM",
  },
  {
    id: 3,
    sender: "customer",
    content: "Mostly road running, and I usually go for early morning runs around 6-7 AM",
    timestamp: "2:16 PM",
  },
  {
    id: 4,
    sender: "agent",
    content: "Great! For road running, I'd recommend our lightweight cushioned models. Are you looking for something with extra support?",
    timestamp: "2:16 PM",
    segmentAction: {
      segmentId: "women-shoes-day",
      segmentName: "Daytime Shoppers",
    },
  },
  {
    id: 5,
    sender: "customer",
    content: "Something with good cushioning. I run about 5-6 times a week, so comfort is important",
    timestamp: "2:17 PM",
  },
  {
    id: 6,
    sender: "agent",
    content: "Perfect! Based on your running frequency, I'd suggest our Premium Cushion line. What's your budget range?",
    timestamp: "2:17 PM",
    segmentAction: {
      segmentId: "women-shoes",
      segmentName: "Running Shoes Buyers",
    },
  },
  {
    id: 7,
    sender: "customer",
    content: "I'm willing to invest in quality, probably up to $150-200",
    timestamp: "2:18 PM",
  },
  {
    id: 8,
    sender: "agent",
    content: "Excellent! We have some great options in that range. Let me show you our top picks.",
    timestamp: "2:18 PM",
    segmentAction: {
      segmentId: "women-shoes-premium",
      segmentName: "Premium Buyers",
    },
  },
];

function TreeNodeComponent({
  node,
  selectedNode,
  onSelect,
  expandedNodes,
  onToggle,
  highlightedNodes,
}: {
  node: TreeNode;
  selectedNode: string | null;
  onSelect: (nodeId: string) => void;
  expandedNodes: Set<string>;
  onToggle: (nodeId: string) => void;
  highlightedNodes: Set<string>;
}) {
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNode === node.id;
  const isHighlighted = highlightedNodes.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  const indentClass = node.level === 0 ? "" : node.level === 1 ? "ml-4" : node.level === 2 ? "ml-8" : "ml-12";

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 p-2 rounded cursor-pointer transition-colors",
          isSelected ? "bg-foreground/10" : isHighlighted ? "bg-muted/50" : "hover:bg-muted/30",
          indentClass
        )}
        onClick={() => onSelect(node.id)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="p-1 hover:bg-muted rounded"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-6" />}

        <Users className="w-4 h-4 text-muted-foreground" />

        <div className="flex-1">
          <p className="text-sm">{node.label}</p>
        </div>

        <Badge variant="outline" className="text-xs">
          {node.count.toLocaleString()}
        </Badge>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              selectedNode={selectedNode}
              onSelect={onSelect}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              highlightedNodes={highlightedNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const findNode = (node: TreeNode, id: string): TreeNode | null => {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
};

export function MarketingSegmentationDemo() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["all", "men", "women"]));
  const [campaignSent, setCampaignSent] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [conversationMessagesState, setConversationMessagesState] = useState<ConversationMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isConversationPlaying, setIsConversationPlaying] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const selectedNodeData = selectedNode ? findNode(segmentationTree, selectedNode) : null;

  const handleSendCampaign = () => {
    setCampaignSent(true);
    setTimeout(() => setCampaignSent(false), 3000);
  };

  const handleReset = () => {
    setSelectedNode(null);
    setExpandedNodes(new Set(["all", "men", "women"]));
    setCampaignSent(false);
    setHighlightedNodes(new Set());
  };

  const startConversation = () => {
    setShowConversation(true);
    setConversationMessagesState([]);
    setCurrentMessageIndex(0);
    setHighlightedNodes(new Set());
    setIsConversationPlaying(true);
  };

  useEffect(() => {
    if (isConversationPlaying && showConversation && currentMessageIndex < conversationMessages.length) {
      const timer = setTimeout(() => {
        const nextMessage = conversationMessages[currentMessageIndex];
        setConversationMessagesState((prev) => [...prev, nextMessage]);

        if (nextMessage.segmentAction) {
          setHighlightedNodes((prev) => {
            const newSet = new Set([...prev, nextMessage.segmentAction!.segmentId]);
            
            setTimeout(() => {
              const segmentParts = nextMessage.segmentAction!.segmentId.split("-");
              setExpandedNodes((prevExpanded) => {
                const newExpanded = new Set(prevExpanded);
                if (segmentParts.includes("women") && segmentParts.includes("shoes")) {
                  newExpanded.add("women");
                  newExpanded.add("women-shoes");
                }
                if (segmentParts.includes("premium") || segmentParts.includes("day")) {
                  newExpanded.add("women-shoes");
                }
                return newExpanded;
              });
            }, 500);

            return newSet;
          });
        }

        setCurrentMessageIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= conversationMessages.length) {
            setIsConversationPlaying(false);
          }
          return nextIndex;
        });
      }, currentMessageIndex === 0 ? 500 : 2000);

      return () => clearTimeout(timer);
    }
  }, [isConversationPlaying, showConversation, currentMessageIndex]);


  const resetConversation = () => {
    setShowConversation(false);
    setConversationMessagesState([]);
    setCurrentMessageIndex(0);
    setIsConversationPlaying(false);
    setHighlightedNodes(new Set());
  };

  return (
    <div className="space-y-6">
      {/* How It Works */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Customer Chat", desc: "Agent identifies interests during conversation" },
              { step: "2", title: "Background Segmentation", desc: "Customer added to segments automatically" },
              { step: "3", title: "Select Segment", desc: "Choose target audience for campaign" },
              { step: "4", title: "Launch Campaign", desc: "Send targeted email with bias check" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversation Demo */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Live Conversation Demo
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Watch how the agent identifies interests and segments customers in real-time
              </p>
            </div>
            {!showConversation ? (
              <Button onClick={startConversation}>Start Demo</Button>
            ) : (
              <Button onClick={resetConversation} variant="outline">
                Reset
              </Button>
            )}
          </div>

          {showConversation ? (
            <div className="border border-border rounded-lg p-4 max-h-[400px] overflow-y-auto space-y-4">
              <AnimatePresence>
                {conversationMessagesState.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-3", message.sender === "customer" ? "flex-row-reverse" : "flex-row")}
                  >
                    <div className={cn("p-2 rounded-full", message.sender === "customer" ? "bg-muted" : "bg-foreground/10")}>
                      {message.sender === "customer" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <MessageSquare className="w-4 h-4" />
                      )}
                    </div>
                    <div className={cn("flex flex-col gap-1", message.sender === "customer" ? "items-end" : "items-start")}>
                      <div className={cn("px-4 py-2 rounded-lg", message.sender === "customer" ? "bg-muted" : "bg-muted/50")}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      {message.segmentAction && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-2 bg-muted/30 border border-border rounded-lg p-2 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Eye className="w-3 h-3" />
                            <span>Customer added to segment: <strong>{message.segmentAction.segmentName}</strong></span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Ready to see segmentation in action?</p>
              <Button onClick={startConversation}>Start Conversation Demo</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tree View */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-1">
                <Target className="w-5 h-5" />
                Audience Segmentation Tree
              </h3>
              <p className="text-sm text-muted-foreground">Click to expand segments and select target audience</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
            <div className="space-y-1 max-h-[500px] overflow-y-auto border border-border rounded-lg p-2">
              <TreeNodeComponent
                node={segmentationTree}
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </CardContent>
        </Card>

        {/* Campaign Panel */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Campaign Configuration
            </h3>

            {selectedNodeData ? (
              <>
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-2">SELECTED SEGMENT</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedNodeData.label}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedNodeData.count.toLocaleString()} customers
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>

                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Bias Check Passed</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        No discriminatory patterns detected. Campaign complies with fairness policies.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSendCampaign}
                  className="w-full"
                  disabled={campaignSent}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {campaignSent ? "Campaign Sent!" : "Send Email Campaign"}
                </Button>

                {campaignSent && (
                  <div className="bg-muted/30 border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-foreground" />
                      <div>
                        <p className="text-sm font-medium">Campaign Launched</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Sending to {selectedNodeData.count.toLocaleString()} recipients
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Select a segment from the tree to configure campaign</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

