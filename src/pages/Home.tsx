import { useState, useEffect } from "react";
import { experiences } from "../data/experience";
import { education } from "../data/education";
import {
  LANGUAGES,
  FRAMEWORKS,
  DEVOPS,
  DATABASES,
  TOOLS,
} from "../data/skills";
import { interests } from "../data/interests";
import { heroTexts } from "../data/heroTexts";
import { HiChevronDown } from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa";

function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentText = heroTexts[textIndex];
    const typingSpeed = isDeleting ? 30 : 50;
    const pauseTime = isDeleting ? 50 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % heroTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="intro"
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-12 relative bg-gradient-to-br from-teal-50 via-white to-slate-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-teal-500 to-slate-600 bg-clip-text text-transparent">
              Derick Amalraj
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 h-8 sm:h-10">
            {displayText}
            <span className="typing-cursor text-teal-500 font-light">|</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Self-driven, quick starter, passionate programmer with a curious mind
          who enjoys solving complex and challenging real-world problems.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-10">
          <a
            href="https://linkedin.com/in/derick-amal/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0077b5] hover:text-white transition-colors"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Read More
          </button>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-colors font-medium"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        {[0, 1, 2].map((i) => (
          <HiChevronDown
            key={i}
            className="w-6 h-4 text-teal-300"
            style={{
              animation: `chevronPulse 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-white bg-teal-600 py-4 px-6 mb-12 uppercase tracking-wide">
          About
        </h2>

        <div className="space-y-6">
          {/* Bio */}
          <p className="text-gray-700 text-lg leading-relaxed">
            I am a Software Engineer at AMD and a Computer Science Grad Student
            pursuing a Master's in Computational Mathematics at the University
            of Washington. I enjoy problem-solving and coding, always striving
            to bring 100% to the work I do.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            I have worked on technologies like Python, C/C++, Jenkins, Docker,
            Kubernetes, and various cloud platforms. With 2+ years of
            professional work experience, I have strengthened my expertise in
            CI/CD infrastructure, performance optimization, and embedded systems
            testing.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            I am passionate about developing complex systems that solve
            real-world problems and impact millions of users.
          </p>

          {/* Skills Summary */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mt-8">
            <ul className="space-y-2 text-gray-700">
              <li>
                <b>Languages:</b> {LANGUAGES.join(", ")}
              </li>
              <li>
                <b>Frameworks:</b> {FRAMEWORKS.join(", ")}
              </li>
              <li>
                <b>DevOps:</b> {DEVOPS.join(", ")}
              </li>
              <li>
                <b>Databases:</b> {DATABASES.join(", ")}
              </li>
              <li>
                <b>Tools:</b> {TOOLS.join(", ")}
              </li>
            </ul>
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-3 mt-6">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm"
              >
                {interest.emoji} {interest.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-white bg-teal-600 py-4 px-6 mb-12 uppercase tracking-wide">
          Experience
        </h2>

        {/* Connected Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-teal-300 to-slate-300"></div>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12 sm:pl-16 pb-8 last:pb-0">
                {/* Timeline dot */}
                <div
                  className={`absolute left-2 sm:left-4 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                    exp.type === "job" ? "bg-teal-500" : "bg-slate-400"
                  }`}
                ></div>

                {/* Content card */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                          {exp.title}
                        </h3>
                        <p className="text-teal-700 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-slate-500 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-white bg-teal-600 py-4 px-6 mb-12 uppercase tracking-wide">
          Education
        </h2>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {edu.degree}
                </h3>
                <p className="text-teal-700">{edu.school}</p>
              </div>
              <span className="text-sm text-slate-500 font-medium">
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-white bg-teal-600 py-4 px-6 mb-12 uppercase tracking-wide">
          Contact
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              📧
            </span>
            <a
              href="mailto:derick.amalraj@gmail.com"
              className="text-teal-700 hover:text-teal-900 text-lg"
            >
              derick.amalraj@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/derick-amal/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#0077b5] hover:text-white transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/derick-amal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 hover:text-teal-900 text-lg"
            >
              linkedin.com/in/derick-amal
            </a>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-6">
              Looking for an opportunity to work in a challenging position
              combining my skills in Software Engineering, which provides
              professional development, interesting experiences, and personal
              growth.
            </p>
            <a
              href="mailto:derick.amalraj@gmail.com"
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-slate-600 text-white rounded-lg hover:from-teal-600 hover:to-slate-700 transition-all font-medium"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
