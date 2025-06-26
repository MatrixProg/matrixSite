import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Paintbrush, Download, RotateCcw, Palette, Type, Shapes } from "lucide-react";

export default function LogoMaker() {
  const [brandName, setBrandName] = useState("MatrixProg");
  const [tagline, setTagline] = useState("AI Powered");
  const [logoStyle, setLogoStyle] = useState("modern");
  const [shape, setShape] = useState("circle");
  const [primaryColor, setPrimaryColor] = useState("#00ff41");
  const [secondaryColor, setSecondaryColor] = useState("#0d7377");
  const [textColor, setTextColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#1a1a1a");
  const [logoSize, setLogoSize] = useState([200]);
  const { toast } = useToast();

  const logoStyles = [
    { id: "modern", name: "Modern", description: "Clean and contemporary" },
    { id: "tech", name: "Tech", description: "Futuristic and digital" },
    { id: "creative", name: "Creative", description: "Artistic and unique" },
    { id: "corporate", name: "Corporate", description: "Professional and trustworthy" },
    { id: "startup", name: "Startup", description: "Fresh and innovative" },
  ];

  const shapes = [
    { id: "circle", name: "Circle" },
    { id: "square", name: "Square" },
    { id: "hexagon", name: "Hexagon" },
    { id: "diamond", name: "Diamond" },
    { id: "shield", name: "Shield" },
  ];

  const generateLogo = () => {
    const size = logoSize[0];
    const centerX = size / 2;
    const centerY = size / 2;

    // Generate shape path based on selection
    const getShapePath = () => {
      switch (shape) {
        case "circle":
          return `<circle cx="${centerX}" cy="${centerY}" r="${size * 0.35}" fill="url(#logoGradient)" stroke="${textColor}" stroke-width="2"/>`;
        case "square":
          const squareSize = size * 0.6;
          const squareStart = (size - squareSize) / 2;
          return `<rect x="${squareStart}" y="${squareStart}" width="${squareSize}" height="${squareSize}" fill="url(#logoGradient)" stroke="${textColor}" stroke-width="2" rx="8"/>`;
        case "hexagon":
          const hexRadius = size * 0.35;
          const hexPoints = Array.from({ length: 6 }, (_, i) => {
            const angle = (i * Math.PI) / 3;
            const x = centerX + hexRadius * Math.cos(angle);
            const y = centerY + hexRadius * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');
          return `<polygon points="${hexPoints}" fill="url(#logoGradient)" stroke="${textColor}" stroke-width="2"/>`;
        case "diamond":
          return `<polygon points="${centerX},${centerY - size * 0.35} ${centerX + size * 0.35},${centerY} ${centerX},${centerY + size * 0.35} ${centerX - size * 0.35},${centerY}" fill="url(#logoGradient)" stroke="${textColor}" stroke-width="2"/>`;
        case "shield":
          return `<path d="M ${centerX} ${centerY - size * 0.35} Q ${centerX + size * 0.25} ${centerY - size * 0.3} ${centerX + size * 0.3} ${centerY} Q ${centerX + size * 0.25} ${centerY + size * 0.3} ${centerX} ${centerY + size * 0.4} Q ${centerX - size * 0.25} ${centerY + size * 0.3} ${centerX - size * 0.3} ${centerY} Q ${centerX - size * 0.25} ${centerY - size * 0.3} ${centerX} ${centerY - size * 0.35} Z" fill="url(#logoGradient)" stroke="${textColor}" stroke-width="2"/>`;
        default:
          return `<circle cx="${centerX}" cy="${centerY}" r="${size * 0.35}" fill="url(#logoGradient)" stroke="${textColor}" stroke-width="2"/>`;
      }
    };

    // Generate icon based on style
    const getIconContent = () => {
      switch (logoStyle) {
        case "tech":
          return `
            <rect x="${centerX - 15}" y="${centerY - 15}" width="30" height="30" fill="none" stroke="${textColor}" stroke-width="2" rx="4"/>
            <circle cx="${centerX - 8}" cy="${centerY - 8}" r="2" fill="${textColor}"/>
            <circle cx="${centerX + 8}" cy="${centerY - 8}" r="2" fill="${textColor}"/>
            <circle cx="${centerX}" cy="${centerY + 8}" r="2" fill="${textColor}"/>
            <line x1="${centerX - 8}" y1="${centerY - 6}" x2="${centerX}" y2="${centerY + 6}" stroke="${textColor}" stroke-width="1"/>
            <line x1="${centerX + 8}" y1="${centerY - 6}" x2="${centerX}" y2="${centerY + 6}" stroke="${textColor}" stroke-width="1"/>
          `;
        case "creative":
          return `
            <path d="M ${centerX - 12} ${centerY} Q ${centerX - 8} ${centerY - 12} ${centerX} ${centerY - 8} Q ${centerX + 8} ${centerY - 12} ${centerX + 12} ${centerY} Q ${centerX + 8} ${centerY + 12} ${centerX} ${centerY + 8} Q ${centerX - 8} ${centerY + 12} ${centerX - 12} ${centerY}" fill="none" stroke="${textColor}" stroke-width="2"/>
            <circle cx="${centerX}" cy="${centerY}" r="3" fill="${textColor}"/>
          `;
        case "corporate":
          return `
            <rect x="${centerX - 10}" y="${centerY - 10}" width="20" height="20" fill="none" stroke="${textColor}" stroke-width="2"/>
            <rect x="${centerX - 6}" y="${centerY - 6}" width="12" height="12" fill="${textColor}"/>
          `;
        case "startup":
          return `
            <path d="M ${centerX} ${centerY - 12} L ${centerX + 8} ${centerY + 4} L ${centerX - 8} ${centerY + 4} Z" fill="none" stroke="${textColor}" stroke-width="2"/>
            <circle cx="${centerX}" cy="${centerY + 8}" r="2" fill="${textColor}"/>
          `;
        default:
          return `
            <text x="${centerX}" y="${centerY + 3}" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="${textColor}">
              ${brandName.charAt(0).toUpperCase()}
            </text>
          `;
      }
    };

    const svgContent = `
      <svg width="${size}" height="${size + 80}" viewBox="0 0 ${size} ${size + 80}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor}" />
            <stop offset="100%" style="stop-color:${secondaryColor}" />
          </linearGradient>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="100%" height="100%" fill="${backgroundColor}" rx="8"/>
        
        <!-- Logo Shape -->
        ${getShapePath()}
        
        <!-- Icon Content -->
        <g filter="url(#logoGlow)">
          ${getIconContent()}
        </g>
        
        <!-- Brand Name -->
        <text x="${centerX}" y="${size + 25}" 
              text-anchor="middle" 
              font-family="Arial, sans-serif" 
              font-size="16" 
              font-weight="bold" 
              fill="${textColor}">
          ${brandName}
        </text>
        
        <!-- Tagline -->
        ${tagline ? `
          <text x="${centerX}" y="${size + 45}" 
                text-anchor="middle" 
                font-family="Arial, sans-serif" 
                font-size="10" 
                fill="${textColor}cc">
            ${tagline}
          </text>
        ` : ''}
      </svg>
    `;

    return svgContent;
  };

  const downloadLogo = () => {
    const svgContent = generateLogo();
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${brandName.toLowerCase().replace(/\s+/g, '_')}_logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Logo downloaded!",
      description: "Your custom logo has been saved as SVG.",
    });
  };

  const resetSettings = () => {
    setBrandName("MatrixProg");
    setTagline("AI Powered");
    setLogoStyle("modern");
    setShape("circle");
    setPrimaryColor("#00ff41");
    setSecondaryColor("#0d7377");
    setTextColor("#ffffff");
    setBackgroundColor("#1a1a1a");
    setLogoSize([200]);
    
    toast({
      title: "Settings reset",
      description: "All logo settings have been reset to defaults.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Paintbrush className="w-5 h-5 text-cyber-purple" />
            <span>AI Logo Maker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Brand Name</label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="Enter brand name..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tagline (Optional)</label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="Enter tagline..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Logo Style</label>
              <Select value={logoStyle} onValueChange={setLogoStyle}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {logoStyles.map((style) => (
                    <SelectItem key={style.id} value={style.id}>
                      <div>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-xs text-gray-400">{style.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Shape</label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shapes.map((shapeOption) => (
                    <SelectItem key={shapeOption.id} value={shapeOption.id}>
                      {shapeOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block flex items-center">
              <Shapes className="w-4 h-4 mr-2" />
              Logo Size: {logoSize[0]}px
            </label>
            <Slider
              value={logoSize}
              onValueChange={setLogoSize}
              max={300}
              min={100}
              step={10}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Secondary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Background</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={downloadLogo}
              className="flex-1 bg-cyber-purple text-white hover:bg-cyber-purple/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Logo
            </Button>
            <Button
              onClick={resetSettings}
              variant="outline"
              className="border-gray-600"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-700 rounded-lg p-8 flex items-center justify-center min-h-80">
            <div
              className="max-w-full max-h-full"
              dangerouslySetInnerHTML={{ __html: generateLogo() }}
            />
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            Preview of your logo ({logoSize[0]}px)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
