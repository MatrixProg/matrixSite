import Header from "@/components/header";
import Footer from "@/components/footer";
import CodePlayground from "@/components/code-playground";
import JsonFormatter from "@/components/json-formatter";
import HashGenerator from "@/components/hash-generator";
import RegexTester from "@/components/regex-tester";
import Base64Encoder from "@/components/base64-encoder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Braces, Hash, Search, FileText } from "lucide-react";

export default function DeveloperTools() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text-matrix">
              Developer Toolkit
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Essential tools and utilities for developers and programmers
            </p>
          </div>

          <Tabs defaultValue="code-playground" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 bg-gray-800 border border-gray-700">
              <TabsTrigger value="code-playground" className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Playground</span>
              </TabsTrigger>
              <TabsTrigger value="json-formatter" className="flex items-center space-x-2">
                <Braces className="w-4 h-4" />
                <span className="hidden sm:inline">JSON</span>
              </TabsTrigger>
              <TabsTrigger value="hash-generator" className="flex items-center space-x-2">
                <Hash className="w-4 h-4" />
                <span className="hidden sm:inline">Hash</span>
              </TabsTrigger>
              <TabsTrigger value="regex-tester" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">RegEx</span>
              </TabsTrigger>
              <TabsTrigger value="base64-encoder" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Base64</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code-playground" className="mt-8">
              <CodePlayground />
            </TabsContent>

            <TabsContent value="json-formatter" className="mt-8">
              <JsonFormatter />
            </TabsContent>

            <TabsContent value="hash-generator" className="mt-8">
              <HashGenerator />
            </TabsContent>

            <TabsContent value="regex-tester" className="mt-8">
              <RegexTester />
            </TabsContent>

            <TabsContent value="base64-encoder" className="mt-8">
              <Base64Encoder />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
