import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Search, Copy, AlertCircle, CheckCircle, Target } from "lucide-react";

interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [testText, setTestText] = useState(`Contact us at:
support@matrixprog.com
admin@example.org
user123@test.net
Invalid: notanemail@
Also invalid: @missingdomain.com`);
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const testMutation = useMutation({
    mutationFn: ({ pattern, text, flags }: { pattern: string; text: string; flags: string }) =>
      api.testRegex(pattern, text, flags),
    onSuccess: (data) => {
      setMatches(data.matches || []);
      setIsValid(data.isValid);
      setError(data.error || "");
      
      if (data.isValid) {
        toast({
          title: "Regex tested successfully!",
          description: `Found ${data.matchCount} match${data.matchCount !== 1 ? 'es' : ''}.`,
        });
      } else {
        toast({
          title: "Invalid regex pattern",
          description: data.error || "Please check your regular expression syntax.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Regex test failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleTest = () => {
    if (!pattern.trim()) {
      toast({
        title: "Pattern required",
        description: "Please enter a regex pattern to test.",
        variant: "destructive",
      });
      return;
    }
    
    const flagString = Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag, _]) => flag)
      .join("");
    
    testMutation.mutate({ pattern, text: testText, flags: flagString });
  };

  const copyPattern = () => {
    navigator.clipboard.writeText(pattern);
    toast({
      title: "Copied to clipboard!",
      description: "Regex pattern has been copied.",
    });
  };

  const copyMatch = (match: string) => {
    navigator.clipboard.writeText(match);
    toast({
      title: "Copied to clipboard!",
      description: "Match has been copied.",
    });
  };

  const commonPatterns = [
    { name: "Email", pattern: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b" },
    { name: "Phone", pattern: "\\b\\d{3}-\\d{3}-\\d{4}\\b" },
    { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" },
    { name: "IP Address", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b" },
    { name: "Date (MM/DD/YYYY)", pattern: "\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d\\d\\b" },
    { name: "Hex Color", pattern: "#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})" },
  ];

  const highlightMatches = (text: string, matches: RegexMatch[]) => {
    if (!matches.length) return text;
    
    let highlightedText = text;
    const sortedMatches = [...matches].sort((a, b) => b.index - a.index);
    
    sortedMatches.forEach((match) => {
      const before = highlightedText.substring(0, match.index);
      const highlighted = `<mark class="bg-cyber-purple/30 text-cyber-purple">${match.match}</mark>`;
      const after = highlightedText.substring(match.index + match.match.length);
      highlightedText = before + highlighted + after;
    });
    
    return highlightedText;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-cyber-pink" />
            <span>Regular Expression Tester</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Regex Pattern</label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyPattern}
                className="border-gray-600"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            <Input
              placeholder="Enter your regular expression..."
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="bg-gray-700 border-gray-600 font-mono"
            />
            
            <div className="flex items-center space-x-4 mt-3">
              <span className="text-sm text-gray-400">Flags:</span>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-g"
                  checked={flags.g}
                  onCheckedChange={(checked) => setFlags(prev => ({ ...prev, g: !!checked }))}
                />
                <label htmlFor="flag-g" className="text-sm">g (global)</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-i"
                  checked={flags.i}
                  onCheckedChange={(checked) => setFlags(prev => ({ ...prev, i: !!checked }))}
                />
                <label htmlFor="flag-i" className="text-sm">i (ignore case)</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-m"
                  checked={flags.m}
                  onCheckedChange={(checked) => setFlags(prev => ({ ...prev, m: !!checked }))}
                />
                <label htmlFor="flag-m" className="text-sm">m (multiline)</label>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Test Text</label>
            <Textarea
              placeholder="Enter text to test against your regex..."
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="bg-gray-700 border-gray-600 h-32"
            />
          </div>

          <Button
            onClick={handleTest}
            disabled={testMutation.isPending}
            className="w-full bg-cyber-pink text-white font-semibold hover:bg-cyber-pink/80"
          >
            {testMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Testing Regex...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Test Regular Expression
              </>
            )}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Common Patterns</h4>
              <div className="space-y-2">
                {commonPatterns.map((item) => (
                  <Button
                    key={item.name}
                    variant="outline"
                    size="sm"
                    onClick={() => setPattern(item.pattern)}
                    className="w-full justify-start text-left border-gray-600 hover:border-cyber-pink"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Results</h4>
                {isValid !== undefined && (
                  <Badge variant="outline" className={isValid ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}>
                    {isValid ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                    {isValid ? "Valid" : "Invalid"}
                  </Badge>
                )}
              </div>
              
              {error && !isValid ? (
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium text-sm">Regex Error</p>
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              ) : matches.length > 0 ? (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">
                      Found <span className="text-cyber-pink font-semibold">{matches.length}</span> match{matches.length !== 1 ? 'es' : ''}
                    </p>
                    <div
                      className="text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: highlightMatches(testText, matches) }}
                    />
                  </div>
                  
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-cyber-pink font-mono text-sm">{match.match}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMatch(match.match)}
                            className="text-gray-400 hover:text-cyber-pink"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400">Index: {match.index}</p>
                        {match.groups.length > 0 && (
                          <p className="text-xs text-gray-400">Groups: {match.groups.join(", ")}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No matches found or test not run yet</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
