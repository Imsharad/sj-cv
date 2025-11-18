import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export interface Project {
  title: string;
  techStack: readonly string[];
  description: string;
  link?: string;
  slug?: string;
  summary?: string;
  role?: string;
  timeframe?: string;
  highlightMetric?: {
    label: string;
    value: string;
  };
}

export const RESUME_DATA = {
  name: "Sharad Jain",
  initials: "SJ",
  location: "Bengaluru, India",
  locationLink: "https://www.google.com/maps/place/Bengaluru",
  about:
    "Data-driven solutions architect, AI/ML engineering expert.",
  summary:
    "Sharad Jain is an AI founder and seasoned data scientist with a track record of building intelligent systems at scale. As the founder of autoscreen.ai, he architects production-grade conversational AI, leveraging complex technologies like Retrieval-Augmented Generation (RAG) and multi-agent workflows to solve real-world problems. His entrepreneurial drive is backed by extensive experience at companies like Meta and Withjoy, where he led high-impact data science and engineering initiatives.",
  avatarUrl: "https://avatars.githubusercontent.com/u/19369042",
  personalWebsiteUrl: "https://sharadja.in",
  contact: {
    email: "sharadsfo@gmail.com",
    tel: "+91 7999024306",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/Imsharad",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sharadjain4",
        icon: LinkedInIcon,
      },
      {
        name: "Twitter",
        url: "https://x.com/seekingtroooth",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "University of California Davis, Graduate School of Management",
      degree: "MS in Business Analytics",
      start: "2017",
      end: "2018",
    },
    {
      school: "University Institute of Technology, Bhopal",
      degree: "BS in Mechanical Engineering",
      start: "2011",
      end: "2015",
    },
  ],
  work: [
    {
      company: "autoscreen.ai",
      link: "https://autoscreen.ai",
      badges: ["Bengaluru"],
      title: "Founder",
      start: "2023",
      end: "Present",
      description:
        "Architected and deployed a production-grade, agentic conversational AI for real-time voice, achieving <500ms latency by orchestrating LiveKit, Twilio, and Google's streaming Gemini API. Engineered advanced RAG system to ground text-to-SQL agent in complex database schemas. Designed structured communication backbone for multi-agent workflows with OpenAI function-calling. Developed automated multimodal content pipeline using visual AI (GPT-4.1-mini) for frame-by-frame video analysis, reducing manual content creation efforts by over 80%.",
    },
    {
      company: "withjoy.com",
      link: "https://withjoy.com",
      badges: ["San Francisco, CA"],
      title: "Growth Data Scientist",
      start: "2020",
      end: "2023",
      description:
        "Architected data-driven growth infrastructure for wedding platform serving 500K+ couples, implementing cohort-based retention models that increased 30-day user retention by 45%. Built experimentation framework with statistical rigor, running 15+ A/B tests quarterly that improved conversion funnel by 28% and reduced CAC by $120. Designed behavioral analytics system using Mixpanel and SQL to identify activation moments, resulting in 2.3x improvement in user onboarding completion rates. Implemented product-led growth loops connecting vendor engagement to organic referrals, driving 35% of new user acquisition through viral mechanisms. Spearheaded cross-platform marketing attribution, achieving 95% accuracy in conversion reporting and 20% YoY channel performance improvement.",
    },
    {
      company: "Meta (Facebook)",
      link: "https://meta.com",
      badges: ["Menlo Park, CA"],
      title: "Data Scientist",
      start: "2018",
      end: "2020",
      description:
        "Implemented MLOps practices for enterprise engineering team, including automated CI/CD pipelines, resulting in 40% faster model deployment and 30% reduction in production issues. Engineered scalable data pipelines using Apache Spark and Airflow, processing 10TB+ daily data, improving data freshness by 50% and model accuracy by 15%. Optimized user onboarding through A/B testing, reducing activation time from 7 days to 2 days and improving retention by 30%.",
    },
    {
      company: "Autodesk",
      link: "https://autodesk.com",
      badges: ["San Francisco, CA"],
      title: "Data Scientist",
      start: "2017",
      end: "2018",
      description:
        "Implemented machine learning models to predict transient infrastructure failures. Improved prediction accuracy by 15% through feature engineering and model optimization. Built AWS Quicksight dashboard for business insights and interfaced with Data Platform Team in predictive maintenance.",
    },
    {
      company: "Tata Consultancy Services",
      link: "https://www.tcs.com",
      badges: ["Pune, India"],
      title: "Data Analyst",
      start: "2015",
      end: "2017",
      description:
        "Designed and implemented complex ETL mappings using IBM Infosphere DataStage for large-scale data warehousing projects. Performed detailed impact analysis on existing ETL mappings in response to evolving business requirements. Mastered data extraction techniques across multiple data repositories, significantly reducing data retrieval times for analytical reporting.",
    },
  ],
  skills: [
    "Python",
    "SQL",
    "ETL",
    "AWS",
    "Airflow",
    "OpenAI",
    "LangChain",
    "LlamaIndex",
    "Salesforce",
    "MLOps",
    "A/B Testing",
    "Natural Language Processing",
    "Large Language Models",
    "Data Engineering",

  ],
  certificates: [
    {
      platform: "Udacity",
      url: "https://www.udacity.com/certificate/e/4c69e34a-b91b-11f0-838b-df8734b9782c",
      id: "4c69e34a-b91b-11f0-838b-df8734b9782c"
    },
    {
      platform: "Udacity",
      url: "https://www.udacity.com/certificate/e/2abe6ecc-b912-11f0-aafe-e7290981af08",
      id: "2abe6ecc-b912-11f0-aafe-e7290981af08"
    },
    {
      platform: "Udacity",
      url: "https://www.udacity.com/certificate/e/0dfc6e12-a5dd-11f0-870f-b7d5407b1654",
      id: "0dfc6e12-a5dd-11f0-870f-b7d5407b1654"
    },
    {
      platform: "Udacity",
      url: "https://www.udacity.com/certificate/e/5bb7ae40-787a-11f0-b628-c789fb089f38",
      id: "5bb7ae40-787a-11f0-b628-c789fb089f38"
    },
    {
      platform: "Udacity",
      url: "https://www.udacity.com/certificate/e/313cf4d4-56cb-11f0-b009-e3d4ea161056",
      id: "313cf4d4-56cb-11f0-b009-e3d4ea161056"
    },
    {
      platform: "Udacity",
      url: "https://www.udacity.com/certificate/e/1ffd8620-56cb-11f0-8fb1-af52c7611c99",
      id: "1ffd8620-56cb-11f0-8fb1-af52c7611c99"
    },
    {
      platform: "Udacity",
      url: "https://www.udacity.com/certificate/e/7a29344c-6cd7-11f0-a307-3ffe3037db20",
      id: "7a29344c-6cd7-11f0-a307-3ffe3037db20"
    }
  ],
  projects: [
    {
      title: "EcoHome Energy Advisor",
      slug: "ecohome-energy-advisor",
      description: "Built AI-powered smart home energy optimizer with RAG pipeline, delivering personalized EV charging and solar power recommendations for significant cost savings.",
      summary: "Built AI-powered smart home energy optimizer with RAG pipeline, delivering personalized EV charging and solar power recommendations for significant cost savings.",
      techStack: ["LangGraph", "LangChain", "RAG", "AI Tools", "Weather API"],
    },
    {
      title: "Automated Review System",
      slug: "automated-review-system",
      techStack: ["Claude", "Multi-Agent", "Orchestrator-Worker", "LLM"],
      description:
        "Architected automated review system using Orchestrator-Worker pattern with specialized Claude agents for scalable student evaluation and consistent assessment.",
      summary:
        "Architected automated review system using Orchestrator-Worker pattern with specialized Claude agents for scalable student evaluation and consistent assessment.",
    },
    {
      title: "AI Customer Service Agent",
      slug: "ai-customer-service-agent",
      techStack: ["Google ADK", "Cloud SQL", "Vertex AI", "MySQL"],
      description:
        "Developed AI customer service agent integrating Cloud SQL, Vertex AI Search, and Google Search for comprehensive pet store support with robust error handling.",
      summary:
        "Developed AI customer service agent integrating Cloud SQL, Vertex AI Search, and Google Search for comprehensive pet store support with robust error handling.",
    },
    {
      title: "UDA-Hub Support System",
      slug: "uda-hub-support-system",
      techStack: ["LangGraph", "Multi-Agent", "Customer Support", "AI"],
      description:
        "Engineered production-ready multi-agent support system achieving 85.7% compliance, featuring intelligent routing and three-tier memory architecture for CultPass.",
      summary:
        "Engineered production-ready multi-agent support system achieving 85.7% compliance, featuring intelligent routing and three-tier memory architecture for CultPass.",
    },
    {
      title: "Financial Analysis Agent",
      slug: "financial-analysis-agent",
      techStack: ["SQL", "Yahoo Finance", "LLM", "Document Analysis", "PII Protection"],
      description:
        "Created financial agent coordinating 6 specialized tools for 10-K analysis, SQL queries, and real-time market data integration with automatic PII masking.",
      summary:
        "Created financial agent coordinating 6 specialized tools for 10-K analysis, SQL queries, and real-time market data integration with automatic PII masking.",
    },
    {
      title: "Travel Agent Review System",
      slug: "travel-agent-review-system",
      techStack: ["Multi-Agent", "ReAct", "Orchestrator-Worker", "Travel AI"],
      description:
        "Built automated review system with domain-specific agents for travel itinerary creation, weather compatibility analysis, and ReAct-based revision.",
      summary:
        "Built automated review system with domain-specific agents for travel itinerary creation, weather compatibility analysis, and ReAct-based revision.",
    },
    {
      title: "SWIFT Transaction Processor",
      slug: "swift-transaction-processor",
      techStack: ["AI Agents", "Fraud Detection", "SWIFT", "Parallelization"],
      description:
        "Developed SWIFT transaction system with parallel fraud detection and Evaluator-Optimizer pattern achieving robust message validation and efficient processing.",
      summary:
        "Developed SWIFT transaction system with parallel fraud detection and Evaluator-Optimizer pattern achieving robust message validation and efficient processing.",
    },
    {
      title: "Production AI Model Compression Pipeline",
      slug: "production-ai-model-compression-pipeline",
      techStack: ["Knowledge Distillation", "Pruning", "Quantization", "TorchScript", "Mobile AI"],
      description:
        "Achieved 89.4% model compression (5.83MB to 0.62MB) and 70% speed improvement through multi-stage pipeline, enabling real-time mobile AI deployment.",
      summary:
        "Achieved 89.4% model compression (5.83MB to 0.62MB) and 70% speed improvement through multi-stage pipeline, enabling real-time mobile AI deployment.",
    },
  ] as const satisfies readonly Project[],
} as const;
