
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Play,
  Code,
  Brain,
  Trophy,
  Target,
  Rocket,
  Shield,
  Zap,
  Globe,
  Building2,
  TrendingUp,
  ChevronRight
} from "lucide-react";

export default function Education() {
  const [selectedTrack, setSelectedTrack] = useState("fundamentals");

  const learningTracks = [
    {
      id: "fundamentals",
      name: "AI Fundamentals",
      level: "Beginner",
      duration: "4 weeks",
      students: "25K+",
      rating: 4.9,
      description: "Master the basics of artificial intelligence and machine learning",
      modules: 8,
      projects: 3,
      certification: "AI Fundamentals Certificate",
      price: "Free",
      color: "bg-green-100 text-green-700 border-green-200"
    },
    {
      id: "ml-engineer",
      name: "ML Engineer Path",
      level: "Intermediate",
      duration: "12 weeks",
      students: "15K+",
      rating: 4.8,
      description: "Become a professional machine learning engineer",
      modules: 16,
      projects: 8,
      certification: "Certified ML Engineer",
      price: "$299",
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      id: "deep-learning",
      name: "Deep Learning Specialist",
      level: "Advanced",
      duration: "16 weeks",
      students: "8K+",
      rating: 4.9,
      description: "Master neural networks and deep learning architectures",
      modules: 20,
      projects: 12,
      certification: "Deep Learning Specialist",
      price: "$499",
      color: "bg-purple-100 text-purple-700 border-purple-200"
    },
    {
      id: "ai-startup",
      name: "AI Startup Founder",
      level: "Expert",
      duration: "20 weeks",
      students: "3K+",
      rating: 4.9,
      description: "Build and scale AI-powered startups from scratch",
      modules: 24,
      projects: 15,
      certification: "AI Entrepreneur Certificate",
      price: "$799",
      color: "bg-orange-100 text-orange-700 border-orange-200"
    }
  ];

  const certifications = [
    {
      name: "AI Fundamentals Certificate",
      issuer: "MatrixProg Academy",
      recognition: "Industry Recognized",
      holders: "25,000+",
      icon: <Award className="w-6 h-6" />
    },
    {
      name: "Certified ML Engineer",
      issuer: "MatrixProg Professional",
      recognition: "Professional Level",
      holders: "15,000+",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      name: "Deep Learning Specialist",
      issuer: "MatrixProg Advanced",
      recognition: "Expert Level",
      holders: "8,000+",
      icon: <Brain className="w-6 h-6" />
    },
    {
      name: "AI Entrepreneur Certificate",
      issuer: "MatrixProg Business",
      recognition: "Leadership Level",
      holders: "3,000+",
      icon: <Building2 className="w-6 h-6" />
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Interactive Learning",
      description: "Hands-on projects and real-world applications"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Live Coding Labs",
      description: "Practice in our integrated development environment"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Industry Certifications",
      description: "Earn credentials recognized by top companies"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Learning Academy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master artificial intelligence through structured learning paths and earn industry-recognized certifications
            </p>
          </div>

          <Tabs value={selectedTrack} onValueChange={setSelectedTrack} className="w-full">
            {/* Learning Tracks Navigation */}
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white border border-gray-200 h-auto p-1">
              {learningTracks.map((track) => (
                <TabsTrigger 
                  key={track.id} 
                  value={track.id}
                  className="flex flex-col items-center p-4 text-left data-[state=active]:bg-blue-50"
                >
                  <div className="font-medium text-sm">{track.name}</div>
                  <Badge className={`mt-1 text-xs ${track.color}`}>
                    {track.level}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Track Details */}
            {learningTracks.map((track) => (
              <TabsContent key={track.id} value={track.id} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <Card className="mb-6">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-2xl mb-2">{track.name}</CardTitle>
                            <CardDescription className="text-lg text-gray-600 mb-4">
                              {track.description}
                            </CardDescription>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{track.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{track.students} students</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{track.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={`${track.color} text-sm`}>
                            {track.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{track.modules}</div>
                            <div className="text-sm text-gray-600">Modules</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{track.projects}</div>
                            <div className="text-sm text-gray-600">Projects</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">1</div>
                            <div className="text-sm text-gray-600">Certificate</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            <Play className="w-4 h-4 mr-2" />
                            Start Learning - {track.price}
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View Curriculum
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Features */}
                    <Card>
                      <CardHeader>
                        <CardTitle>What You'll Get</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                {feature.icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Certification Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Certification
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 text-white" />
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2">{track.certification}</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Industry-recognized certificate upon completion
                          </p>
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified Certificate
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Learning Path */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Overall Progress</span>
                              <span>0%</span>
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>
                          
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span>Introduction to AI</span>
                              <Button size="sm" variant="outline">Start</Button>
                            </div>
                            <div className="flex items-center justify-between text-gray-400">
                              <span>Machine Learning Basics</span>
                              <span>Locked</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-400">
                              <span>Neural Networks</span>
                              <span>Locked</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Certifications Section */}
          <section className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Certifications</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Earn credentials that are recognized by leading AI companies and boost your career
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      {cert.icon}
                    </div>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <CardDescription>
                      {cert.issuer}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="bg-green-100 text-green-700 mb-2">
                      {cert.recognition}
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {cert.holders} certified professionals
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
