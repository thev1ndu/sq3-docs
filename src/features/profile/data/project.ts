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
    title: "SQ3 Chatbot SaaS Platform",
    description:
      "Sri Lankan SMEs rely heavily on Facebook, Instagram, and their websites as their primary sales and communication channels. However, managing customer interactions across multiple inboxes and languages remains inefficient. SQ3 aims to provide a unified, AI-driven SaaS platform that simplifies customer engagement, automates responses, and enhances marketing outcomes across all communication channels.",
    context:
      "SQ3 addresses the critical need for integrated communication tools tailored specifically for the Sri Lankan SME market, where social media platforms and websites dominate customer interactions.",
  },
  problem: {
    title: "The Challenge",
    description:
      "Businesses face message fragmentation across Facebook, Instagram, and website contact forms, leading to missed inquiries, delayed responses, and poor engagement. Manual handling of FAQs, lack of intent recognition, and absence of structured marketing tools reduce operational efficiency and customer retention.",
    painPoints: [
      "Message fragmentation across multiple platforms (Facebook, Instagram, Website)",
      "Missed customer inquiries and delayed responses",
      "Manual handling of repetitive questions",
      "Lack of customer intent recognition",
      "No structured marketing tools",
      "Poor operational efficiency",
      "Reduced customer retention",
    ],
  },
  solution: {
    title: "The Solution",
    description:
      "SQ3 provides a unified, AI-powered platform that consolidates Facebook, Instagram, and website communications into a single intelligent inbox. By integrating knowledge-driven automation, intent classification, and data-driven marketing tools, SQ3 eliminates platform fragmentation and manual processes, enabling SMEs to respond faster, engage better, and grow their customer base efficiently.",
    keyPoints: [
      "Unified inbox that consolidates all Facebook, Instagram, and website messages in one place",
      "Website embedding widget for seamless integration with existing websites",
      "AI-powered chatbot with knowledge base for automated responses to common inquiries",
      "Intelligent intent classification to understand and prioritize customer messages",
      "Data-driven email marketing with customer segmentation for targeted campaigns",
      "Real-time synchronization across all channels for seamless message management",
      "Multilingual support for Sinhala and English to serve diverse customer base",
    ],
  },
  objectives: [
    "Centralize all Facebook, Instagram, and website communications",
    "Provide seamless website embedding for customer engagement",
    "Automate repetitive inquiries using a knowledge-driven chatbot",
    "Identify customer intent to enable intelligent automation",
    "Empower SMEs with data-driven email marketing through segmentation",
  ],
  scope: {
    modules: [
      {
        id: "social-integration",
        title: "Facebook, Instagram & Website Integration",
        description:
          "Consolidated inbox for Facebook, Instagram, and website communications with real-time synchronization for message handling and tagging. Website embedding widget for seamless integration. Automated replies and workflow-based actions for multi-channel engagement.",
        features: [
          "Consolidated inbox for Facebook, Instagram, and website messages",
          "Website embedding widget for easy integration with existing websites",
          "Contact form and live chat integration from websites",
          "Real-time synchronization for message handling and tagging",
          "Automated replies and workflow-based actions for multi-channel engagement",
        ],
      },
      {
        id: "knowledge-base",
        title: "Knowledge Base + FAQ",
        description:
          "Repository of frequently asked questions and dynamic responses. AI-powered query recognition and instant multilingual replies (Sinhala, English). Continuous learning based on interaction logs to improve accuracy.",
        features: [
          "Repository of frequently asked questions and dynamic responses",
          "AI-powered query recognition and instant multilingual replies (Sinhala, English)",
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
      {
        id: "sentiment-analyzer",
        title: "Customer Sentiment Analyzer",
        description:
          "Real-time sentiment analysis of customer messages using Natural Language Processing. Automatically detects positive, negative, and neutral sentiments to prioritize responses, identify at-risk customers, and measure overall customer satisfaction.",
        features: [
          "Real-time sentiment analysis of customer messages across all channels",
          "Automatic detection of positive, negative, and neutral sentiments with confidence scores",
          "Sentiment trends and analytics for tracking customer satisfaction over time",
          "Priority alerts for negative sentiments to enable proactive customer service",
          "Multilingual sentiment analysis supporting Sinhala and English",
        ],
      },
    ],
  },
  expectedOutcomes: [
    "Unified communication hub for Facebook, Instagram, and website interactions",
    "70% reduction in manual message handling through knowledge base automation",
    "Accurate classification of customer intents enabling faster response cycles",
    "Improved marketing efficiency via data-driven customer segmentation",
    "Seamless website integration through embedding widget",
  ],
  exclusions: [
    "Predictive analytics",
    "Cross-border commerce",
    "Advanced automation builders",
    "Adaptive personality systems",
  ],
};

