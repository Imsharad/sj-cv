import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export interface Project {
  title: string;
  techStack: readonly string[];
  description: string;
  link?: string;  // Change this to an optional string
}

export const RESUME_DATA = {
  name: "Sharad Jain",
  initials: "SJ",
  location: "Bengaluru, India",
  locationLink: "https://www.google.com/maps/place/Bengaluru",
  about:
    "Data-driven solutions architect, AI/ML engineering expert.",
  summary:
    "Experienced AI leader and Data Scientist with expertise in developing and implementing agentic AI strategies. Skilled in building scalable data pipelines and leveraging advanced frameworks like chain of thought, graph of thoughts, and multi-agent collaboration. Proficient in designing and implementing agentic LLM applications using cutting-edge design patterns such as Reflection, Tool Use, Planning, and Multi-Agent Collaboration",
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
      school: "University of California Davis, SF Campus",
      degree: "MS in Business Analytics",
      start: "2017",
      end: "2019",
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
      company: "Autoscreen",
      link: "https://autoscreen.ai",
      badges: ["Bengaluru"],
      title: "Sr. AI Engineer",
      start: "2023",
      end: "Present",
      description:
        "Led AI strategy implementation, developed OpenAI assistant-based Salesforce digital worker, streamlined admin processes, and optimized Gen AI performance. Built a synthetic data generation pipeline for schema-aware databases using LLaMA 3.1 405B model using fireworksAI, and generated smaller state-of-the-art models for data augmentation. Implemented multi-agent collaboration for LLM applications using OpenAI ASsistant API. Developed an alternate approach to multi-agent collaboration using Llama-stack of APIs to  Technologies: OpenAI, LLaMA, Mistral, LangChain, LlamaIndex, FireworksAI",
    },

    {
      company: "withjoy.com",
      link: "https://withjoy.com",
      badges: ["San Francisco, CA"],
      title: "Sr. Data Engineer",
      start: "2021",
      end: "2023",
      description:
        "Led cross-platform marketing analytics and implemented multi-touchpoint attribution framework. Developed ETL pipelines to collect and unify user identities across mobile and desktop platforms, solving the challenge of single users accessing through multiple devices. Engineered complex SQL queries to stitch user identities and create a holistic view of user journeys. Built and maintained data pipelines using Airflow for automated data processing and analysis. Implemented advanced data quality checks to ensure accuracy in cross-device user tracking. Drove data-driven decision making by providing insights on user behavior across different touchpoints. Technologies: Python, Airflow, SQL, Looker, AWS, ETL, Identity Resolution",
    },
    {
      company: "Meta (Facebook)",
      link: "https://meta.com",
      badges: ["Menlo Park, CA"],
      title: "Data Scientist",
      start: "2018",
      end: "2021",
      description:
        "Implemented MLOps practices, engineered scalable data pipelines, optimized internal data engineer user onboarding, and led ML workflow migration to Kubernetes. Technologies: Apache Spark, Airflow, Kubernetes, A/B testing",
    },
    {
      company: "Autodesk",
      link: "https://autodesk.com",
      badges: ["San Francisco, CA"],
      title: "Data Scientist Intern",
      start: "2017",
      end: "2018",
      description:
        "Implemented machine learning models for infrastructure failure prediction and built business insights dashboards. Technologies: AWS QuickSight, Machine Learning",
    },
    {
      company: "Tata Consultancy Services",
      link: "https://www.tcs.com",
      badges: ["Pune, India"],
      title: "Data Analyst",
      start: "2015",
      end: "2017",
      description:
        "Designed ETL mappings, performed impact analysis, and managed data repositories. Technologies: IBM InfoSphere, ETL",
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
  projects: [
    {
      title: "EcoHome Energy Advisor",
      description: "Built AI-powered smart home energy optimizer with RAG pipeline, delivering personalized EV charging and solar power recommendations for significant cost savings.",
      techStack: ["LangGraph", "LangChain", "RAG", "AI Tools", "Weather API"],
    },
    {
      title: "Automated Review System",
      techStack: ["Claude", "Multi-Agent", "Orchestrator-Worker", "LLM"],
      description:
        "Architected automated review system using Orchestrator-Worker pattern with specialized Claude agents for scalable student evaluation and consistent assessment.",
    },
    {
      title: "AI Customer Service Agent",
      techStack: ["Google ADK", "Cloud SQL", "Vertex AI", "MySQL"],
      description:
        "Developed AI customer service agent integrating Cloud SQL, Vertex AI Search, and Google Search for comprehensive pet store support with robust error handling.",
    },
    {
      title: "UDA-Hub Support System",
      techStack: ["LangGraph", "Multi-Agent", "Customer Support", "AI"],
      description:
        "Engineered production-ready multi-agent support system achieving 85.7% compliance, featuring intelligent routing and three-tier memory architecture for CultPass.",
    },
    {
      title: "Financial Analysis Agent",
      techStack: ["SQL", "Yahoo Finance", "LLM", "Document Analysis", "PII Protection"],
      description:
        "Created financial agent coordinating 6 specialized tools for 10-K analysis, SQL queries, and real-time market data integration with automatic PII masking.",
    },
    {
      title: "Travel Agent Review System",
      techStack: ["Multi-Agent", "ReAct", "Orchestrator-Worker", "Travel AI"],
      description:
        "Built automated review system with domain-specific agents for travel itinerary creation, weather compatibility analysis, and ReAct-based revision.",
    },
    {
      title: "SWIFT Transaction Processor",
      techStack: ["AI Agents", "Fraud Detection", "SWIFT", "Parallelization"],
      description:
        "Developed SWIFT transaction system with parallel fraud detection and Evaluator-Optimizer pattern achieving robust message validation and efficient processing.",
    },
    {
      title: "UdaciSense Model Optimization",
      techStack: ["Knowledge Distillation", "Pruning", "Quantization", "TorchScript", "Mobile AI"],
      description:
        "Achieved 89.4% model compression (5.83MB to 0.62MB) and 70% speed improvement through multi-stage pipeline, enabling real-time mobile AI deployment.",
    },
  ] as const satisfies readonly Project[],
} as const;
