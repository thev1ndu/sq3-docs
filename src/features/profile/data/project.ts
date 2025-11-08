export interface ScopeModule {
  id: string;
  title: string;
  features: string[];
  description: string;
}

export interface ProjectData {
  introduction: {
    title: string;
    description: string;
    context: string;
  };
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  objectives: string[];
  scope: {
    modules: ScopeModule[];
  };
  expectedOutcomes: string[];
  exclusions: string[];
}

export const PROJECT_DATA: ProjectData = {
  introduction: {
    title: "SQ3 - Smart Business Solution for Sri Lankan SMEs",
    description:
      "SQ3 is a unified platform that brings all your customer messages from Facebook, Instagram, and your website into one place, and helps you respond to them faster and smarter. Think of it like having a smart assistant that collects all customer messages from different platforms in one inbox, answers common questions automatically, understands what customers really want, and helps you make better business decisions.",
    context:
      "SQ3 is specifically designed for Small and Medium Enterprises (SMEs) in Sri Lanka who use Facebook and Instagram for business, have a website with contact forms or chat, want to improve customer service, need to save time and reduce costs, and want to grow their business. Unlike expensive enterprise platforms, SQ3 is affordable, simple to use, built specifically for social media, designed for the Sri Lankan market, and requires no technical skills.",
  },
  problem: {
    title: "The Challenge: Why Do We Need SQ3?",
    description:
      "Running a business where customers message you on Facebook Messenger, Instagram Direct Messages, your website contact form, and your website live chat creates many challenges. You have to constantly switch between these different platforms to respond to customers, leading to missed messages, slow response times, and inefficient operations.",
    painPoints: [
      "Too many places to check - constantly switching between Facebook, Instagram, and website platforms, leading to missed important messages and lost sales opportunities",
      "Slow response times - customers send messages but you don't see them immediately, causing customers to get frustrated and leave",
      "Answering the same questions again and again - staff spends hours answering repetitive questions like opening hours, delivery areas, prices, and how to place orders",
      "Not understanding what customers really want - you can't tell if they want to buy, complain, or just browse, missing sales opportunities and unhappy customers",
      "No way to understand customer feelings - you don't know if customers are satisfied or frustrated until they leave a bad review, leading to lost customers and damaged reputation",
      "No smart marketing tools - you want to send marketing messages but don't know who to target, sending the same message to everyone with low return on investment",
      "No insights into your business - you don't know how many messages you receive, how fast you respond, what customers ask about most, or see trends and patterns",
    ],
  },
  solution: {
    title: "The Solution: How SQ3 Solves These Problems",
    description:
      "SQ3 solves all these problems by providing one inbox for all messages, automatic answers to common questions, smart understanding of what customers want, feeling detection to know if customers are happy or unhappy, smart marketing to send the right message to the right customers, and business insights to see how your business is performing.",
    keyPoints: [
      "One Inbox for All Messages - See all messages from Facebook, Instagram, and your website in one place, organized by time with clear labels showing where each message came from",
      "Automatic Responses - Automatically respond to common questions 24/7, working in both Sinhala and English, saving 70% of time spent on repetitive questions",
      "Smart Understanding - Understand what customers really want by categorizing messages (Sales, Support, Complaint, Question, etc.) and prioritizing urgent messages",
      "Feeling Detection - Know if customers are happy or unhappy through real-time sentiment analysis, with alerts when customers are frustrated to enable proactive service",
      "Smart Marketing - Send the right message to the right customers through intelligent segmentation based on interests and behavior, with automatic email campaigns and performance tracking",
      "Business Insights - See how your business is performing with dashboards showing message volume, response times, customer sentiment trends, and marketing campaign success",
      "Designed for Sri Lankan SMEs - Built specifically for small and medium businesses with full Sinhala and English support, affordable pricing, and no technical skills required",
      "Social Media First - Built specifically for Facebook and Instagram with native social media integration, optimized for social messaging, and website integration included",
      "Simple and Affordable - Easy to use with quick setup (minutes, not weeks), affordable pricing for SMEs, and pay only for what you need",
    ],
  },
  objectives: [
    "Centralize all Facebook, Instagram, and website communications into a single unified inbox",
    "Automate repetitive inquiries using AI-powered knowledge base to save 70% of FAQ time",
    "Understand customer intent through intelligent classification to never miss sales opportunities",
    "Analyze customer sentiment in real-time to prioritize responses and identify at-risk customers",
    "Enable smart marketing through intelligent customer segmentation and targeted campaigns",
    "Provide comprehensive analytics and insights for data-driven business decision making",
    "Support Sri Lankan SMEs with local market focus, Sinhala language support, and affordable pricing",
  ],
  scope: {
    modules: [
      {
        id: "social-integration",
        title: "Unified Inbox",
        description:
          "Brings all messages from Facebook, Instagram, and website into one place. Shows messages in chronological order with labels for each source. Works in real-time with messages appearing instantly. No more switching between platforms, never miss a message, respond faster to customers, and better organization.",
        features: [
          "All messages from Facebook, Instagram, and website in one inbox",
          "Messages organized by time (newest first) with clear source labels",
          "Real-time synchronization (messages appear instantly)",
          "No more switching between platforms",
          "Never miss a message with unified view",
        ],
      },
      {
        id: "knowledge-base",
        title: "Automatic Responses (Knowledge Base)",
        description:
          "Answers common questions automatically, works 24/7 even when you're not available, supports both Sinhala and English, and learns from your business information. Saves time on repetitive questions, provides instant customer service, reduces staff workload, and improves customer satisfaction.",
        features: [
          "Automatic responses to common questions 24/7",
          "Works in both Sinhala and English",
          "Learns from your business information",
          "Saves 70% of time spent on repetitive questions",
          "Instant customer service without extra staff",
        ],
      },
      {
        id: "intent-classification",
        title: "Intent Understanding",
        description:
          "Understands what customers really want by categorizing messages (Sales, Support, Complaint, Question, etc.), prioritizing urgent messages, and helping route messages to the right person. Never miss a sales opportunity, address complaints quickly, provide better customer service, and enable more efficient operations.",
        features: [
          "Understands what customers really want from their messages",
          "Categorizes messages (Sales, Support, Complaint, Question, etc.)",
          "Prioritizes urgent messages automatically",
          "Routes messages to the right person",
          "Never miss a sales opportunity",
        ],
      },
      {
        id: "sentiment-analyzer",
        title: "Sentiment Analysis",
        description:
          "Detects if customers are happy or unhappy, alerts you when customers are frustrated, tracks customer satisfaction over time, and helps prevent customer churn. Fix problems before customers leave, improve customer satisfaction, reduce negative reviews, and increase customer retention.",
        features: [
          "Detects if customers are happy, neutral, or unhappy",
          "Alerts you immediately when customers are frustrated",
          "Tracks customer sentiment trends over time",
          "Prevents customers from leaving through proactive service",
          "Reduces negative reviews and improves retention",
        ],
      },
      {
        id: "email-marketing",
        title: "Marketing & Customer Segmentation",
        description:
          "Groups customers based on interests and behavior, enables targeted marketing campaigns, tracks campaign performance, and measures marketing effectiveness. Better marketing results, higher sales conversion, lower marketing costs, and more effective campaigns.",
        features: [
          "Groups customers based on interests and behavior",
          "Enables targeted marketing campaigns for specific groups",
          "Automatic email sending to the right people",
          "Tracks results: who opened, who clicked, who bought",
          "Better marketing ROI through data-driven campaigns",
        ],
      },
      {
        id: "analytics",
        title: "Analytics Dashboard",
        description:
          "Shows business performance metrics, tracks message volume and response times, displays customer sentiment trends, and measures marketing campaign success. Make informed decisions, identify areas for improvement, measure success, and understand your business better.",
        features: [
          "Shows business performance metrics in easy-to-understand dashboards",
          "Tracks message volume and response times",
          "Displays customer sentiment trends over time",
          "Measures marketing campaign success",
          "Helps make data-driven decisions",
        ],
      },
    ],
  },
  expectedOutcomes: [
    "70% reduction in time spent on repetitive questions through automatic responses",
    "60% faster response times through unified inbox and automation",
    "One inbox for all customer communications from Facebook, Instagram, and website",
    "24/7 automatic customer service without extra staff",
    "Faster responses to customer inquiries improving customer satisfaction",
    "Better service quality through automation and smart understanding",
    "Proactive problem-solving through sentiment analysis preventing customer churn",
    "Improved customer retention through better service and faster responses",
    "Increased sales through better customer engagement and never missing opportunities",
    "Better marketing ROI through targeted campaigns and customer segmentation",
    "Cost savings through automation reducing labor costs",
    "Scalable operations without proportional cost increases",
  ],
  exclusions: [
    "Predictive analytics",
    "Cross-border commerce",
    "Advanced automation builders",
    "Adaptive personality systems",
  ],
};
