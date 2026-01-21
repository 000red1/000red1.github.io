import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineEnvelope,
  HiOutlineDocumentText,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa";
import profilePic from "../assets/profile.jpg";

export default function Layout() {
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Determine active section based on scroll position
      const sections = ["intro", "about", "experience", "education", "contact"];
      let foundSection = false;
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - windowHeight / 2) {
          setActiveSection(section);
          foundSection = true;
          break;
        }
      }
      if (!foundSection) {
        setActiveSection("intro");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (sectionId === "intro") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      if (sectionId === "intro") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { id: "about", label: "About", icon: <HiOutlineUser className="w-5 h-5" /> },
    { id: "experience", label: "Experience", icon: <HiOutlineBriefcase className="w-5 h-5" /> },
    { id: "education", label: "Education", icon: <HiOutlineAcademicCap className="w-5 h-5" /> },
    { id: "contact", label: "Contact", icon: <HiOutlineEnvelope className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Fixed Left Sidebar - Hidden on mobile */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-52 bg-white border-r border-slate-200 flex-col z-50">
        {/* Profile Section */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-teal-50">
          <button
            onClick={() => scrollToSection("intro")}
            className="block mx-auto"
          >
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-teal-400/40 overflow-hidden hover:border-teal-500 transition-colors">
              <img src={profilePic} alt="Derick Amalraj" className="w-full h-full object-cover" />
            </div>
          </button>
          <div className="mt-3 text-center">
            <h2 className="font-semibold text-slate-800">Derick Amalraj</h2>
            <p className="text-xs text-slate-500">Senior Software Engineer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-slate-50 border-l-3 border-teal-500 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-teal-600 border-l-3 border-transparent"
              }`}
            >
              <span className={activeSection === item.id ? "text-teal-500" : "text-slate-400"}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          {/* Resume Link */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-6 py-3 text-left text-slate-600 hover:bg-slate-50 hover:text-teal-600 border-l-3 border-transparent transition-all duration-200"
          >
            <span className="text-slate-400">
              <HiOutlineDocumentText className="w-5 h-5" />
            </span>
            <span className="font-medium">Resume</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/derick-amal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-500 hover:text-teal-600 hover:bg-teal-50 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <button
          onClick={() => scrollToSection("intro")}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-full border-2 border-teal-400/40 overflow-hidden">
            <img src={profilePic} alt="Derick Amalraj" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 block leading-tight">Derick Amalraj</span>
            <span className="text-xs text-slate-500">Software Engineer</span>
          </div>
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:text-teal-600"
        >
          {mobileMenuOpen ? (
            <HiXMark className="w-6 h-6" />
          ) : (
            <HiBars3 className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile Section */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-teal-50">
          <button
            onClick={() => scrollToSection("intro")}
            className="block mx-auto"
          >
            <div className="w-20 h-20 mx-auto rounded-full border-4 border-teal-400/40 overflow-hidden">
              <img src={profilePic} alt="Derick Amalraj" className="w-full h-full object-cover" />
            </div>
          </button>
          <div className="mt-3 text-center">
            <h2 className="font-semibold text-slate-800">Derick Amalraj</h2>
            <p className="text-xs text-slate-500">Software Engineer</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-slate-50 border-l-3 border-teal-500 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-teal-600 border-l-3 border-transparent"
              }`}
            >
              <span className={activeSection === item.id ? "text-teal-500" : "text-slate-400"}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          {/* Resume Link */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-6 py-3 text-left text-slate-600 hover:bg-slate-50 hover:text-teal-600 border-l-3 border-transparent transition-all duration-200"
          >
            <span className="text-slate-400">
              <HiOutlineDocumentText className="w-5 h-5" />
            </span>
            <span className="font-medium">Resume</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/derick-amal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-500 hover:text-teal-600 hover:bg-teal-50 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area - Offset for sidebar on desktop, for header on mobile */}
      <main className="lg:ml-52 pt-16 lg:pt-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="lg:ml-52 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Derick Amalraj. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
