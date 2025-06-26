import Header from "@/components/header";
import Footer from "@/components/footer";
import ThumbnailGenerator from "@/components/thumbnail-generator";
import LogoMaker from "@/components/logo-maker";
import QrGenerator from "@/components/qr-generator";
import ColorPalette from "@/components/color-palette";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Palette, QrCode, Paintbrush } from "lucide-react";

export default function CreatorTools() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text-cyber">
              Creator Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional tools designed for content creators and social media managers
            </p>
          </div>

          <Tabs defaultValue="thumbnail-generator" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-gray-800 border border-gray-700">
              <TabsTrigger value="thumbnail-generator" className="flex items-center space-x-2">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Thumbnails</span>
              </TabsTrigger>
              <TabsTrigger value="logo-maker" className="flex items-center space-x-2">
                <Paintbrush className="w-4 h-4" />
                <span className="hidden sm:inline">Logos</span>
              </TabsTrigger>
              <TabsTrigger value="qr-generator" className="flex items-center space-x-2">
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">QR Codes</span>
              </TabsTrigger>
              <TabsTrigger value="color-palette" className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Colors</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="thumbnail-generator" className="mt-8">
              <ThumbnailGenerator />
            </TabsContent>

            <TabsContent value="logo-maker" className="mt-8">
              <LogoMaker />
            </TabsContent>

            <TabsContent value="qr-generator" className="mt-8">
              <QrGenerator />
            </TabsContent>

            <TabsContent value="color-palette" className="mt-8">
              <ColorPalette />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
