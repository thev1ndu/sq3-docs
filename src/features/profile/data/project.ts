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
      "SQ3 is a unified, AI-driven SaaS platform designed specifically for Sri Lankan Small and Medium Enterprises (SMEs) to revolutionize customer communication management. The platform consolidates customer interactions from Facebook, Instagram, and websites into a single intelligent inbox, eliminating the inefficiencies of managing multiple platforms. Through advanced AI capabilities including automated responses, intent classification, sentiment analysis, and intelligent marketing tools, SQ3 enables SMEs to provide exceptional customer service while driving business growth.",
    context:
      "SQ3 addresses the critical need for integrated communication tools tailored specifically for the Sri Lankan SME market, where social media platforms and websites dominate customer interactions. The platform combines cutting-edge AI technology with practical, user-friendly solutions to help SMEs compete effectively in the digital marketplace.",
  },
  problem: {
    title: "The Challenge",
    description:
      "Sri Lankan SMEs face significant challenges in managing customer communications across Facebook, Instagram, and website contact forms. Message fragmentation leads to missed inquiries, delayed responses, and poor engagement. Manual handling of FAQs consumes valuable staff time, while lack of intent recognition prevents intelligent automation. The absence of structured marketing tools and sentiment analysis capabilities further reduces operational efficiency and customer retention, making it difficult for SMEs to compete effectively in today's digital marketplace.",
    painPoints: [
      "Message fragmentation across multiple platforms requiring constant platform switching",
      "Missed customer inquiries and delayed responses due to inefficient workflows",
      "Manual handling of repetitive questions consuming staff time and resources",
      "Lack of customer intent recognition preventing intelligent message prioritization",
      "No structured marketing tools for customer segmentation and targeted campaigns",
      "Poor operational efficiency due to manual processes and limited automation",
      "Reduced customer retention from inconsistent service quality and delayed responses",
    ],
  },
  solution: {
    title: "The Solution",
    description:
      "SQ3 provides a comprehensive, AI-powered platform that consolidates Facebook, Instagram, and website communications into a single intelligent inbox. By integrating knowledge-driven automation, intelligent intent classification, real-time sentiment analysis, and data-driven marketing tools, SQ3 eliminates platform fragmentation and manual processes. The platform enables SMEs to respond faster through automation, engage better through personalized interactions, and grow their customer base efficiently through data-driven insights and targeted marketing campaigns.",
    keyPoints: [
      "Unified inbox consolidating all Facebook, Instagram, and website messages in one intelligent dashboard",
      "Website embedding widget enabling seamless integration with existing websites and contact forms",
      "AI-powered chatbot with comprehensive knowledge base providing instant automated responses to common inquiries",
      "Intelligent intent classification using NLP to understand, categorize, and prioritize customer messages",
      "Real-time sentiment analysis detecting customer emotions to enable proactive service and identify at-risk customers",
      "Data-driven email marketing with intelligent customer segmentation for targeted and effective campaigns",
      "Real-time synchronization across all channels ensuring seamless message management and no missed communications",
      "Multilingual support for Sinhala and English enabling effective communication with diverse customer base",
      "Comprehensive analytics dashboard providing insights into customer behavior, sentiment trends, and campaign performance",
    ],
  },
  objectives: [
    "Centralize all Facebook, Instagram, and website communications into a single unified inbox",
    "Provide seamless website embedding widget for easy integration with existing websites",
    "Automate repetitive inquiries using an AI-powered knowledge-driven chatbot",
    "Identify customer intent through intelligent classification to enable contextual automation",
    "Analyze customer sentiment in real-time to prioritize responses and identify at-risk customers",
    "Empower SMEs with data-driven email marketing through intelligent customer segmentation",
    "Provide comprehensive analytics and insights for data-driven decision making",
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
    "Unified communication hub consolidating Facebook, Instagram, and website interactions in one place",
    "70% reduction in manual message handling through AI-powered knowledge base automation",
    "60% reduction in response time through unified inbox and automated responses",
    "Accurate classification of customer intents enabling faster response cycles and intelligent routing",
    "Real-time sentiment analysis enabling proactive customer service and at-risk customer identification",
    "Improved marketing efficiency via data-driven customer segmentation and targeted campaigns",
    "Seamless website integration through embeddable widget for enhanced customer engagement",
    "Comprehensive analytics and insights for data-driven business decision making",
  ],
  exclusions: [
    "Predictive analytics",
    "Cross-border commerce",
    "Advanced automation builders",
    "Adaptive personality systems",
  ],
};

