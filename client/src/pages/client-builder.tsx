import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Layout, 
  Smartphone, 
  Monitor, 
  Tablet,
  Download,
  Play,
  Save,
  Share,
  Settings,
  Plus,
  Grid,
  MessageSquare,
  Users,
  Video,
  Phone,
  Calendar,
  Files,
  Bell,
  Search,
  Menu,
  Eye,
  Code,
  Palette,
  Layers
} from "lucide-react";

export default function ClientBuilder() {
  const [selectedPlatform, setSelectedPlatform] = useState("web");
  const [selectedTemplate, setSelectedTemplate] = useState("modern-chat");
  const [projectName, setProjectName] = useState("My Matrix Client");

  const platforms = [
    { id: "web", name: "Web App", icon: <Monitor className="w-5 h-5" />, description: "Progressive Web App" },
    { id: "mobile", name: "Mobile", icon: <Smartphone className="w-5 h-5" />, description: "iOS & Android" },
    { id: "desktop", name: "Desktop", icon: <Tablet className="w-5 h-5" />, description: "Electron App" }
  ];

  const templates = [
    {
      id: "modern-chat",
      name: "Modern Chat",
      description: "Clean, minimalist chat interface",
      preview: "/api/placeholder/400/250",
      features: ["Real-time messaging", "File sharing", "Emoji reactions", "Dark/Light theme"]
    },
    {
      id: "corporate",
      name: "Corporate Suite",
      description: "Professional team collaboration",
      preview: "/api/placeholder/400/250",
      features: ["Video conferencing", "Screen sharing", "Document collaboration", "Admin controls"]
    },
    {
      id: "gaming",
      name: "Gaming Community",
      description: "Discord-style gaming client",
      preview: "/api/placeholder/400/250",
      features: ["Voice channels", "Game integration", "Server discovery", "Rich presence"]
    }
  ];

  const components = [
    { id: "chat", name: "Chat Room", icon: <MessageSquare className="w-4 h-4" />, category: "Communication" },
    { id: "users", name: "User List", icon: <Users className="w-4 h-4" />, category: "Social" },
    { id: "video", name: "Video Call", icon: <Video className="w-4 h-4" />, category: "Communication" },
    { id: "voice", name: "Voice Channel", icon: <Phone className="w-4 h-4" />, category: "Communication" },
    { id: "calendar", name: "Calendar", icon: <Calendar className="w-4 h-4" />, category: "Productivity" },
    { id: "files", name: "File Browser", icon: <Files className="w-4 h-4" />, category: "Productivity" },
    { id: "notifications", name: "Notifications", icon: <Bell className="w-4 h-4" />, category: "System" },
    { id: "search", name: "Search Bar", icon: <Search className="w-4 h-4" />, category: "Navigation" },
    { id: "sidebar", name: "Sidebar Menu", icon: <Menu className="w-4 h-4" />, category: "Navigation" }
  ];

  const canvasComponents = [
    { id: 1, type: "chat", x: 200, y: 100, width: 400, height: 300 },
    { id: 2, type: "users", x: 620, y: 100, width: 200, height: 300 },
    { id: 3, type: "sidebar", x: 50, y: 100, width: 120, height: 300 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex h-screen">
        {/* Left Panel - Components & Settings */}
        <div className="w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-mono">CLIENT BUILDER</h1>
                <p className="text-gray-400 text-sm">Drag & Drop Interface</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Project Name</label>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white font-mono"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Platform</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        <div className="flex items-center space-x-2">
                          {platform.icon}
                          <span>{platform.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="components" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-gray-700 m-4">
              <TabsTrigger value="components" className="font-mono">Components</TabsTrigger>
              <TabsTrigger value="templates" className="font-mono">Templates</TabsTrigger>
              <TabsTrigger value="settings" className="font-mono">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="components" className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                {["Communication", "Social", "Productivity", "System", "Navigation"].map((category) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-gray-400 mb-2 font-mono">{category}</h3>
                    <div className="space-y-2">
                      {components.filter(comp => comp.category === category).map((component) => (
                        <div
                          key={component.id}
                          className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-cyan-500/50 cursor-pointer transition-colors"
                          draggable
                        >
                          <div className="w-8 h-8 bg-cyan-500/20 rounded flex items-center justify-center text-cyan-400">
                            {component.icon}
                          </div>
                          <span className="text-sm text-gray-300">{component.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer transition-colors ${
                      selectedTemplate === template.id ? 
                      'bg-cyan-500/20 border-cyan-500/50' : 
                      'bg-gray-700/50 border-gray-600 hover:border-cyan-500/50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-white font-mono">{template.name}</CardTitle>
                      <CardDescription className="text-xs text-gray-400">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-600 rounded mb-3 flex items-center justify-center">
                        <span className="text-gray-400 text-xs font-mono">PREVIEW</span>
                      </div>
                      <div className="space-y-1">
                        {template.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-400">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="flex-1 px-4 pb-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400 font-mono">Appearance</h3>
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300">
                    <Palette className="w-4 h-4 mr-2" />
                    Theme Colors
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300">
                    <Layers className="w-4 h-4 mr-2" />
                    Layout Options
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400 font-mono">Features</h3>
                  <div className="space-y-2">
                    {["Real-time Sync", "Push Notifications", "File Upload", "Voice Chat", "Video Calls"].map((feature) => (
                      <div key={feature} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{feature}</span>
                        <div className="w-8 h-4 bg-cyan-500 rounded-full flex items-center">
                          <div className="w-3 h-3 bg-white rounded-full ml-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="h-16 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 font-mono">
                <Eye className="w-4 h-4 mr-2" />
                PREVIEW
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 font-mono">
                <Code className="w-4 h-4 mr-2" />
                CODE
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Save className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Share className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-black font-mono">
                <Download className="w-4 h-4 mr-2" />
                EXPORT
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-900 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Device Frame */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className={`relative bg-gray-800 border-2 border-gray-600 rounded-lg shadow-2xl ${
                selectedPlatform === 'mobile' ? 'w-80 h-[600px]' :
                selectedPlatform === 'desktop' ? 'w-[900px] h-[600px]' :
                'w-[800px] h-[500px]'
              }`}>
                {/* Device Header */}
                <div className="h-12 bg-gray-700 border-b border-gray-600 flex items-center justify-between px-4 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{projectName}</span>
                  <div className="w-16"></div>
                </div>

                {/* Canvas Content Area */}
                <div className="relative w-full h-[calc(100%-3rem)] bg-gray-900 rounded-b-lg overflow-hidden">
                  {/* Drop Zone Indicator */}
                  <div className="absolute inset-4 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center opacity-50">
                    <div className="text-center">
                      <Grid className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-500 font-mono text-sm">DRAG COMPONENTS HERE</p>
                    </div>
                  </div>

                  {/* Placed Components */}
                  {canvasComponents.map((component) => (
                    <div
                      key={component.id}
                      className="absolute bg-cyan-500/20 border border-cyan-500/50 rounded-lg flex items-center justify-center cursor-move"
                      style={{
                        left: component.x,
                        top: component.y,
                        width: component.width,
                        height: component.height
                      }}
                    >
                      <div className="text-center">
                        {component.type === 'chat' && <MessageSquare className="w-8 h-8 text-cyan-400 mx-auto mb-2" />}
                        {component.type === 'users' && <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />}
                        {component.type === 'sidebar' && <Menu className="w-8 h-8 text-cyan-400 mx-auto mb-2" />}
                        <span className="text-xs text-cyan-400 font-mono">
                          {component.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-64 bg-gray-800/50 border-l border-gray-700 p-4">
          <h3 className="text-lg font-bold text-white mb-4 font-mono">PROPERTIES</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Component</label>
              <div className="p-3 bg-gray-700/50 rounded border border-gray-600">
                <span className="text-sm text-gray-400 font-mono">Select a component</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Position</label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="X" className="bg-gray-700 border-gray-600 text-white text-sm" />
                <Input placeholder="Y" className="bg-gray-700 border-gray-600 text-white text-sm" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Size</label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Width" className="bg-gray-700 border-gray-600 text-white text-sm" />
                <Input placeholder="Height" className="bg-gray-700 border-gray-600 text-white text-sm" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Style</label>
              <Select>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="bordered">Bordered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-300 mb-3 font-mono">LAYERS</h4>
            <div className="space-y-2">
              {canvasComponents.map((component) => (
                <div key={component.id} className="flex items-center justify-between p-2 bg-gray-700/50 rounded text-sm">
                  <span className="text-gray-300 font-mono">{component.type}</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}