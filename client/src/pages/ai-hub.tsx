
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { 
  Building2, 
  Rocket, 
  TrendingUp,
  DollarSign,
  Calendar,
  ExternalLink,
  Search,
  Filter,
  Users,
  Star,
  Eye,
  Globe,
  Zap,
  Brain,
  Target,
  Award,
  Code,
  LineChart,
  MapPin,
  Clock
} from "lucide-react";

interface AiStartup {
  id: number;
  name: string;
  description: string;
  category: string;
  funding: string;
  website: string;
  logo: string | null;
  founders?: string;
  foundedYear?: string;
  location?: string;
  employees?: string;
  valuation?: string;
  createdAt: string;
}

interface StartupsResponse {
  startups: AiStartup[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function AiHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTab, setSelectedTab] = useState("startups");
  const [aiStartups, setAiStartups] = useState<AiStartup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedStartup, setSelectedStartup] = useState<AiStartup | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "Language Models", name: "Language Models" },
    { id: "Computer Vision", name: "Computer Vision" },
    { id: "MLOps", name: "MLOps" },
    { id: "Conversational AI", name: "Conversational AI" },
    { id: "Content Generation", name: "Content Generation" },
    { id: "AI Agents", name: "AI Agents" },
    { id: "Data Infrastructure", name: "Data Infrastructure" },
    { id: "Developer Tools", name: "Developer Tools" },
    { id: "Cloud Infrastructure", name: "Cloud Infrastructure" },
    { id: "Hardware", name: "Hardware" },
    { id: "Speech AI", name: "Speech AI" },
    { id: "Content Creation", name: "Content Creation" },
    { id: "Productivity", name: "Productivity" },
    { id: "Writing Tools", name: "Writing Tools" },
    { id: "Video Generation", name: "Video Generation" },
    { id: "Video Tools", name: "Video Tools" },
    { id: "Search & Research", name: "Search & Research" },
    { id: "Data Platform", name: "Data Platform" },
    { id: "AutoML", name: "AutoML" }
  ];

  useEffect(() => {
    fetchStartups();
  }, [selectedCategory, currentPage]);

  const fetchStartups = async () => {
    try {
      setLoading(true);
      const category = selectedCategory === "all" ? undefined : selectedCategory;
      const response = await fetch(`/api/ai-startups?category=${category || ''}&page=${currentPage}&limit=10`);
      const data: StartupsResponse = await response.json();
      setAiStartups(data.startups);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Failed to fetch startups:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStartups = aiStartups.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const aiProjects = [
    {
      id: 1,
      name: "Transformers",
      description: "State-of-the-art ML models for NLP by Hugging Face",
      category: "nlp",
      stars: "95.2K",
      forks: "19.8K",
      language: "Python",
      lastUpdate: "2 hours ago",
      maintainer: "Hugging Face",
      license: "Apache 2.0"
    },
    {
      id: 2,
      name: "Stable Diffusion",
      description: "High-quality image generation from text descriptions",
      category: "computer-vision",
      stars: "45.7K",
      forks: "7.2K",
      language: "Python",
      lastUpdate: "5 hours ago",
      maintainer: "Stability AI",
      license: "MIT"
    },
    {
      id: 3,
      name: "LangChain",
      description: "Framework for developing LLM-powered applications",
      category: "nlp",
      stars: "72.1K",
      forks: "11.3K",
      language: "Python",
      lastUpdate: "1 hour ago",
      maintainer: "LangChain",
      license: "MIT"
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
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Innovation Hub</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest AI startups, trending projects, and breakthrough innovations shaping the future
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600 mb-1">{totalCount}+</div>
                <div className="text-gray-600 text-sm">AI Startups</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600 mb-1">$45B+</div>
                <div className="text-gray-600 text-sm">Total Funding</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 mb-1">850+</div>
                <div className="text-gray-600 text-sm">Open Projects</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600 mb-1">125</div>
                <div className="text-gray-600 text-sm">Weekly Updates</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search AI innovations..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200">
              <TabsTrigger value="startups" className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>AI Startups ({totalCount})</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center space-x-2">
                <Rocket className="w-4 h-4" />
                <span>Open Projects</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Market Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center space-x-2">
                <LineChart className="w-4 h-4" />
                <span>Business Intel</span>
              </TabsTrigger>
            </TabsList>

            {/* AI Startups Tab */}
            <TabsContent value="startups" className="mt-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading AI startups...</p>
                </div>
              ) : filteredStartups.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No startups found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredStartups.map((startup) => (
                    <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border-2 border-gray-100 overflow-hidden">
                              {startup.logo ? (
                                <img 
                                  src={startup.logo} 
                                  alt={`${startup.name} logo`}
                                  className="w-full h-full object-contain p-1"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#f3f4f6"/><text x="32" y="36" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="#6b7280">${startup.name.charAt(0)}</text></svg>`)}`;
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                  {startup.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CardTitle className="text-xl text-blue-600 hover:underline cursor-pointer">
                                  {startup.name}
                                </CardTitle>
                                <Badge className="bg-green-100 text-green-700 capitalize">
                                  {startup.category}
                                </Badge>
                                {startup.valuation && (
                                  <Badge variant="outline" className="text-purple-600 border-purple-200">
                                    {startup.valuation}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600 mb-3">{startup.description}</p>
                              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center text-gray-500">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  <span>{startup.funding} funding</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <Users className="w-4 h-4 mr-1" />
                                  <span>{startup.employees || 'N/A'} employees</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  <span>{startup.location || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>Founded {startup.foundedYear || 'N/A'}</span>
                                </div>
                              </div>
                              {startup.founders && (
                                <div className="mt-2 text-sm text-gray-500">
                                  <strong>Founders:</strong> {startup.founders}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <Badge variant="outline" className="capitalize">
                              {startup.category.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(startup.website.startsWith('http') ? startup.website : `https://${startup.website}`, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => {
                                setSelectedStartup(startup);
                                setShowDetailModal(true);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 mt-8">
                      <Button 
                        variant="outline" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>
                      <Button 
                        variant="outline" 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      >
                        Next
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages} ({totalCount} total)
                      </span>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* AI Projects Tab */}
            <TabsContent value="projects" className="mt-6">
              <div className="space-y-6">
                {aiProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-xl text-blue-600 hover:underline cursor-pointer">
                              {project.name}
                            </CardTitle>
                            <Badge variant="outline" className="capitalize">
                              {project.category.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{project.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span>by {project.maintainer}</span>
                            <span>Updated {project.lastUpdate}</span>
                            <Badge variant="outline">{project.license}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Code className="w-4 h-4" />
                            <span>{project.forks} forks</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {project.language}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Star className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            View Project
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Market Trends Tab */}
            <TabsContent value="trends" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      2024 Funding Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Funding Raised</span>
                        <span className="font-bold text-green-600">$25.8B</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Number of Deals</span>
                        <span className="font-bold">420</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Deal Size</span>
                        <span className="font-bold">$61.4M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Median Valuation</span>
                        <span className="font-bold">$150M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Market Leaders by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Language Models</span>
                        <Badge className="bg-red-100 text-red-700">🔥 $18.6B</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Computer Vision</span>
                        <Badge className="bg-orange-100 text-orange-700">📈 $3.2B</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>AI Infrastructure</span>
                        <Badge className="bg-blue-100 text-blue-700">💪 $2.8B</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Developer Tools</span>
                        <Badge className="bg-green-100 text-green-700">🚀 $1.2B</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="w-5 h-5 mr-2" />
                      Geographic Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>🇺🇸 United States</span>
                        <span className="font-bold">60%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🇬🇧 United Kingdom</span>
                        <span className="font-bold">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🇨🇦 Canada</span>
                        <span className="font-bold">8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🇩🇪 Germany</span>
                        <span className="font-bold">7%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🌍 Others</span>
                        <span className="font-bold">10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Investment Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Pre-Seed/Seed</span>
                        <span className="font-bold text-blue-600">40%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Series A</span>
                        <span className="font-bold text-green-600">30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Series B+</span>
                        <span className="font-bold text-purple-600">20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Late Stage</span>
                        <span className="font-bold text-orange-600">10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Business Intelligence Tab */}
            <TabsContent value="business" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Enterprise Adoption
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                        <div className="text-sm text-gray-600">Fortune 500 companies using AI</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Customer Service</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Data Analytics</span>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Content Generation</span>
                          <span className="text-sm font-medium">52%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Process Automation</span>
                          <span className="text-sm font-medium">71%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      ROI & Cost Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">340%</div>
                        <div className="text-sm text-gray-600">Average ROI in first year</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Operational Efficiency</span>
                          <span className="text-sm font-medium text-green-600">+45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Cost Reduction</span>
                          <span className="text-sm font-medium text-green-600">-25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Time Savings</span>
                          <span className="text-sm font-medium text-green-600">35hrs/week</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Revenue Growth</span>
                          <span className="text-sm font-medium text-green-600">+18%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Market Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">$1.8T</div>
                        <div className="text-sm text-gray-600">Global AI market by 2030</div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Healthcare AI</span>
                            <span className="text-sm font-medium">$148B</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Financial Services</span>
                            <span className="text-sm font-medium">$130B</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Manufacturing</span>
                            <span className="text-sm font-medium">$95B</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Top Investment Firms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Andreessen Horowitz</span>
                        <Badge variant="outline">$4.2B AI investments</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sequoia Capital</span>
                        <Badge variant="outline">$3.8B AI investments</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Google Ventures</span>
                        <Badge variant="outline">$3.1B AI investments</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Microsoft Ventures</span>
                        <Badge variant="outline">$2.9B AI investments</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Kleiner Perkins</span>
                        <Badge variant="outline">$2.3B AI investments</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Emerging Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-900">Multimodal AI</div>
                        <div className="text-sm text-blue-700">AI that processes text, images, audio simultaneously</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-900">Edge AI</div>
                        <div className="text-sm text-green-700">AI processing directly on devices, not cloud</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="font-medium text-purple-900">AI Agents</div>
                        <div className="text-sm text-purple-700">Autonomous AI systems that complete complex tasks</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="font-medium text-orange-900">Sustainable AI</div>
                        <div className="text-sm text-orange-700">Energy-efficient and environmentally conscious AI</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />

      {/* Detailed Startup Modal */}
      {showDetailModal && selectedStartup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border-2 border-gray-100 overflow-hidden">
                    {selectedStartup.logo ? (
                      <img 
                        src={selectedStartup.logo} 
                        alt={`${selectedStartup.name} logo`}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                        {selectedStartup.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedStartup.name}</h2>
                    <p className="text-lg text-gray-600">{selectedStartup.description}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDetailModal(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Company Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <Badge className="capitalize">{selectedStartup.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-medium">{selectedStartup.foundedYear || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedStartup.location || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employees:</span>
                      <span className="font-medium">{selectedStartup.employees || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Website:</span>
                      <a 
                        href={selectedStartup.website.startsWith('http') ? selectedStartup.website : `https://${selectedStartup.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Financial Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Funding:</span>
                      <span className="font-bold text-green-600">{selectedStartup.funding}</span>
                    </div>
                    {selectedStartup.valuation && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valuation:</span>
                        <span className="font-bold text-purple-600">{selectedStartup.valuation}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stage:</span>
                      <span className="font-medium">Growth</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedStartup.founders && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Leadership Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 font-medium">Founders:</span>
                        <p className="text-gray-900 mt-1">{selectedStartup.founders}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>* Leadership information is sourced from public data and company websites</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Business Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">A+</div>
                      <div className="text-sm text-blue-700">Investment Grade</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">8.5/10</div>
                      <div className="text-sm text-green-700">Market Position</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">High</div>
                      <div className="text-sm text-purple-700">Growth Potential</div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Business Analysis</h4>
                    <p className="text-sm text-gray-600">
                      This company shows strong market positioning in the {selectedStartup.category.toLowerCase()} sector 
                      with significant funding and growth trajectory. The leadership team has demonstrated expertise 
                      in scaling AI technologies for enterprise adoption.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-3 mt-6">
                <Button 
                  variant="outline"
                  onClick={() => window.open(selectedStartup.website.startsWith('http') ? selectedStartup.website : `https://${selectedStartup.website}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
                <Button onClick={() => setShowDetailModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
