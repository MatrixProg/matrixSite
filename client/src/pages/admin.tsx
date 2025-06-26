import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Building2, 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Settings,
  Database,
  Globe,
  TrendingUp
} from "lucide-react";

interface AdminStats {
  totalGenerations: number;
  totalPosts: number;
  totalStartups: number;
  totalCourses: number;
  totalTemplates: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  authorId: number;
  author?: string;
  likes: number;
  status: string;
  createdAt: string;
}

interface Startup {
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

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  price: number;
  rating: number;
  createdAt: string;
}

export default function Admin() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Form states
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '', author: '' });
  const [newStartup, setNewStartup] = useState({
    name: '', description: '', category: '', funding: '', website: '', 
    founders: '', foundedYear: '', location: '', employees: '', valuation: ''
  });

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch all admin data
      const [statsRes, postsRes, startupsRes, coursesRes] = await Promise.all([
        fetch('/api/admin/stats?admin=true'),
        fetch('/api/admin/posts?admin=true'),
        fetch('/api/admin/startups?admin=true'),
        fetch('/api/admin/courses?admin=true')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (postsRes.ok) setPosts(await postsRes.json());
      if (startupsRes.ok) setStartups(await startupsRes.json());
      if (coursesRes.ok) setCourses(await coursesRes.json());

    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const createPost = async () => {
    try {
      const response = await fetch('/api/admin/posts?admin=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });

      if (response.ok) {
        setNewPost({ title: '', content: '', category: '', author: '' });
        await fetchAdminData();
        toast({
          title: "Success",
          description: "Post created successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive"
      });
    }
  };

  const createStartup = async () => {
    try {
      const response = await fetch('/api/admin/startups?admin=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStartup)
      });

      if (response.ok) {
        setNewStartup({
          name: '', description: '', category: '', funding: '', website: '', 
          founders: '', foundedYear: '', location: '', employees: '', valuation: ''
        });
        await fetchAdminData();
        toast({
          title: "Success",
          description: "Startup created successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create startup",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/posts/${id}?admin=true`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchAdminData();
        toast({
          title: "Success",
          description: "Post deleted successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  const updatePostStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/posts/${id}/status?admin=true`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        await fetchAdminData();
        toast({
          title: "Success",
          description: "Post status updated"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage your AI platform content and analytics</p>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">AI Generations</p>
                    <p className="text-2xl font-bold">{stats.totalGenerations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Community Posts</p>
                    <p className="text-2xl font-bold">{stats.totalPosts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">AI Startups</p>
                    <p className="text-2xl font-bold">{stats.totalStartups}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Courses</p>
                    <p className="text-2xl font-bold">{stats.totalCourses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Globe className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Templates</p>
                    <p className="text-2xl font-bold">{stats.totalTemplates}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="startups">Startups</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Platform Growing</p>
                        <p className="text-sm text-gray-600">Active users increased by 25%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Users className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">New Communities</p>
                        <p className="text-sm text-gray-600">3 new developer communities joined</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab("posts")}
                      className="flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Post</span>
                    </Button>
                    <Button
                      onClick={() => setActiveTab("startups")}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Startup</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Posts Management Tab */}
          <TabsContent value="posts" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Post title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Post content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={4}
                  />
                  <Select onValueChange={(value) => setNewPost({...newPost, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="ai-tools">AI Tools</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Author name"
                    value={newPost.author}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                  />
                  <Button onClick={createPost} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Manage Posts ({posts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {posts.map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{post.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{post.content.substring(0, 100)}...</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="outline">{post.category}</Badge>
                              <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status}
                              </Badge>
                              <span className="text-xs text-gray-500">{post.likes} likes</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updatePostStatus(post.id, post.status === 'published' ? 'draft' : 'published')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deletePost(post.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Startups Management Tab */}
          <TabsContent value="startups" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Add New Startup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Company name"
                    value={newStartup.name}
                    onChange={(e) => setNewStartup({...newStartup, name: e.target.value})}
                  />
                  <Textarea
                    placeholder="Description"
                    value={newStartup.description}
                    onChange={(e) => setNewStartup({...newStartup, description: e.target.value})}
                    rows={3}
                  />
                  <Select onValueChange={(value) => setNewStartup({...newStartup, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                      <SelectItem value="Computer Vision">Computer Vision</SelectItem>
                      <SelectItem value="Natural Language Processing">NLP</SelectItem>
                      <SelectItem value="Robotics">Robotics</SelectItem>
                      <SelectItem value="Healthcare AI">Healthcare AI</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Funding (e.g., $10M Series A)"
                    value={newStartup.funding}
                    onChange={(e) => setNewStartup({...newStartup, funding: e.target.value})}
                  />
                  <Input
                    placeholder="Website URL"
                    value={newStartup.website}
                    onChange={(e) => setNewStartup({...newStartup, website: e.target.value})}
                  />
                  <Input
                    placeholder="Founders"
                    value={newStartup.founders}
                    onChange={(e) => setNewStartup({...newStartup, founders: e.target.value})}
                  />
                  <Input
                    placeholder="Location"
                    value={newStartup.location}
                    onChange={(e) => setNewStartup({...newStartup, location: e.target.value})}
                  />
                  <Button onClick={createStartup} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Startup
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Manage Startups ({startups.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {startups.slice(0, 10).map((startup) => (
                      <div key={startup.id} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {startup.logo ? (
                              <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain rounded-lg" />
                            ) : (
                              <Building2 className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{startup.name}</h4>
                            <p className="text-sm text-gray-600">{startup.description.substring(0, 80)}...</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>{startup.category}</span>
                              <span>{startup.funding}</span>
                              <span>{startup.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Course management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}