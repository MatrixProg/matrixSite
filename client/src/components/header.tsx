
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, Building2, Users, GraduationCap, Rocket, LogIn, UserPlus, Award } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'AI Startups', href: '/ai-hub', icon: <Building2 className="w-4 h-4" /> },
    { name: 'AI Projects', href: '/ai-tools', icon: <Rocket className="w-4 h-4" /> },
    { name: 'AI Learning', href: '/education', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'Community', href: '/community', icon: <Users className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MatrixProg
              </span>
              <div className="text-xs text-gray-500 -mt-1">AI Development Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    isActive(item.href) 
                      ? "bg-blue-600 text-white" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.href) 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Button>
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
                <Link href="/auth">
                  <Button variant="ghost" className="w-full justify-start text-gray-600">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Award className="w-4 h-4 mr-2" />
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
