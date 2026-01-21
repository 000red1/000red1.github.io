import BrowserWindow from "../components/BrowserWindow";
import { projects } from "../data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          All Projects
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A collection of my work spanning CI/CD infrastructure, computational
          mathematics, and web development.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <BrowserWindow key={index} fillHeight>
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-teal-100 flex items-center justify-center overflow-hidden">
                <span className="text-6xl font-bold text-slate-300">
                  {project.title.charAt(0)}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-teal-600 transition-colors"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-teal-600 transition-colors"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 text-sm rounded-full ${
                        techIndex % 2 === 0
                          ? "bg-teal-100 text-teal-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </BrowserWindow>
          ))}
        </div>
      </div>
    </div>
  );
}
