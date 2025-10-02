import { ChevronLeft, Download, FileText, MapPin, User, Phone, Mail, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationMatch } from "@/types/dashboard";
import { InfoField } from "./VerificationHelpers";

interface DetailedReportViewProps {
  match: VerificationMatch;
  onBack: () => void;
}

export const DetailedReportView = ({ match, onBack }: DetailedReportViewProps) => {
  const handleExportReport = () => {
    // TODO: Implement export functionality
    console.log("Exporting report for", match.id);
  };

  const handleRequestInfo = () => {
    // TODO: Implement request additional info
    console.log("Requesting additional info for", match.id);
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-orange-50/30 to-white">
      {/* Header with Back Button */}
      <div className="bg-card border-b px-6 py-4">
        <Button onClick={onBack} variant="ghost" className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Results
        </Button>
      </div>

      {/* Report Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Confidence Score Card */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Verification Report</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Generated on {new Date(match.additionalInfo?.verificationDate || new Date()).toLocaleDateString()}
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600">
                  {match.confidenceScore}%
                </div>
                <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wide">
                  {match.matchType} Match
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-orange-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Full Name" value={match.fullName} />
            <InfoField label="NIN" value={match.nin} redacted />
            <InfoField label="Phone Number" value={match.phoneNumber} redacted />
            <InfoField label="Email Address" value={match.email} redacted />
            <InfoField label="Date of Birth" value={match.dateOfBirth} />
            <InfoField label="Gender" value={match.gender} />
          </CardContent>
        </Card>

        {/* Address Verification Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-600" />
              Address Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <MapPin className="text-orange-600 mt-1 h-5 w-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm text-muted-foreground mb-1">Verified Address</p>
                <p className="text-foreground font-medium">{match.address}</p>
              </div>
            </div>

            {match.additionalInfo?.alternateAddresses && match.additionalInfo.alternateAddresses.length > 0 && (
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-2">Alternate Addresses</p>
                <div className="space-y-2">
                  {match.additionalInfo.alternateAddresses.map((addr, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                      <MapPin className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
                      <p className="text-sm text-foreground">{addr}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        {match.additionalInfo?.knownAliases && match.additionalInfo.knownAliases.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-2">Known Aliases</p>
                <div className="flex flex-wrap gap-2">
                  {match.additionalInfo.knownAliases.map((alias, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-foreground"
                    >
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Verification Metadata Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Verification Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField 
              label="Data Source" 
              value={match.additionalInfo?.dataSource || "NIMC Database"} 
            />
            <InfoField 
              label="Verification Date" 
              value={new Date(match.additionalInfo?.verificationDate || new Date()).toLocaleDateString()} 
            />
            <InfoField 
              label="Match Type" 
              value={match.matchType.toUpperCase()} 
            />
            <InfoField 
              label="Verification ID" 
              value={match.verificationId || match.id} 
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleExportReport} className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={handleRequestInfo} variant="outline" className="flex-1 gap-2">
            <FileText className="h-4 w-4" />
            Request Additional Info
          </Button>
        </div>
      </div>
    </div>
  );
};
