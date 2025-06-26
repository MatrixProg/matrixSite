import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  gradient?: "matrix" | "teal" | "purple" | "pink";
  disabled?: boolean;
}

export default function ToolCard({ 
  icon, 
  title, 
  description, 
  onClick, 
  gradient = "matrix",
  disabled = false 
}: ToolCardProps) {
  const gradientClasses = {
    matrix: "from-matrix to-cyber-teal",
    teal: "from-cyber-teal to-cyber-purple", 
    purple: "from-cyber-purple to-cyber-pink",
    pink: "from-cyber-pink to-matrix"
  };

  const borderClasses = {
    matrix: "border-matrix/20 hover:border-matrix/50",
    teal: "border-cyber-teal/20 hover:border-cyber-teal/50",
    purple: "border-cyber-purple/20 hover:border-cyber-purple/50",
    pink: "border-cyber-pink/20 hover:border-cyber-pink/50"
  };

  const textClasses = {
    matrix: "text-matrix hover:text-cyber-teal",
    teal: "text-cyber-teal hover:text-matrix",
    purple: "text-cyber-purple hover:text-matrix",
    pink: "text-cyber-pink hover:text-matrix"
  };

  return (
    <Card className={`bg-gradient-to-br from-gray-700 to-gray-800 border ${borderClasses[gradient]} transition-all group hover:shadow-lg ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <CardContent className="p-6">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradientClasses[gradient]} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Button
          variant="ghost"
          className={`${textClasses[gradient]} transition-colors font-semibold p-0 h-auto`}
          onClick={onClick}
          disabled={disabled}
        >
          {disabled ? "Coming Soon" : "Try Now"} <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
