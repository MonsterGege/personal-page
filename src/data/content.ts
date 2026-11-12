export interface Skill {
  title: string;
  icon: "code" | "cloud" | "database" | "wrench" | "shield" | "flask";
  items: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  version: string;
  points: string[];
}

export interface Contact {
  icon: "mail" | "phone" | "pin" | "globe" | "github";
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  copy?: boolean;
}

export interface Stat {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
  accent: string;
}

export interface LogLine {
  level: "OK" | "INFO" | "WARN";
  msg: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const stats: Stat[] = [
  { target: 20000, prefix: "", suffix: "+", label: "stores migrated to cloud", accent: "#e8a838" },
  { target: 50, prefix: "−", suffix: "%", label: "downtime after migration", accent: "#58b894" },
  { target: 50, prefix: "+", suffix: "%", label: "transaction throughput", accent: "#e06a45" },
  { target: 10, prefix: "", suffix: "⁹+", label: "rows moved through pipelines", accent: "#4f8ff7" },
];

export const uptimeEpoch = "2022-07-01T00:00:00+07:00";

export const logLines: LogLine[] = [
  { level: "OK", msg: "deploy stores-batch-0412 → cloud-run … success" },
  { level: "INFO", msg: "etl parquet-shift-7781 processed 2.4M rows" },
  { level: "OK", msg: "migration java-cluster-7 consistency 99.98%" },
  { level: "INFO", msg: "pub/sub backlog drained: 0 pending" },
  { level: "WARN", msg: "node jkt-edge-03 latency 212ms — rerouted" },
  { level: "OK", msg: "healthcheck 15,000 stores … all green" },
  { level: "INFO", msg: "slo error-budget remaining: 87.3%" },
  { level: "OK", msg: "jenkins zero-downtime release v2.41 shipped" },
  { level: "INFO", msg: "master-transfer start-of-day sync complete" },
  { level: "OK", msg: "secret rotation completed · 0 failures" },
  { level: "WARN", msg: "capacity: cloud-sql cpu 71% — scaling replica" },
  { level: "INFO", msg: "end-of-day collection: 14,982/15,000 stores reported" },
];

export const storeNodes: [number, number][] = [
  [252, 298], [268, 300], [284, 296], [300, 300], [316, 302], [332, 298],
  [348, 302], [364, 304], [380, 306], [396, 306], [412, 308], [428, 310],
  [96, 112], [118, 134], [140, 158], [160, 182], [178, 206], [196, 230],
  [212, 252], [224, 266],
  [330, 120], [360, 110], [382, 140], [368, 176], [340, 185],
  [482, 116], [496, 150], [490, 190], [508, 222],
  [456, 320], [492, 324], [530, 328],
  [572, 190], [582, 232],
  [676, 170], [712, 180], [740, 200],
];

export const networkArcs: string[] = [
  "M262 298 Q160 200 100 116",
  "M262 298 Q220 270 198 232",
  "M262 298 Q300 220 366 178",
  "M262 298 Q380 260 492 196",
  "M262 298 Q360 330 456 320",
  "M262 298 Q520 340 738 196",
];

export const about: string[] = [
  "I'm a backend engineer who actually enjoys the unglamorous parts of software — watching a rollout until the graphs go quiet, debugging a race condition that only happens in production, and making sure a million transactions don't turn into a disaster.",
  "Based in Jakarta, Indonesia. Four years deep into the stack at one of Southeast Asia's biggest retailers. I've gone from fingerprint auth libraries to architecting cloud migration for thousands of stores, and I'm not done yet.",
  "When I'm not staring at logs, I'm probably reading, tinkering with hardware, or trying to perfect my instant ramen technique.",
];

export const skills: Skill[] = [
  {
    title: "Languages & Frameworks",
    icon: "code",
    items: ["Golang (Echo)", "Python (FastAPI, Flask)", "TypeScript (Next.js)", "RESTful APIs & HTTP"],
  },
  {
    title: "Cloud & Infra",
    icon: "cloud",
    items: [
      "Google Cloud Platform",
      "Cloud Run, Cloud SQL, Pub/Sub",
      "Compute Engine, Load Balancing",
      "Kubernetes (GKE)",
      "Secret Manager, Docker, Linux",
    ],
  },
  {
    title: "Databases & Data",
    icon: "database",
    items: ["PostgreSQL", "Redis", "Firebase", "Parquet Data Processing", "Pub/Sub Messaging"],
  },
  {
    title: "DevOps & CI/CD",
    icon: "wrench",
    items: [
      "Jenkins Pipelines",
      "Docker Containers",
      "Automated Deployments",
      "Zero-downtime Releases",
    ],
  },
  {
    title: "SRE & Reliability",
    icon: "shield",
    items: [
      "Incident Management & On-Call",
      "SLI/SLO Monitoring",
      "Capacity Planning",
      "Observability: Logging, Metrics, Tracing",
    ],
  },
  {
    title: "Other",
    icon: "flask",
    items: [
      "OOP & Design Patterns",
      "DSA (Data Structures & Algorithms)",
      "System Design & Architecture",
      "Agile, Cross-functional Collaboration",
    ],
  },
];

export const experiences: Experience[] = [
  {
    title: "Backend Engineer, Cloud Developer & SRE",
    company: "PT. Sumber Alfaria Trijaya",
    period: "Jul 2022 — Present",
    version: "v2022.07 — NOW",
    points: [
      "Spearheaded cloud migration of 70%+ Alfamart stores (≈15,000+ stores) from legacy to cloud-native infrastructure — cutting downtime by 30% and boosting transaction throughput by 25%.",
      "Architected high-performance Golang microservices for Parquet-based data pipelines, managing large-scale database operations and ETL workflows.",
      "Created a private Golang standard-code module adopted across teams — standardizing shared patterns and utilities, and speeding up new service development.",
      "Built a master transfer system to migrate data from warehouse to stores at start-of-day and collect transaction/inventory data from stores back to warehouse at end-of-day, ensuring data consistency across ≈15,000+ stores.",
      "Deployed containerized services to Cloud Run, Compute Engine, and GKE with Load Balancing, integrated with Cloud SQL, Pub/Sub, and Secret Manager.",
      "Engineered automated CI/CD pipelines with Jenkins for zero-downtime deployments across multiple environments.",
      "Maintained site reliability — defined SLIs/SLOs, managed incident response, conducted post-mortems, and implemented observability stack (logging, metrics, tracing).",
      "Collaborated with frontend teams on design system development, improving cross-functional delivery speed.",
    ],
  },
  {
    title: "Fullstack Developer Intern (IT Business Solution)",
    company: "PT. Sumber Alfaria Trijaya",
    period: "Sep 2021 — Jul 2022",
    version: "v2021.09 — v2022.07",
    points: [
      "Developed a Python fingerprint authentication library (NitgenBSP) enabling biometric verification across multi-platform POS systems.",
      "Built an automated cloud file sync client with intelligent retry/back-off and checksum verification — ensuring data integrity at scale.",
      "Optimized transaction history reporting system, reducing query latency by 20% through query profiling and index tuning.",
      "Contributed to a Store Information System for master stock management, improving inventory accuracy and operational reliability.",
    ],
  },
];

export const education = {
  university: "Universitas Kristen Satya Wacana",
  degree: "Bachelor of Information Engineering",
  graduated: "Graduated 2022",
  gpa: "3.96",
  gpaMax: "4.00",
};

export const contacts: Contact[] = [
  {
    icon: "mail",
    label: "Email",
    value: "georgeonsent10@gmail.com",
    href: "mailto:georgeonsent10@gmail.com",
    copy: true,
  },
  {
    icon: "phone",
    label: "Phone",
    value: "+628170250994",
    href: "tel:+628170250994",
  },
  {
    icon: "pin",
    label: "Location",
    value: "Tanjung Priok, Jakarta Utara",
  },
  {
    icon: "globe",
    label: "Website",
    value: "schum.web.id",
    href: "https://schum.web.id",
    external: true,
  },
  {
    icon: "github",
    label: "GitHub",
    value: "github.com/MonsterGege",
    href: "https://github.com/MonsterGege",
    external: true,
  },
];
