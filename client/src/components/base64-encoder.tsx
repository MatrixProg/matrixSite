import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { FileText, Copy, RotateCcw, Upload, Download, AlertCircle } from "lucide-react";

export default function Base64Encoder() {
  const [encodeInput, setEncodeInput] = useState("Hello, MatrixProg! This text will be encoded to Base64.");
  const [decodeInput, setDecodeInput] = useState("SGVsbG8sIE1hdHJpeFByb2chIFRoaXMgdGV4dCB3aWxsIGJlIGVuY29kZWQgdG8gQmFzZTY0Lg==");
  const [encodeOutput, setEncodeOutput] = useState("");
  const [decodeOutput, setDecodeOutput] = useState("");
  const [encodeError, setEncodeError] = useState("");
  const [decodeError, setDecodeError] = useState("");
  const { toast } = useToast();

  const encodeMutation = useMutation({
    mutationFn: (text: string) => api.base64Process(text, "encode"),
    onSuccess: (data) => {
      if (data.success) {
        setEncodeOutput(data.result);
        setEncodeError("");
        toast({
          title: "Encoded successfully!",
          description: "Text has been converted to Base64.",
        });
      } else {
        setEncodeError(data.error || "Encoding failed");
        setEncodeOutput("");
        toast({
          title: "Encoding failed",
          description: data.error || "Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Encoding failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const decodeMutation = useMutation({
    mutationFn: (text: string) => api.base64Process(text, "decode"),
    onSuccess: (data) => {
      if (data.success) {
        setDecodeOutput(data.result);
        setDecodeError("");
        toast({
          title: "Decoded successfully!",
          description: "Base64 has been converted to text.",
        });
      } else {
        setDecodeError(data.error || "Decoding failed");
        setDecodeOutput("");
        toast({
          title: "Decoding failed",
          description: data.error || "Invalid Base64 input.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Decoding failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleEncode = () => {
    if (!encodeInput.trim()) {
      toast({
        title: "Text required",
        description: "Please enter text to encode.",
        variant: "destructive",
      });
      return;
    }
    encodeMutation.mutate(encodeInput);
  };

  const handleDecode = () => {
    if (!decodeInput.trim()) {
      toast({
        title: "Base64 required",
        description: "Please enter Base64 text to decode.",
        variant: "destructive",
      });
      return;
    }
    decodeMutation.mutate(decodeInput);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: `${type} has been copied.`,
    });
  };

  const resetFields = (type: "encode" | "decode") => {
    if (type === "encode") {
      setEncodeInput("");
      setEncodeOutput("");
      setEncodeError("");
    } else {
      setDecodeInput("");
      setDecodeOutput("");
      setDecodeError("");
    }
    toast({
      title: "Reset complete",
      description: `${type} fields have been cleared.`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "encode" | "decode") => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (type === "encode") {
        setEncodeInput(content);
      } else {
        setDecodeInput(content);
      }
      toast({
        title: "File loaded",
        description: `File content has been loaded for ${type}ing.`,
      });
    };
    reader.readAsText(file);
  };

  const downloadResult = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "File is being downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-matrix" />
            <span>Base64 Encoder/Decoder</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="encode" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Text to Encode</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id="encode-file"
                      className="hidden"
                      accept=".txt"
                      onChange={(e) => handleFileUpload(e, "encode")}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("encode-file")?.click()}
                      className="border-gray-600"
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetFields("encode")}
                      className="border-gray-600"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Enter text to encode to Base64..."
                  value={encodeInput}
                  onChange={(e) => setEncodeInput(e.target.value)}
                  className="bg-gray-700 border-gray-600 h-32"
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {encodeInput.length} characters
                </div>
              </div>

              <Button
                onClick={handleEncode}
                disabled={encodeMutation.isPending}
                className="w-full gradient-matrix text-gray-900 font-semibold"
              >
                {encodeMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Encoding...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Encode to Base64
                  </>
                )}
              </Button>

              {encodeOutput && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Base64 Output</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(encodeOutput, "Base64")}
                        className="border-matrix text-matrix hover:bg-matrix hover:text-gray-900"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadResult(encodeOutput, "encoded.txt")}
                        className="border-matrix text-matrix hover:bg-matrix hover:text-gray-900"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                    <p className="text-matrix font-mono text-sm break-all">{encodeOutput}</p>
                  </div>
                </div>
              )}

              {encodeError && (
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium text-sm">Encoding Error</p>
                      <p className="text-red-300 text-sm">{encodeError}</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="decode" className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Base64 to Decode</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id="decode-file"
                      className="hidden"
                      accept=".txt"
                      onChange={(e) => handleFileUpload(e, "decode")}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("decode-file")?.click()}
                      className="border-gray-600"
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetFields("decode")}
                      className="border-gray-600"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Enter Base64 text to decode..."
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                  className="bg-gray-700 border-gray-600 h-32 font-mono"
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {decodeInput.length} characters
                </div>
              </div>

              <Button
                onClick={handleDecode}
                disabled={decodeMutation.isPending}
                className="w-full bg-cyber-teal text-white font-semibold hover:bg-cyber-teal/80"
              >
                {decodeMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Decoding...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Decode from Base64
                  </>
                )}
              </Button>

              {decodeOutput && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Decoded Text</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(decodeOutput, "Decoded text")}
                        className="border-cyber-teal text-cyber-teal hover:bg-cyber-teal hover:text-white"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadResult(decodeOutput, "decoded.txt")}
                        className="border-cyber-teal text-cyber-teal hover:bg-cyber-teal hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                    <p className="text-cyber-teal text-sm whitespace-pre-wrap">{decodeOutput}</p>
                  </div>
                </div>
              )}

              {decodeError && (
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium text-sm">Decoding Error</p>
                      <p className="text-red-300 text-sm">{decodeError}</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
