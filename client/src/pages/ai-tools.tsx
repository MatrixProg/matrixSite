import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AiTextGenerator from "@/components/ai-text-generator";
import HashtagGenerator from "@/components/hashtag-generator";
import Translator from "@/components/translator";
import VoiceTools from "@/components/voice-tools";
import GrammarChecker from "@/components/grammar-checker";
import ContentIdeas from "@/components/content-ideas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Users, 
  Clock, 
  Play, 
  Settings, 
  Cpu,
  Network,
  Database,
  Code,
  Sparkles,
  Layers,
  GitBranch,
  Activity,
  BarChart3,
  Rocket,
  Shield,
  Globe,
  MessageSquare,
  FileText,
  Hash,
  Camera,
  Video,
  Mic,
  Plus,
  Search,
  Filter,
  Download,
  Share,
  Star,
  Bookmark,
  Eye,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function AiTools() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toolCategories = [
    {
      name: "Text & Content",
      tools: [
        { name: "AI Text Generator", description: "Generate high-quality text with AI", icon: <FileText className="w-5 h-5" />, component: "text-generator" },
        { name: "Grammar Checker", description: "Fix grammar and improve writing", icon: <MessageSquare className="w-5 h-5" />, component: "grammar-checker" },
        { name: "Content Ideas", description: "Generate creative content ideas", icon: <Sparkles className="w-5 h-5" />, component: "content-ideas" },
        { name: "Hashtag Generator", description: "Create trending hashtags", icon: <Hash className="w-5 h-5" />, component: "hashtag-generator" }
      ]
    },
    {
      name: "Language & Translation",
      tools: [
        { name: "Translator", description: "Translate text between languages", icon: <Globe className="w-5 h-5" />, component: "translator" },
        { name: "Voice Tools", description: "Text-to-speech and voice processing", icon: <Mic className="w-5 h-5" />, component: "voice-tools" }
      ]
    },
    {
      name: "Developer Tools",
      tools: [
        { name: "Code Generator", description: "AI-powered code generation", icon: <Code className="w-5 h-5" />, component: "code-generator" },
        { name: "API Designer", description: "Design REST APIs with AI", icon: <Database className="w-5 h-5" />, component: "api-designer" }
      ]
    }
  ];

  const [activeComponent, setActiveComponent] = useState("text-generator");

  const renderComponent = () => {
    switch (activeComponent) {
      case "text-generator":
        return <AiTextGenerator />;
      case "hashtag-generator":
        return <HashtagGenerator />;
      case "translator":
        return <Translator />;
      case "voice-tools":
        return <VoiceTools />;
      case "grammar-checker":
        return <GrammarChecker />;
      case "content-ideas":
        return <ContentIdeas />;
      default:
        return <AiTextGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Tools</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Powerful AI-driven tools to boost your productivity. Generate content, translate languages, and automate tasks with advanced artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Tool Categories</h3>
                <div className="space-y-6">
                  {toolCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h4>
                      <div className="space-y-1">
                        {category.tools.map((tool, toolIndex) => (
                          <button
                            key={toolIndex}
                            onClick={() => setActiveComponent(tool.component)}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${
                              activeComponent === tool.component 
                                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {tool.icon}
                              <span>{tool.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-200">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}