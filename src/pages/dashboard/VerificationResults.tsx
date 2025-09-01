import { useLocation } from "react-router-dom";
import { Bell, UserRoundSearch, Lock, CircleCheckBig } from "lucide-react";

interface LocationState {
  fullName: string;
  fullAddress: string;
}

export default function VerificationResults() {
  const location = useLocation();
  const state = location.state as LocationState;

  // Default values if no state is passed
  const fullName = state?.fullName || "Joseph Oluwamuyiwa";
  const fullAddress =
    state?.fullAddress || "No. 7, Coker Street, Ibadan, Oyo State";

  const searchResults = [
    {
      id: 1,
      name: "Joseph Oluwamuyiwa",
      address: "No. 7, Coker Street, Ibadan, Oyo State",
      matchType: "high",
      matchColor: "green",
    },
    {
      id: 2,
      name: "Joseph Oluwamuyiwa",
      address: "No. 7, Croker Street, Ibadan, Oyo State",
      matchType: "medium",
      matchColor: "yellow",
    },
    {
      id: 3,
      name: "Joseph Oluwamuyiwa",
      address: "No. 17, Koker Close, Ibadan, Oyo State",
      matchType: "medium",
      matchColor: "yellow",
    },
  ];

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
            Verify Identity
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

        {/* Search Form Display */}
        <div className="flex justify-center px-4 py-6">
          <div className="w-full max-w-4xl">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden p-1">
              <div className="flex">
                {/* Name Section */}
                <div className="flex-1 px-5 py-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Enter full name
                  </label>
                  <div className="text-base text-black font-normal">
                    {fullName}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-200 my-2"></div>

                {/* Address Section */}
                <div className="flex-1 px-5 py-3">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Enter full address
                  </label>
                  <div className="text-base text-black font-normal">
                    {fullAddress}
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
            <div className="text-base font-medium text-gray-600 italic">
              We found <span className="text-orange-primary">3</span> results
              for "
              <span className="text-orange-primary">
                {fullName}, {fullAddress}
              </span>
              "
            </div>

            {/* Results Cards */}
            <div className="space-y-5">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between min-h-[80px] shadow-sm border border-gray-100"
                >
                  <div className="flex-1 py-3">
                    <div className="text-lg font-medium text-black mb-1">
                      {result.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {result.address}
                    </div>
                  </div>

                  {/* Match Badge */}
                  <div
                    className={`
                    flex items-center gap-2 px-2 py-2 rounded-full border
                    ${
                      result.matchType === "high"
                        ? "border-green-500/50 bg-green-500/10 text-green-600"
                        : "border-yellow-500/50 bg-yellow-500/10 text-yellow-600"
                    }
                  `}
                  >
                    <CircleCheckBig
                      className={`w-5 h-5 ${
                        result.matchType === "high"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                      strokeWidth={1.2}
                    />
                    <span className="text-sm font-medium">
                      {result.matchType === "high"
                        ? "High match"
                        : "Medium match"}
                    </span>
                  </div>
                </div>
              ))}
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
