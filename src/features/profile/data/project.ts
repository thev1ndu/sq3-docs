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
  objectives: string[];
  scope: {
    modules: ScopeModule[];
  };
  expectedOutcomes: string[];
  exclusions: string[];
}

export const PROJECT_DATA: ProjectData = {
  introduction: {
    title: "SQ3 Chatbot SaaS Platform",
    description:
      "Sri Lankan SMEs rely heavily on Facebook and Instagram as their primary sales and communication channels. However, managing customer interactions across multiple inboxes and languages remains inefficient. SQ3 aims to provide a unified, AI-driven SaaS platform that simplifies customer engagement, automates responses, and enhances marketing outcomes within the Meta ecosystem.",
    context:
      "SQ3 addresses the critical need for integrated communication tools tailored specifically for the Sri Lankan SME market, where social media platforms dominate customer interactions.",
  },
  problem: {
    title: "The Challenge",
    description:
      "Businesses face message fragmentation across Facebook and Instagram, leading to missed inquiries, delayed responses, and poor engagement. Manual handling of FAQs, lack of intent recognition, and absence of structured marketing tools reduce operational efficiency and customer retention.",
    painPoints: [
      "Message fragmentation across multiple platforms",
      "Missed customer inquiries and delayed responses",
      "Manual handling of repetitive questions",
      "Lack of customer intent recognition",
      "No structured marketing tools",
      "Poor operational efficiency",
      "Reduced customer retention",
    ],
  },
  objectives: [
    "Centralize all Facebook and Instagram communications",
    "Automate repetitive inquiries using a knowledge-driven chatbot",
    "Identify customer intent to enable intelligent automation",
    "Empower SMEs with data-driven email marketing through segmentation",
  ],
  scope: {
    modules: [
      {
        id: "social-integration",
        title: "Facebook & Instagram Integration",
        description:
          "Consolidated inbox for Facebook and Instagram DMs and comments with real-time synchronization for message handling and tagging. Automated replies and workflow-based actions for social engagement.",
        features: [
          "Consolidated inbox for Facebook and Instagram DMs and comments",
          "Real-time synchronization for message handling and tagging",
          "Automated replies and workflow-based actions for social engagement",
        ],
      },
      {
        id: "knowledge-base",
        title: "Knowledge Base + FAQ",
        description:
          "Repository of frequently asked questions and dynamic responses. AI-powered query recognition and instant multilingual replies (Sinhala, Tamil, English). Continuous learning based on interaction logs to improve accuracy.",
        features: [
          "Repository of frequently asked questions and dynamic responses",
          "AI-powered query recognition and instant multilingual replies (Sinhala, Tamil, English)",
          "Continuous learning based on interaction logs to improve accuracy",
        ],
      },
      {
        id: "intent-classification",
        title: "Intent Classification",
        description:
          "Natural Language Processing to categorize messages by intent (e.g., inquiry, payment, feedback). Enables contextual automation and relevant responses. Forms the foundation for analytics and personalized communication.",
        features: [
          "Natural Language Processing to categorize messages by intent (e.g., inquiry, payment, feedback)",
          "Enables contextual automation and relevant responses",
          "Forms the foundation for analytics and personalized communication",
        ],
      },
      {
        id: "email-marketing",
        title: "Email Marketing & Customer Segmentation",
        description:
          "Segmentation based on message frequency, purchase patterns, and engagement behavior. Targeted email campaigns for promotions, re-engagement, and updates. Insight metrics on open rates, click-throughs, and conversions.",
        features: [
          "Segmentation based on message frequency, purchase patterns, and engagement behavior",
          "Targeted email campaigns for promotions, re-engagement, and updates",
          "Insight metrics on open rates, click-throughs, and conversions",
        ],
      },
    ],
  },
  expectedOutcomes: [
    "Unified communication hub for Facebook and Instagram interactions",
    "70% reduction in manual message handling through knowledge base automation",
    "Accurate classification of customer intents enabling faster response cycles",
    "Improved marketing efficiency via data-driven customer segmentation",
  ],
  exclusions: [
    "Predictive analytics",
    "Cross-border commerce",
    "Advanced automation builders",
    "Adaptive personality systems",
  ],
};

