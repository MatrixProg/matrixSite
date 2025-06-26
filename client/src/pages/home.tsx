
import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  GraduationCap, 
  Rocket,
  Building2,
  Award,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Code,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Globe,
  Cpu,
  Network,
  Sparkles,
  Shield,
  MessageSquare,
  Target,
  Zap,
  Trophy
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "AI Startups Hub",
      description: "Discover, analyze and connect with the latest AI startups and funding rounds",
      link: "/ai-hub",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "AI Projects",
      description: "Explore open-source AI projects and build your own with our tools",
      link: "/ai-tools",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "AI Learning",
      description: "Comprehensive AI courses from basics to advanced machine learning",
      link: "/education",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certifications",
      description: "Earn industry-recognized AI and ML certifications",
      link: "/education",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { label: "AI Startups", value: "2.5K+", icon: <Building2 className="w-5 h-5" /> },
    { label: "Active Projects", value: "15K+", icon: <Rocket className="w-5 h-5" /> },
    { label: "Certified Developers", value: "50K+", icon: <Award className="w-5 h-5" /> },
    { label: "Learning Hours", value: "1M+", icon: <BookOpen className="w-5 h-5" /> }
  ];

  const certifications = [
    { name: "AI Fundamentals", level: "Beginner", duration: "20 hours" },
    { name: "Machine Learning Engineer", level: "Intermediate", duration: "60 hours" },
    { name: "Deep Learning Specialist", level: "Advanced", duration: "80 hours" },
    { name: "AI Startup Founder", level: "Expert", duration: "100 hours" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">
              🚀 The Future of AI Development
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MatrixProg
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your complete AI development ecosystem. Discover AI startups, build projects, 
            master machine learning, and earn industry certifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/ai-hub">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Building2 className="w-5 h-5 mr-2" />
                Explore AI Startups
              </Button>
            </Link>
            <Link href="/education">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for AI success
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From discovering the hottest AI startups to earning professional certifications, 
              MatrixProg is your one-stop platform for AI excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-3 rounded-lg ${feature.color}`}>
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Learning Path */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your AI Learning Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow our structured learning path to become an AI expert and earn industry-recognized certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">
                    {cert.level}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{cert.duration}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How MatrixProg works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Discover</h3>
              <p className="text-gray-600">
                Explore the latest AI startups, funding rounds, and market opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Learn</h3>
              <p className="text-gray-600">
                Master AI and ML through our comprehensive courses and hands-on projects.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Build</h3>
              <p className="text-gray-600">
                Create AI applications using our tools and open-source projects.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Certify</h3>
              <p className="text-gray-600">
                Earn recognized certifications to advance your AI career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to become an AI expert?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of developers building the future with artificial intelligence. 
            Start your journey today and earn your first certification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                <Trophy className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/ai-hub">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-8 py-3">
                <Building2 className="w-5 h-5 mr-2" />
                Explore Startups
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
