
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  DollarSign, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Users, 
  Globe, 
  MessageSquare,
  FileText,
  Hash,
  Camera,
  Video,
  Mic,
  Plus,
  BarChart3,
  Calendar,
  Clock,
  Zap
} from "lucide-react";

export default function AiWorkers() {
  const [selectedWorkerType, setSelectedWorkerType] = useState("content");
  const [newWorkerConfig, setNewWorkerConfig] = useState({
    name: "",
    type: "content",
    schedule: "hourly",
    platform: "blog",
    topic: "",
    style: "professional"
  });

  const workerTypes = [
    {
      id: "content",
      name: "Content Creator",
      icon: <FileText className="w-6 h-6" />,
      description: "Generate blog posts, articles, and written content automatically",
      earnings: "$100-500/day",
      setup: "5 minutes"
    },
    {
      id: "social",
      name: "Social Media Manager", 
      icon: <Hash className="w-6 h-6" />,
      description: "Create and schedule social media posts across platforms",
      earnings: "$50-300/day",
      setup: "10 minutes"
    },
    {
      id: "video",
      name: "Video Producer",
      icon: <Video className="w-6 h-6" />,
      description: "Generate video scripts, thumbnails, and YouTube content",
      earnings: "$200-1000/day",
      setup: "15 minutes"
    },
    {
      id: "podcast",
      name: "Podcast Bot",
      icon: <Mic className="w-6 h-6" />,
      description: "Create podcast episodes with AI voices and topics",
      earnings: "$150-800/day",
      setup: "20 minutes"
    },
    {
      id: "ecommerce",
      name: "E-commerce Manager",
      icon: <Globe className="w-6 h-6" />,
      description: "Manage product listings, descriptions, and customer service",
      earnings: "$300-2000/day",
      setup: "30 minutes"
    },
    {
      id: "course",
      name: "Course Creator",
      icon: <Users className="w-6 h-6" />,
      description: "Build and sell online courses automatically",
      earnings: "$500-5000/day",
      setup: "45 minutes"
    }
  ];

  const activeWorkers = [
    {
      id: 1,
      name: "Tech Blog Writer",
      type: "content",
      status: "running",
      dailyEarnings: "$127.50",
      monthlyEarnings: "$3,240",
      postsToday: 5,
      platform: "Medium + Personal Blog",
      nextPost: "in 45 minutes"
    },
    {
      id: 2,
      name: "Instagram Growth Bot",
      type: "social", 
      status: "running",
      dailyEarnings: "$89.20",
      monthlyEarnings: "$2,890",
      postsToday: 12,
      platform: "Instagram + TikTok",
      nextPost: "in 12 minutes"
    },
    {
      id: 3,
      name: "YouTube Channel Manager",
      type: "video",
      status: "paused",
      dailyEarnings: "$0.00",
      monthlyEarnings: "$4,560",
      postsToday: 0,
      platform: "YouTube",
      nextPost: "paused"
    }
  ];

  const createWorker = () => {
    // This would integrate with the backend to create a new AI worker
    console.log("Creating worker:", newWorkerConfig);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI Workers Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Deploy, manage, and scale your automated income generators
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Active Workers</CardDescription>
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <CardTitle className="text-3xl text-white">12</CardTitle>
                <CardDescription className="text-green-400 text-sm">+2 this week</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Today's Revenue</CardDescription>
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <CardTitle className="text-3xl text-green-400">$267.50</CardTitle>
                <CardDescription className="text-green-400 text-sm">+15% from yesterday</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Monthly Revenue</CardDescription>
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <CardTitle className="text-3xl text-purple-400">$8,420</CardTitle>
                <CardDescription className="text-green-400 text-sm">+32% this month</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Content Created</CardDescription>
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                </div>
                <CardTitle className="text-3xl text-orange-400">1,247</CardTitle>
                <CardDescription className="text-green-400 text-sm">pieces this month</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700">
              <TabsTrigger value="active">Active Workers</TabsTrigger>
              <TabsTrigger value="create">Create New Worker</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Active Workers */}
            <TabsContent value="active" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeWorkers.map((worker) => (
                  <Card key={worker.id} className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{worker.name}</CardTitle>
                          <CardDescription className="text-gray-400">{worker.platform}</CardDescription>
                        </div>
                        <Badge 
                          className={worker.status === 'running' 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          }
                        >
                          {worker.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Today:</span>
                            <div className="text-green-400 font-medium">{worker.dailyEarnings}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">This Month:</span>
                            <div className="text-purple-400 font-medium">{worker.monthlyEarnings}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Posts Today:</span>
                            <div className="text-cyan-400 font-medium">{worker.postsToday}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Next Post:</span>
                            <div className="text-orange-400 font-medium">{worker.nextPost}</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className={worker.status === 'running' 
                              ? "bg-orange-500 hover:bg-orange-600" 
                              : "bg-green-500 hover:bg-green-600"
                            }
                          >
                            {worker.status === 'running' ? (
                              <>
                                <Pause className="w-4 h-4 mr-1" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <Settings className="w-4 h-4 mr-1" />
                            Settings
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Stats
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Create New Worker */}
            <TabsContent value="create" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Worker Type Selection */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Choose Worker Type</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {workerTypes.map((type) => (
                      <Card 
                        key={type.id}
                        className={`cursor-pointer transition-all ${
                          selectedWorkerType === type.id
                            ? "bg-purple-500/20 border-purple-500" 
                            : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedWorkerType(type.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-700 rounded-lg">
                              {type.icon}
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">{type.name}</CardTitle>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="text-green-400">{type.earnings}</span>
                                <span className="text-gray-400">Setup: {type.setup}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-400">
                            {type.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Worker Configuration */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Configure Your Worker</h3>
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Worker Settings</CardTitle>
                      <CardDescription className="text-gray-400">
                        Customize your AI worker's behavior and schedule
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Worker Name
                        </label>
                        <Input
                          placeholder="e.g., Tech Blog Writer"
                          value={newWorkerConfig.name}
                          onChange={(e) => setNewWorkerConfig({...newWorkerConfig, name: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Content Topic/Niche
                        </label>
                        <Input
                          placeholder="e.g., AI technology, health tips, finance"
                          value={newWorkerConfig.topic}
                          onChange={(e) => setNewWorkerConfig({...newWorkerConfig, topic: e.target.value})}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Publishing Schedule
                        </label>
                        <Select value={newWorkerConfig.schedule} onValueChange={(value) => setNewWorkerConfig({...newWorkerConfig, schedule: value})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Every Hour</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="custom">Custom Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Target Platform
                        </label>
                        <Select value={newWorkerConfig.platform} onValueChange={(value) => setNewWorkerConfig({...newWorkerConfig, platform: value})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blog">Personal Blog</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter/X</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Writing Style
                        </label>
                        <Select value={newWorkerConfig.style} onValueChange={(value) => setNewWorkerConfig({...newWorkerConfig, style: value})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                            <SelectItem value="persuasive">Persuasive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        onClick={createWorker}
                        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Deploy AI Worker
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Analytics</CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your AI workers' earnings over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      📊 Revenue trends chart will display here
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Content Production</CardTitle>
                    <CardDescription className="text-gray-400">
                      Monitor content output and engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      📈 Content metrics chart will display here
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white">Top Performing Content</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your highest-earning content pieces this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <div className="text-white font-medium">"10 AI Tools That Will Replace Your Job"</div>
                          <div className="text-gray-400 text-sm">Medium • Tech Blog Writer</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">$340.50</div>
                          <div className="text-gray-400 text-sm">15.2k views</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <div className="text-white font-medium">"How I Built a $10k/Month AI Business"</div>
                          <div className="text-gray-400 text-sm">Instagram • Social Manager</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">$280.20</div>
                          <div className="text-gray-400 text-sm">8.7k likes</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <div className="text-white font-medium">"ChatGPT Prompts for Passive Income"</div>
                          <div className="text-gray-400 text-sm">YouTube • Video Producer</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">$520.80</div>
                          <div className="text-gray-400 text-sm">32.1k views</div>
                        </div>
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
    </div>
  );
}
