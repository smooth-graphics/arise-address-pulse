import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, UserRoundSearch, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Verify() {
  const [fullName, setFullName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyIdentity = async () => {
    if (!fullName.trim() || !fullAddress.trim()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Verifying identity for:", { fullName, fullAddress });
      // Navigate to results page with form data
      navigate("/verification-results", {
        state: {
          fullName: fullName.trim(),
          fullAddress: fullAddress.trim(),
        },
      });
    }, 2000);
  };

  const isFormValid = fullName.trim() && fullAddress.trim();

  return (
    <div
      className="flex-1 min-h-screen"
      style={{
        background:
          "linear-gradient(0deg, rgba(248, 145, 17, 0.05) 0%, rgba(248, 145, 17, 0.05) 100%), #FFF",
      }}
    >
      <div className="w-full bg-white lg:rounded-tl-xl min-h-screen lg:min-h-0 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4.5 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-700 tracking-tight">
            Search
          </h1>

          <div className="flex items-center gap-4">
            {/* Verify Button */}
            <button className="flex items-center gap-1.5 px-3 py-1 bg-orange-primary text-white text-sm font-medium rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/90 transition-colors">
              Verify
              <UserRoundSearch className="w-4 h-4" strokeWidth={1.2} />
            </button>

            {/* Notifications */}
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center px-4 py-16 lg:py-24">
          <div className="w-full max-w-xl space-y-8">
            {/* Title and Description */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-medium text-black">
                Identity Verification
              </h2>
              <p className="text-sm text-gray-500 leading-5">
                GenIEtal cross-checks names and addresses across verified
                database to confirm identities.
                <br />
                Enter full details to begin.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-2">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                {/* Name Input */}
                <div className="px-5 pt-1 pb-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Enter full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-base text-black bg-transparent border-none outline-none"
                    placeholder="Sarah Badejo"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 mx-1"></div>

                {/* Address Input */}
                <div className="px-5 py-3">
                  {fullAddress ? (
                    <>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Enter full address
                      </label>
                      <input
                        type="text"
                        value={fullAddress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        className="w-full text-base text-black bg-transparent border-none outline-none"
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter full address"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      className="w-full text-base text-gray-500 bg-transparent border-none outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Helper Text */}
              <p className="text-sm text-gray-500 text-center">
                Both full name and complete address are required for
                verification.
              </p>
            </div>

            {/* Verify Button */}
            <div className="flex justify-center">
              <button
                onClick={handleVerifyIdentity}
                disabled={!isFormValid || isLoading}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-base transition-all duration-200",
                  isFormValid && !isLoading
                    ? "bg-orange-primary text-white hover:bg-orange-primary/90 shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed",
                )}
              >
                <UserRoundSearch className="w-4 h-4" strokeWidth={1.5} />
                {isLoading ? "Verifying..." : "Verify Identity"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
          <div className="text-center space-y-1">
            {/* Security Message */}
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Lock className="w-4 h-4 text-orange-primary" strokeWidth={1.2} />
              <span className="text-sm">
                Your data is secure and encrypted.
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                Terms
              </button>
              <span className="text-gray-400">•</span>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
