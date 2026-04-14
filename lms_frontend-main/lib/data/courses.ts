export interface Course {
  id: string
  title: string
  instructor: string
  price: number
  category: string
  level: string
  rating: number
  createdAt: string
  description: string
  durationHours: number
  outcomes: string[]
}

export const masterCourses: Course[] = [
  {
    id: "1",
    title: "Advanced Network Penetration Testing",
    instructor: "Sarah Jenkins",
    price: 89.99,
    category: "cybersecurity",
    level: "advanced",
    rating: 4.9,
    createdAt: "2024-01-15",
    description: "Master the execution of sophisticated attacks on modern networks using elite frameworks, zero-day threat analysis, and invisible payload deployment.",
    durationHours: 40,
    outcomes: ["Exploit active directory logic flaws", "Craft custom payloads for EDR evasion", "Deploy lateral movement strategies", "Write comprehensive security reports"]
  },
  {
    id: "2",
    title: "Zero Trust Architecture Fundamentals",
    instructor: "Michael Chen",
    price: 95.00,
    category: "cybersecurity",
    level: "intermediate",
    rating: 4.8,
    createdAt: "2024-02-10",
    description: "Learn how to architect and implement identity-first, micro-segmented security perimeters across complex multi-cloud ecosystems.",
    durationHours: 25,
    outcomes: ["Implement robust identity pooling", "Design micro-segmentation rules", "Analyze continuous authorization flows", "Secure legacy systems with proxy integration"]
  },
  {
    id: "3",
    title: "AWS Cloud Practitioner Mastery",
    instructor: "Elena Rodriguez",
    price: 75.00,
    category: "cloud",
    level: "beginner",
    rating: 4.7,
    createdAt: "2024-03-01",
    description: "The ultimate pathway to understanding AWS global infrastructure, core services, cloud economics, and basic security in the cloud.",
    durationHours: 15,
    outcomes: ["Deploy scalable EC2 clusters", "Understand S3 glacier tiering", "Configure VPC peering correctly", "Pass the official Cloud Practitioner exam"]
  },
  {
    id: "4",
    title: "AI-Powered Threat Hunting",
    instructor: "Dr. James Lee",
    price: 120.00,
    category: "aiml",
    level: "advanced",
    rating: 5.0,
    createdAt: "2024-03-15",
    description: "Leverage machine learning models to detect heuristic anomalies, behavioral drifts, and advanced persistent threats in real-time.",
    durationHours: 35,
    outcomes: ["Train unsupervised anomaly detection models", "Parse massive syslogs with NLP", "Automate incident response pipelines", "Hunt for fileless malware patterns"]
  },
  {
    id: "5",
    title: "Kubernetes Security & Governance",
    instructor: "Alice Walker",
    price: 85.00,
    category: "devops",
    level: "intermediate",
    rating: 4.6,
    createdAt: "2024-01-22",
    description: "A deep dive into locking down containerized applications using RBAC, Network Policies, and Pod Security Standards in K8s.",
    durationHours: 30,
    outcomes: ["Harden kube-apiserver endpoints", "Implement strict NetworkPolicies", "Audit RBAC permissions mapping", "Integrate Falco for runtime security"]
  },
  {
    id: "6",
    title: "DevSecOps CI/CD Pipelines",
    instructor: "Tom Wilson",
    price: 65.00,
    category: "devops",
    level: "advanced",
    rating: 4.8,
    createdAt: "2024-04-05",
    description: "Build unshakeable continuous integration pipelines that automatically scan for vulnerabilities, secrets, and compliance drift before every deployment.",
    durationHours: 20,
    outcomes: ["Configure GitHub Actions security gates", "Implement SAST & DAST tools", "Manage HashiCorp Vault secrets", "Automate Docker image signing"]
  },
  {
    id: "7",
    title: "Incident Response Playbook",
    instructor: "Robert Fox",
    price: 105.00,
    category: "cybersecurity",
    level: "intermediate",
    rating: 4.9,
    createdAt: "2024-05-11",
    description: "Learn how to actively triage, contain, and eradicate live threats using industry-grade digital forensics tools and psychological containment.",
    durationHours: 28,
    outcomes: ["Perform volatile memory forensics", "Isolate compromised virtual networks", "Communicate with executive stakeholders", "Create post-mortem remediation plans"]
  },
  {
    id: "8",
    title: "Cryptography & Data Privacy",
    instructor: "Sophia Martinez",
    price: 90.00,
    category: "cybersecurity",
    level: "beginner",
    rating: 4.7,
    createdAt: "2024-02-28",
    description: "A comprehensive introduction to modern encryption algorithms, public key infrastructure, and data-at-rest protection standards.",
    durationHours: 18,
    outcomes: ["Differentiate symmetric vs asymmetric crypto", "Implement AES-256 in Python", "Manage Certificate Authorities (CAs)", "Understand GDPR compliance mappings"]
  },
  {
    id: "9",
    title: "Enterprise BGP Routing",
    instructor: "David Miller",
    price: 110.00,
    category: "networking",
    level: "advanced",
    rating: 4.8,
    createdAt: "2024-06-01",
    description: "Master the protocol that runs the internet. Learn advanced BGP attributes, route filtering, and multi-homed ISP connectivity.",
    durationHours: 45,
    outcomes: ["Configure eBGP and iBGP adjacencies", "Manipulate path selection using LocalPref", "Mitigate BGP route hijacking", "Design highly-available WAN gateways"]
  },
  {
    id: "10",
    title: "Data Science for Security Logs",
    instructor: "Dr. Rachel Adams",
    price: 135.00,
    category: "data-science",
    level: "intermediate",
    rating: 4.9,
    createdAt: "2024-06-15",
    description: "Apply data science methodologies using Python, Pandas, and Jupyter Notebooks to hunt for complex multi-vector cyber attacks.",
    durationHours: 32,
    outcomes: ["Clean and normalize gigabytes of JSON logs", "Build statistical baselines for network IO", "Visualize threat clusters using Matplotlib", "Deploy automated alerting scripts"]
  },
  {
    id: "11",
    title: "Cisco CCNA Fast-Track",
    instructor: "Brian O'Connor",
    price: 99.00,
    category: "networking",
    level: "beginner",
    rating: 4.7,
    createdAt: "2024-07-20",
    description: "Get certified quickly. Learn everything from subnetting and VLANs to essential OSPF operations in this comprehensive bootcamp.",
    durationHours: 50,
    outcomes: ["Calculate IPv4 and IPv6 subnets instantly", "Configure Cisco Catalyst Switches", "Troubleshoot common spanning-tree loops", "Implement basic Access Control Lists (ACLs)"]
  },
  {
    id: "12",
    title: "Predictive Analytics Engineering",
    instructor: "Kevin Zhang",
    price: 125.00,
    category: "data-science",
    level: "advanced",
    rating: 4.8,
    createdAt: "2024-08-10",
    description: "Design massive data pipelines capable of forecasting trends, detecting anomalies, and feeding real-time BI dashboards.",
    durationHours: 40,
    outcomes: ["Architect Apache Kafka streams", "Build predictive models with XGBoost", "Optimize massive SQL queries", "Scale processing nodes dynamically"]
  }
]
