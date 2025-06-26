
import { Link } from "wouter";
import { Brain, Building2, Rocket, GraduationCap, Users, Award, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const productLinks = [
    { name: "AI Startups Hub", href: "/ai-hub" },
    { name: "AI Projects", href: "/ai-tools" },
    { name: "AI Learning", href: "/education" },
    { name: "Certifications", href: "/education" },
    { name: "Community", href: "/community" },
  ];

  const learningLinks = [
    { name: "AI Fundamentals", href: "/education" },
    { name: "Machine Learning", href: "/education" },
    { name: "Deep Learning", href: "/education" },
    { name: "AI Development", href: "/education" },
    { name: "Startup Guide", href: "/ai-hub" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MatrixProg
                </span>
                <div className="text-xs text-gray-400">AI Development Platform</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your complete AI development ecosystem. Discover startups, build projects, 
              learn AI, and earn certifications.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Rocket className="w-4 h-4 mr-2" />
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              Learning
            </h3>
            <ul className="space-y-3">
              {learningLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-white font-semibold mb-2">Stay updated with AI trends</h4>
              <p className="text-gray-400 text-sm">
                Get the latest AI startup news, project updates, and learning resources.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MatrixProg. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with ❤️ for AI developers</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Powered by</span>
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded flex items-center justify-center">
                <Brain className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
