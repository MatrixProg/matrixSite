import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Braces, Copy, Download, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";

const SAMPLE_JSON = `{
  "user": {
    "id": 12345,
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "languages": ["en", "es", "fr"]
    },
    "metadata": {
      "created_at": "2024-01-15T10:30:00Z",
      "last_login": "2024-06-14T14:22:33Z",
      "subscription": {
        "plan": "premium",
        "expires": "2024-12-31T23:59:59Z"
      }
    }
  }
}`;

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [formattedJson, setFormattedJson] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const formatMutation = useMutation({
    mutationFn: ({ json, action }: { json: string; action: string }) =>
      api.formatJson(json, action),
    onSuccess: (data) => {
      setFormattedJson(data.result);
      setIsValid(data.isValid);
      setError(data.error || "");
      
      if (data.isValid) {
        toast({
          title: "JSON processed successfully!",
          description: `JSON has been ${data.action}ed.`,
        });
      } else {
        toast({
          title: "Invalid JSON",
          description: data.error || "Please check your JSON syntax.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Processing failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleFormat = (action: string) => {
    if (!jsonInput.trim()) {
      toast({
        title: "JSON required",
        description: "Please enter JSON data to process.",
        variant: "destructive",
      });
      return;
    }
    formatMutation.mutate({ json: jsonInput, action });
  };

  const copyResult = () => {
    navigator.clipboard.writeText(formattedJson);
    toast({
      title: "Copied to clipboard!",
      description: "Formatted JSON has been copied.",
    });
  };

  const downloadResult = () => {
    const blob = new Blob([formattedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "JSON file is being downloaded.",
    });
  };

  const resetJson = () => {
    setJsonInput(SAMPLE_JSON);
    setFormattedJson("");
    setIsValid(true);
    setError("");
    toast({
      title: "Reset complete",
      description: "JSON formatter has been reset.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Braces className="w-5 h-5 text-cyber-teal" />
            <span>JSON Formatter & Validator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Button 
              onClick={() => handleFormat("format")}
              disabled={formatMutation.isPending}
              className="bg-cyber-teal text-white hover:bg-cyber-teal/80"
            >
              <Braces className="w-4 h-4 mr-2" />
              Format
            </Button>
            <Button 
              onClick={() => handleFormat("minify")}
              disabled={formatMutation.isPending}
              variant="outline"
              className="border-gray-600"
            >
              Minify
            </Button>
            <Button 
              onClick={() => handleFormat("validate")}
              disabled={formatMutation.isPending}
              variant="outline"
              className="border-gray-600"
            >
              Validate
            </Button>
            <Button variant="outline" onClick={resetJson} className="border-gray-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Input JSON</label>
              <Textarea
                placeholder="Paste your JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="bg-gray-700 border-gray-600 h-80 font-mono text-sm"
              />
              <div className="text-right text-sm text-gray-400 mt-1">
                {jsonInput.length} characters
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Formatted JSON</label>
                <div className="flex items-center space-x-2">
                  {formattedJson && isValid && (
                    <>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Valid
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResult}
                        className="border-cyber-teal text-cyber-teal hover:bg-cyber-teal hover:text-white"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadResult}
                        className="border-cyber-teal text-cyber-teal hover:bg-cyber-teal hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {!isValid && error && (
                    <Badge variant="outline" className="border-red-500 text-red-500">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Invalid
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-700 border border-gray-600 rounded-lg h-80 overflow-y-auto">
                {formattedJson ? (
                  <pre className="p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    {formattedJson}
                  </pre>
                ) : (
                  <div className="p-4 text-gray-500 text-sm">
                    {formatMutation.isPending ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-cyber-teal border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing JSON...</span>
                      </div>
                    ) : (
                      "Formatted JSON will appear here"
                    )}
                  </div>
                )}
              </div>
              
              {error && !isValid && (
                <div className="mt-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium text-sm">JSON Error</p>
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
