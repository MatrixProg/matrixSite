import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { 
  Users, 
  Download, 
  Heart, 
  Star, 
  TrendingUp, 
  Award, 
  Calendar,
  MessageCircle,
  Brain,
  Network,
  Zap,
  Globe,
  Code,
  Rocket,
  Sparkles,
  Search,
  Filter,
  Eye,
  Share,
  Bookmark,
  GitBranch,
  Activity,
  Trophy,
  Crown,
  Cpu,
  Database,
  Shield,
  ArrowUp,
  MessageSquare,
  UserPlus,
  Settings,
  Bell,
  Plus,
  ChevronRight,
  Hash,
  Clock,
  Target,
  Layers,
  PieChart
} from "lucide-react";

export default function Community() {
  const [selectedTab, setSelectedTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    author: ""
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const projects = [
    {
      id: 1,
      name: "AI Chatbot Template",
      description: "A comprehensive chatbot built with OpenAI GPT-4, featuring memory and context awareness",
      author: "sarah_dev",
      category: "Natural Language",
      stars: 1290,
      forks: 234,
      language: "Python",
      lastUpdate: "2 hours ago",
      trending: true,
      tags: ["chatbot", "openai", "python"]
    },
    {
      id: 2,
      name: "Computer Vision App",
      description: "Real-time object detection using YOLO and OpenCV for mobile applications",
      author: "vision_expert",
      category: "Computer Vision",
      stars: 856,
      forks: 167,
      language: "JavaScript",
      lastUpdate: "5 hours ago",
      trending: true,
      tags: ["opencv", "yolo", "detection"]
    },
    {
      id: 3,
      name: "Text Analysis Tool",
      description: "Sentiment analysis and text classification using transformer models",
      author: "ml_researcher",
      category: "Text Processing",
      stars: 642,
      forks: 98,
      language: "Python",
      lastUpdate: "1 day ago",
      trending: false,
      tags: ["nlp", "sentiment", "transformers"]
    }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best practices for fine-tuning large language models",
      author: "alex_ml",
      replies: 23,
      views: 1200,
      lastReply: "2 hours ago",
      category: "Machine Learning",
      tags: ["llm", "fine-tuning", "best-practices"]
    },
    {
      id: 2,
      title: "How to optimize model inference for production",
      author: "prod_engineer",
      replies: 15,
      views: 800,
      lastReply: "4 hours ago",
      category: "Deployment",
      tags: ["optimization", "production", "inference"]
    },
    {
      id: 3,
      title: "Comparing different computer vision frameworks",
      author: "cv_dev",
      replies: 31,
      views: 1500,
      lastReply: "6 hours ago",
      category: "Computer Vision",
      tags: ["opencv", "tensorflow", "pytorch"]
    }
  ];

  // Fetch community posts
  const { data: communityPosts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['community-posts'],
    queryFn: () => api.getCommunityPosts()
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: typeof newPost) => {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      setIsCreatePostOpen(false);
      setNewPost({ title: "", content: "", category: "", author: "" });
      toast({
        title: "Success!",
        description: "Your post has been published to the community.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Like post mutation
  const likePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to like post');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content || !newPost.category || !newPost.author) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    createPostMutation.mutate(newPost);
  };

  const categories = [
    "AI Tools", "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
    "Data Science", "Automation", "Robotics", "Education", "Business",
    "Language Models", "MLOps", "Developer Tools", "Hardware", "Speech AI",
    "Content Generation", "Productivity", "Research", "Startups", "Projects"
  ];

  const topUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "sarah_dev",
      bio: "ML Engineer at TechCorp",
      contributions: 127,
      followers: 2340,
      avatar: "👩‍💻"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      username: "alex_ml",
      bio: "AI Research Scientist",
      contributions: 89,
      followers: 1890,
      avatar: "👨‍🔬"
    },
    {
      id: 3,
      name: "Maya Patel",
      username: "vision_expert", 
      bio: "Computer Vision Specialist",
      contributions: 156,
      followers: 3210,
      avatar: "👩‍🚀"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Connect with AI developers worldwide. Share your projects, ask questions, and collaborate on the future of artificial intelligence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600 mb-1">2.5K</div>
                <div className="text-gray-600 text-sm">Active Projects</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600 mb-1">15K</div>
                <div className="text-gray-600 text-sm">Developers</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600 mb-1">850</div>
                <div className="text-gray-600 text-sm">Discussions</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600 mb-1">5.2K</div>
                <div className="text-gray-600 text-sm">Code Commits</div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
              <TabsTrigger value="discussions" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Community Posts</span>
              </TabsTrigger>
              <TabsTrigger value="developers" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Top Contributors</span>
              </TabsTrigger>
            </TabsList>

            

            <TabsContent value="discussions" className="mt-6">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search community posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Community Post</DialogTitle>
                      <DialogDescription>
                        Share your knowledge, ask questions, or start a discussion with the AI community.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="author">Your Name</Label>
                        <Input
                          id="author"
                          value={newPost.author}
                          onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                          id="title"
                          value={newPost.title}
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          placeholder="Enter a descriptive title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={newPost.content}
                          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                          placeholder="Write your post content here..."
                          rows={8}
                        />
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button onClick={handleCreatePost} disabled={createPostMutation.isPending}>
                          {createPostMutation.isPending ? "Publishing..." : "Publish Post"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {postsLoading ? (
                <div className="text-center py-8">Loading community posts...</div>
              ) : (
                <div className="space-y-4">
                  {communityPosts
                    .filter(post => 
                      !searchQuery || 
                      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((post: any) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-blue-600 hover:underline cursor-pointer mb-2">
                              {post.title}
                            </CardTitle>
                            <p className="text-gray-600 mb-3">{post.content.substring(0, 200)}...</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                              <span>by {post.author || 'Anonymous'}</span>
                              <Badge variant="outline">{post.category}</Badge>
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => likePostMutation.mutate(post.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                {post.likes || 0}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                  {communityPosts.length === 0 && (
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                      <p className="text-gray-600 mb-4">Be the first to share something with the community!</p>
                      <Button onClick={() => setIsCreatePostOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Post
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="developers" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topUsers.map((user) => (
                  <Card key={user.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{user.avatar}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{user.name}</CardTitle>
                          <p className="text-gray-500 text-sm">@{user.username}</p>
                          <p className="text-gray-600 text-sm mt-1">{user.bio}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="text-gray-500">
                          <span className="font-medium text-blue-600">{user.contributions}</span> contributions
                        </div>
                        <div className="text-gray-500">
                          <span className="font-medium text-blue-600">{user.followers.toLocaleString()}</span> followers
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}