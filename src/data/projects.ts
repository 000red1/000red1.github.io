export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "CI/CD Health Dashboard",
    description:
      "Program-level CI health tracking system for Server & Data Center GPU products at AMD. Maintains KPIs on test stability, failure rates, and pipeline reliability across multiple product lines including EPYC CPUs and MI-300/350 Series GPUs.",
    technologies: ["Python", "Jenkins", "Elasticsearch", "Grafana"],
  },
  {
    title: "Path Tracer",
    description:
      "Engineered a Path Tracer in C, integrating ray tracing algorithms for reflections, global illumination, and shadows. Incorporated Monte Carlo sampling and bounding volume hierarchies for 30% faster rendering.",
    technologies: ["C", "Git", "Unix Shell", "Ray Tracing"],
    github: "https://github.com/000red1",
  },
  {
    title: "PDE Solver",
    description:
      "Numerical solver for Partial Differential Equations using discretization and spectral methods. Built for computational mathematics research at University of Washington.",
    technologies: ["MATLAB", "Python", "NumPy", "SciPy", "Matplotlib"],
  },
  {
    title: "Portfolio Website",
    description:
      "This personal portfolio site built with modern web technologies. Features smooth animations, responsive design, and clean architecture.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: "https://000red1.github.io/",
    github: "https://github.com/000red1/000red1.github.io",
  },
];
