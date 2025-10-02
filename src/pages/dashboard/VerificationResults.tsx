import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, UserRoundSearch, Lock, CircleCheckBig } from "lucide-react";
import { VerificationMatch, VerificationSearchResult } from "@/types/dashboard";
import { DetailedReportView } from "@/components/verification/DetailedReportView";
import { EmptyResultsState, getScoreBadgeStyle } from "@/components/verification/VerificationHelpers";

export default function VerificationResults() {
  const location = useLocation();
  const [selectedMatch, setSelectedMatch] = useState<VerificationMatch | null>(null);
  const searchResults = location.state?.searchResults as VerificationSearchResult;

  // If no data, show empty state
  if (!searchResults) {
    return <EmptyResultsState />;
  }

  // Two views: List view or Detail view
  if (selectedMatch) {
    return <DetailedReportView match={selectedMatch} onBack={() => setSelectedMatch(null)} />;
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      <div className="w-full bg-card lg:rounded-tl-xl min-h-screen lg:min-h-0 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4.5 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Verify Identity
          </h1>

          <div className="flex items-center gap-4">
            {/* Verify Button */}
            <button className="flex items-center gap-1.5 px-3 py-1 bg-orange-primary text-white text-sm font-medium rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/90 transition-colors">
              Verify
              <UserRoundSearch className="w-4 h-4" strokeWidth={1.2} />
            </button>

            {/* Notifications */}
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Search Form Display */}
        <div className="flex justify-center px-4 py-6">
          <div className="w-full max-w-4xl">
            <div className="bg-card border border-border rounded-2xl shadow-md overflow-hidden p-1">
              <div className="flex flex-col md:flex-row">
                {/* Name Section */}
                <div className="flex-1 px-5 py-3">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Enter full name
                  </label>
                  <div className="text-base text-foreground font-normal">
                    {searchResults.query.fullName}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-border my-2 hidden md:block"></div>
                <div className="h-px bg-border mx-2 md:hidden"></div>

                {/* Address Section */}
                <div className="flex-1 px-5 py-3">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Enter full address
                  </label>
                  <div className="text-base text-foreground font-normal">
                    {searchResults.query.fullAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="px-4 pb-8">
          <div className="w-full max-w-4xl mx-auto space-y-5">
            {/* Results Header */}
            <div className="text-base font-medium text-muted-foreground italic">
              We found <span className="text-orange-primary font-semibold">{searchResults.totalMatches}</span> results
              for "
              <span className="text-orange-primary font-semibold">
                {searchResults.query.fullName}, {searchResults.query.fullAddress}
              </span>
              "
            </div>

            {/* Results Cards */}
            <div className="space-y-4">
              {searchResults.matches.map((match) => (
                <div
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className="bg-card rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between min-h-[80px] shadow-sm border border-border hover:shadow-lg hover:border-orange-200 cursor-pointer transition-all duration-200"
                >
                  <div className="flex-1 mb-3 md:mb-0">
                    <div className="text-lg font-semibold text-foreground mb-1">
                      {match.fullName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {match.address}
                    </div>
                  </div>

                  {/* Confidence Score Badge */}
                  <div
                    className={`
                    flex items-center gap-3 px-4 py-2 rounded-full border
                    ${getScoreBadgeStyle(match.confidenceScore)}
                  `}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold leading-none">
                        {match.confidenceScore}%
                      </div>
                      <div className="text-xs mt-0.5 opacity-80">
                        {match.matchType} match
                      </div>
                    </div>
                    <CircleCheckBig
                      className="w-5 h-5"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pb-6 w-full max-w-xs mx-auto">
          <div className="text-center space-y-1">
            {/* Security Message */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4 text-orange-primary" strokeWidth={1.2} />
              <span className="text-sm">
                Your data is secure and encrypted.
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </button>
              <span className="text-muted-foreground">•</span>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
