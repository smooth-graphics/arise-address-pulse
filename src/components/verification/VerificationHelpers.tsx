import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfoFieldProps {
  label: string;
  value?: string;
  redacted?: boolean;
}

export const InfoField = ({ label, value, redacted = false }: InfoFieldProps) => {
  const [showFull, setShowFull] = useState(false);

  const maskData = (data?: string) => {
    if (!data) return "N/A";
    if (data.includes("@")) {
      // Email masking
      const [local, domain] = data.split("@");
      return `${local.slice(0, 3)}***@${domain}`;
    }
    if (data.startsWith("+234")) {
      // Phone masking
      return `${data.slice(0, 4)}****${data.slice(-4)}`;
    }
    // NIN or general masking
    return `${data.slice(0, 3)}***${data.slice(-3)}`;
  };

  if (!value) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">N/A</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <p className="font-medium text-foreground">
          {redacted && !showFull ? maskData(value) : value}
        </p>
        {redacted && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowFull(!showFull)}
            className="h-6 w-6 p-0"
          >
            {showFull ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export const EmptyResultsState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      <SearchX className="w-16 h-16 text-muted-foreground/40 mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-foreground">No Results Found</h2>
      <p className="text-muted-foreground mb-6">Please perform a search first</p>
      <Button onClick={() => navigate("/dashboard/search")}>Go to Search</Button>
    </div>
  );
};

export const getScoreBadgeStyle = (score: number) => {
  if (score >= 95) return "bg-green-100 text-green-700 border-green-300";
  if (score >= 80) return "bg-blue-100 text-blue-700 border-blue-300";
  if (score >= 60) return "bg-yellow-100 text-yellow-700 border-yellow-300";
  return "bg-red-100 text-red-700 border-red-300";
};
