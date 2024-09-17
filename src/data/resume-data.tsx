import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Sharad Jain",
  initials: "SJ",
  location: "Bengaluru, India",
  locationLink: "https://www.google.com/maps/place/Bengaluru",
  about:
    "Head of AI with expertise in data science, machine learning, and software engineering.",
  summary:
    "As a Head of AI and experienced Data Scientist, I specialize in developing and implementing AI strategies, building scalable data pipelines, and leading teams to deliver high-impact AI solutions. With a strong background in machine learning, data engineering, and software development, I excel in solving complex problems and driving innovation across various domains.",
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
      company: "Clientell",
      link: "https://clientell.com",
      badges: ["Bengaluru"],
      title: "Head of AI",
      start: "2024",
      end: "Present",
      description:
        "Led AI strategy implementation, developed OpenAI assistant-based Salesforce digital worker, streamlined admin processes, and optimized Gen AI performance. Technologies: OpenAI, LLaMA, NLP, Salesforce",
    },
    {
      company: "autoscreen.ai",
      link: "https://autoscreen.ai",
      badges: ["Remote"],
      title: "Founder",
      start: "2023",
      end: "2024",
      description:
        "Engineered high-performance backend for video interviews, optimized video processing pipeline, developed microservices architecture, and pioneered advanced resume parsing. Technologies: Node.js, Express.js, AWS, GPT-4, BERT, XGBoost, ColPali, PaliGemma-3B",
    },
    {
      company: "withjoy.com",
      link: "https://withjoy.com",
      badges: ["San Francisco, CA"],
      title: "Sr. Data Engineer",
      start: "2020",
      end: "2023",
      description:
        "Led cross-platform marketing analytics, developed data pipelines, maintained data quality, and drove data-driven decision making. Technologies: Python, Airflow, SQL, Looker, AWS",
    },
    {
      company: "Meta (Facebook)",
      link: "https://meta.com",
      badges: ["Menlo Park, CA"],
      title: "Data Scientist",
      start: "2018",
      end: "2020",
      description:
        "Implemented MLOps practices, engineered scalable data pipelines, optimized user onboarding, and led ML workflow migration to Kubernetes. Technologies: Apache Spark, Airflow, Kubernetes, A/B testing",
    },
    {
      company: "Autodesk",
      link: "https://autodesk.com",
      badges: ["San Francisco, CA"],
      title: "Data Scientist",
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
    "Machine Learning",
    "Data Engineering",
    "AWS",
    "Node.js",
    "Express.js",
    "Apache Spark",
    "Airflow",
    "Kubernetes",
  ],
  projects: [
    {
      title: "Salesforce Digital Worker",
      techStack: ["OpenAI", "Salesforce", "NLP"],
      description:
        "Developed an AI assistant automating 80% of routine Salesforce operations, increasing team productivity by 30%.",
    },
    {
      title: "Video Interview Platform",
      techStack: ["Node.js", "Express.js", "AWS", "GPT-4", "BERT"],
      description:
        "Built a scalable platform processing 10,000+ concurrent video interviews monthly with 99.9% uptime.",
    },
    {
      title: "Advanced Resume Parser",
      techStack: ["ColPali", "PaliGemma-3B", "Computer Vision"],
      description:
        "Integrated cutting-edge document retrieval model for resume parsing, achieving 81.3 nDCG@5 score for complex resumes.",
    },
    {
      title: "Marketing Analytics Pipeline",
      techStack: ["Python", "Airflow", "SQL", "Looker"],
      description:
        "Spearheaded cross-platform marketing analytics process, improving channel performance by 20% YoY.",
    },
    {
      title: "MLOps Implementation",
      techStack: ["Kubernetes", "CI/CD", "Apache Spark"],
      description:
        "Led MLOps practices implementation, resulting in 40% faster model deployment and 30% reduction in production issues.",
    },
  ],
} as const;
