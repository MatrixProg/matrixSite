import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Hash, Copy, Shield, Eye, EyeOff } from "lucide-react";

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("sha256");
  const [hash, setHash] = useState("");
  const [showText, setShowText] = useState(true);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: ({ text, algorithm }: { text: string; algorithm: string }) =>
      api.generateHash(text, algorithm),
    onSuccess: (data) => {
      setHash(data.hash);
      toast({
        title: "Hash generated successfully!",
        description: `${algorithm.toUpperCase()} hash has been created.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hash generation failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!text.trim()) {
      toast({
        title: "Text required",
        description: "Please enter text to generate a hash.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate({ text, algorithm });
  };

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Copied to clipboard!",
      description: "Hash has been copied to your clipboard.",
    });
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Original text has been copied.",
    });
  };

  const algorithms = [
    { value: "md5", label: "MD5", description: "128-bit hash (not cryptographically secure)" },
    { value: "sha1", label: "SHA-1", description: "160-bit hash (deprecated for security)" },
    { value: "sha256", label: "SHA-256", description: "256-bit hash (recommended)" },
    { value: "sha512", label: "SHA-512", description: "512-bit hash (most secure)" },
  ];

  const selectedAlgorithm = algorithms.find(a => a.value === algorithm);

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Hash className="w-5 h-5 text-cyber-purple" />
            <span>Hash Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Hash Algorithm</label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {algorithms.map((algo) => (
                  <SelectItem key={algo.value} value={algo.value}>
                    <div>
                      <div className="font-medium">{algo.label}</div>
                      <div className="text-xs text-gray-400">{algo.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedAlgorithm && (
              <p className="text-sm text-gray-400 mt-1">{selectedAlgorithm.description}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Input Text</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowText(!showText)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  {showText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showText ? "Hide" : "Show"}
                </Button>
                {text && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyText}
                    className="border-gray-600 text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
            </div>
            <Textarea
              placeholder="Enter text to hash..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              type={showText ? "text" : "password"}
              className="bg-gray-700 border-gray-600 h-24"
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              {text.length} characters
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="w-full bg-cyber-purple text-white font-semibold hover:bg-cyber-purple/80"
          >
            {generateMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Hash...
              </>
            ) : (
              <>
                <Hash className="mr-2 h-4 w-4" />
                Generate {algorithm.toUpperCase()} Hash
              </>
            )}
          </Button>

          {hash && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Generated Hash</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyHash}
                  className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Hash
                </Button>
              </div>
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-cyber-purple mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-2">{algorithm.toUpperCase()} Hash:</p>
                    <p className="text-cyber-purple font-mono text-sm break-all">{hash}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium text-sm">Security Note</p>
                    <p className="text-blue-300 text-sm">
                      {algorithm === "md5" && "MD5 is not cryptographically secure. Use for checksums only."}
                      {algorithm === "sha1" && "SHA-1 is deprecated for security applications. Consider SHA-256 or SHA-512."}
                      {algorithm === "sha256" && "SHA-256 is cryptographically secure and recommended for most applications."}
                      {algorithm === "sha512" && "SHA-512 provides the highest security level for cryptographic applications."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
