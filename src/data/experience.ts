export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  description: string;
  color: "teal" | "slate";
  type: "job" | "teaching";
}

export const experiences: ExperienceEntry[] = [
  {
    title: "Senior Software Development Engineer",
    company: "Advanced Micro Devices (AMD)",
    period: "June 2026 - Present",
    description:
      "Architecting next-generation CI/CD solutions for enterprise GPU platforms. Leading cross-functional initiatives to scale infrastructure supporting AMD's Data Center product lines, driving technical strategy for pipeline reliability and developer productivity.",
    color: "teal",
    type: "job",
  },
  {
    title: "Software Development Engineer 2",
    company: "Advanced Micro Devices (AMD)",
    period: "April 2024 - June 2026",
    description:
      "Improved simulation test efficiency by 40%+ for MI355 GPU through optimized scheduling and auto-scaling. Implemented program-level CI health tracking with dashboards monitoring test stability across MI-300/350 Series GPUs. Expanded pre-commit test coverage across multiple firmware components.",
    color: "teal",
    type: "job",
  },
  {
    title: "Teaching Assistant",
    company: "University of Toronto",
    period: "August 2022 - December 2023",
    description:
      "Instructed tutorials for 10+ courses spanning Calculus, Linear Algebra, Abstract Algebra, and Computer Science. Built automated grading pipelines using VBA, contributing to measurable improvements in student performance. Mentored students through complex mathematical concepts.",
    color: "slate",
    type: "teaching",
  },
  {
    title: "Software Engineer Co-op",
    company: "Advanced Micro Devices (AMD)",
    period: "May 2021 - August 2022",
    description:
      "Built comprehensive Jenkins CI pipelines for firmware validation across company-wide integration. Developed embedded systems test suites using Python and Shell scripts for hardware validation. Received AMD Spotlight Award for significant infrastructure contributions.",
    color: "teal",
    type: "job",
  },
];
