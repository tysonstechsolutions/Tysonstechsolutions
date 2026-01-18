import { Metadata } from "next";
import ResumeChatWidget from "./ResumeChatWidget";

export const metadata: Metadata = {
  title: "Tyson Bruce - Resume | AI Developer & Full-Stack Engineer",
  description:
    "Resume of Tyson Bruce - AI Developer and Full-Stack Engineer specializing in Next.js, React, Python, Claude API, and rapid application development.",
  openGraph: {
    title: "Tyson Bruce - Resume",
    description:
      "AI Developer & Full-Stack Engineer - 7 production projects, 2 live businesses",
    url: "https://tysonstechsolutions.com/Tyson_Bruce_Resume.pdf",
    siteName: "TysonsTechSolutions",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumePage() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-sm font-semibold">Interactive Resume</span>
          </div>
          <span className="text-sm opacity-90 hidden sm:inline">
            Click the AI chat button to learn more
          </span>
        </div>
        <a
          href="https://tysonstechsolutions.com"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          Visit Portfolio
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 relative">
        <iframe
          src="/resume.pdf"
          className="w-full h-full border-none"
          title="Tyson Bruce Resume"
        />

        {/* Fallback for browsers that don't support PDF embedding */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <noscript>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center pointer-events-auto">
              <p className="text-gray-700 mb-4">
                Your browser doesn't support embedded PDFs.
              </p>
              <a
                href="/resume.pdf"
                download="Tyson_Bruce_Resume.pdf"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
              >
                Download Resume
              </a>
            </div>
          </noscript>
        </div>
      </div>

      {/* Chat Widget */}
      <ResumeChatWidget />
    </div>
  );
}
