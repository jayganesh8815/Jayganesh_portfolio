// ==========================================
// 1. PROFILE DETAILS & RESUME HANDLER
// ==========================================

export const PROFILE = {
  name: "Jayganesh Dashrath Lavange", // Replace with your full name
  role: "Microsoft SQL Server Database Administrator", // Replace with your role
  experience: "4+ Years Experience",
  headline: "Building Reliable, Secure, High-Performance Database Infrastructure.",
  location: "India",
  
  // REPLACE THESE WITH YOUR PERSONAL DETAILS:
  email: "jayganeshlavange@gmail.com",
  phone: "+91 8767140968",
  linkedin: "www.linkedin.com/in/jayganesh-lavange-158924342",
  github: "https://github.com/jayganesh8815/jayganesh8815.git",
  
  // OPTION A: Place your resume PDF in `frontend/public/resume.pdf`
  // OPTION B: Replace this with a Google Drive / Dropbox share link
  resumeUrl: "/Resume.pdf" 
};

/**
 * Handles clicking on the Resume button.
 * Opens your PDF resume directly in a new browser tab.
 */
export function downloadResume() {
  if (PROFILE.resumeUrl) {
    window.open(PROFILE.resumeUrl, "_blank", "noopener,noreferrer");
  } else {
    // Fallback: Generate a text-based resume if no URL/file is provided
    const p = PROFILE;
    const lines = [
      p.name,
      `${p.role} | ${p.experience}`,
      `${p.email} | ${p.phone}`,
      `LinkedIn: ${p.linkedin}`,
      `GitHub: ${p.github}`,
      "",
      "SUMMARY",
      "Microsoft SQL Server DBA with 4+ years in enterprise production environments.",
      "Focus: High Availability, Disaster Recovery, Performance Tuning, Security, Automation.",
      "",
      "EXPERIENCE",
      "Clover Infotech — Microsoft SQL Server DBA (4+ Years)",
      "- Always On AG, Log Shipping, backup & DR strategy, performance tuning, 24x7 support.",
      "",
      "SKILLS",
      "SQL Server 2016/2019/2022, Azure SQL, Always On AG, Log Shipping, Replication,",
      "Backup/Recovery, Query & Index Tuning, DMVs, Extended Events, T-SQL, PowerShell."
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${p.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
}

// ==========================================
// 2. PORTFOLIO DATA SECTIONS
// ==========================================

export const STATS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Databases Managed" },
  { value: 99.9, suffix: "%", label: "Availability", decimals: 1 },
  { value: 24, suffix: "/7", label: "Production Support" }
];

export const ABOUT = [
  "I am a Microsoft SQL Server DBA driven by a passion for keeping mission-critical data available, secure and fast. Over 4+ years across enterprise production environments, I have owned the full database lifecycle from installation and configuration to migration and decommissioning.",
  "My focus areas are High Availability and Disaster Recovery, deep performance tuning, hardened database security, and automation that removes toil. I believe reliable infrastructure is invisible — and I take pride in building systems recruiters and engineers can trust."
];

export const SKILL_GROUPS = [
  { title: "Database", icon: "Database", items: ["SQL Server 2016", "SQL Server 2019", "SQL Server 2022", "Azure SQL Database"] },
  { title: "High Availability", icon: "Network", items: ["Always On Availability Groups", "Log Shipping", "Database Mirroring", "Replication"] },
  { title: "Backup & Recovery", icon: "HardDriveDownload", items: ["Full Backup", "Differential Backup", "Transaction Log Backup", "Point-in-Time Recovery"] },
  { title: "Performance Tuning", icon: "Gauge", items: ["Query Optimization", "Index Tuning", "Execution Plans", "Statistics", "DMVs", "Wait Statistics"] },
  { title: "Monitoring", icon: "Activity", items: ["SQL Agent", "Database Mail", "Extended Events", "PerfMon", "SQL Profiler"] },
  { title: "Security", icon: "ShieldCheck", items: ["Logins", "Users", "Roles", "Encryption (TDE)", "Auditing"] },
  { title: "Automation", icon: "TerminalSquare", items: ["T-SQL", "PowerShell", "SQL Agent Jobs", "Maintenance Plans"] },
  { title: "Operating Systems", icon: "Server", items: ["Windows Server", "Linux"] }
];

export const EXPERIENCE = [
  {
    company: "Clover Infotech",
    role: "Microsoft SQL Server DBA",
    period: "4+ Years",
    points: [
      "Database installation, configuration & standardization across production and non-production estates",
      "Designed backup strategy and disaster recovery runbooks with tested RTO/RPO objectives",
      "Implemented Always On Availability Groups and Log Shipping for high availability",
      "Performance tuning — query optimization, index tuning and execution plan analysis",
      "Database security: logins, roles, encryption and auditing",
      "Database migrations, maintenance plans and index optimization",
      "Automation with T-SQL & PowerShell; 24x7 production support and incident response"
    ]
  }
];

export const PROJECTS = [
  {
    title: "SQL Health Check Dashboard",
    tag: "Monitoring",
    problem: "No unified view of instance health across dozens of servers.",
    solution: "Built a T-SQL + PowerShell driven dashboard surfacing wait stats, blocking, backup status and disk pressure.",
    tech: ["T-SQL", "PowerShell", "DMVs", "SQL Agent"],
    image: "https://images.pexels.com/photos/8927039/pexels-photo-8927039.jpeg",
    github: PROFILE.github
  },
  {
    title: "Always On Availability Group Implementation",
    tag: "High Availability",
    problem: "Single points of failure on business-critical databases.",
    solution: "Deployed multi-replica AG with a listener, automatic failover and read-scale secondaries.",
    tech: ["Always On AG", "Listener", "WSFC", "Replicas"],
    image: "https://images.unsplash.com/photo-1754738381790-8caa4bb0a670",
    github: PROFILE.github
  },
  {
    title: "Backup Automation Suite",
    tag: "Automation",
    problem: "Manual, inconsistent backups with no reporting.",
    solution: "Automated full/diff/log backups via PowerShell & SQL Agent with scheduled email reports and validation.",
    tech: ["PowerShell", "SQL Agent", "Database Mail", "Scheduling"],
    image: "https://images.pexels.com/photos/13570173/pexels-photo-13570173.jpeg",
    github: PROFILE.github
  },
  {
    title: "Performance Optimization Engagement",
    tag: "Performance",
    problem: "Slow reports and CPU pressure on a core OLTP system.",
    solution: "Index & statistics tuning plus query rewrites delivered up to 8x faster critical queries.",
    tech: ["Execution Plans", "Indexes", "Statistics", "Query Store"],
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    github: PROFILE.github
  }
];

export const CERTS = [
  { name: "Microsoft DP-300", sub: "Administering Microsoft Azure SQL Solutions", status: "In Progress" },
  { name: "Azure Fundamentals", sub: "AZ-900", status: "Planned" },
  { name: "SQL Server Certification", sub: "Microsoft Certified", status: "Planned" },
  { name: "Future Certification", sub: "Continuous learning roadmap", status: "Roadmap" }
];

export const REPOS = [
  { name: "sql-health-check", desc: "T-SQL & PowerShell instance health reporting toolkit.", tech: ["T-SQL", "PowerShell"], stars: 42, updated: "2w ago" },
  { name: "alwayson-lab", desc: "Reproducible Always On Availability Group lab scripts.", tech: ["PowerShell", "WSFC"], stars: 28, updated: "1mo ago" },
  { name: "backup-automation", desc: "Automated backup + validation + email reporting jobs.", tech: ["PowerShell", "SQL Agent"], stars: 35, updated: "3w ago" }
];

export const POSTS = [
  { title: "A Practical Guide to SQL Server Performance Tuning", cat: "Performance", read: "8 min" },
  { title: "Designing a Bulletproof Backup Strategy", cat: "Backup", read: "6 min" },
  { title: "Always On Availability Groups, End to End", cat: "High Availability", read: "10 min" },
  { title: "Index Optimization Without the Guesswork", cat: "Indexing", read: "7 min" },
  { title: "Reading Execution Plans Like a DBA", cat: "Query Perf", read: "9 min" },
  { title: "Hardening SQL Server Security", cat: "Security", read: "5 min" }
];

export const TESTIMONIALS = [
  { quote: "Reserved for a future recommendation from a manager or colleague.", name: "Your Manager", title: "Engineering Lead" },
  { quote: "Reserved for a future recommendation from a peer DBA.", name: "Peer DBA", title: "Senior DBA" },
  { quote: "Reserved for a future recommendation from a stakeholder.", name: "Product Stakeholder", title: "Delivery Manager" }
];
