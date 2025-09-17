
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  UserRoundSearch, 
  Bell, 
  Calendar, 
  Upload, 
  MapPinHouse, 
  ShieldEllipsis, 
  PlugZap, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationRecord {
  id: string;
  refId: string;
  name: string;
  searchParameter: {
    type: 'address' | 'security' | 'utility';
    value: string;
    icon: React.ReactNode;
  };
  status: 'complete' | 'partial' | 'not-found';
  confidenceScore: string;
  verifiedBy: {
    name: string;
    avatar: string;
    date: string;
  };
}

const mockData: VerificationRecord[] = [
  {
    id: '1',
    refId: 'VER-98274',
    name: 'Grace Ekanem',
    searchParameter: {
      type: 'address',
      value: '75, Herbert Macaulay road, Ekom Obonq',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'complete',
    confidenceScore: '97.64%',
    verifiedBy: {
      name: 'Lisa Kay',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4ca026a06f11a90528673d46b015a45f9ccde213?width=64',
      date: '18/08/25 9:21'
    }
  },
  {
    id: '2',
    refId: 'VER-56841',
    name: 'Kunle Afolayan',
    searchParameter: {
      type: 'address',
      value: '16, Obafemi Awolowo Way, Lagos',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'complete',
    confidenceScore: '94.05%',
    verifiedBy: {
      name: 'Lisa Kay',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4ca026a06f11a90528673d46b015a45f9ccde213?width=64',
      date: '15/08/25 20:09'
    }
  },
  {
    id: '3',
    refId: 'VER-71025',
    name: 'Zainab Lawal',
    searchParameter: {
      type: 'address',
      value: '61, Nnamdi Azikwe Avenue, Abuja',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'complete',
    confidenceScore: '91.37%',
    verifiedBy: {
      name: 'Olamide Coker',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/632d352b5280a6af94d91ade44c499248c6eb26a?width=64',
      date: '13/08/25 12:44'
    }
  },
  {
    id: '4',
    refId: 'VER-39420',
    name: 'Bode Thomas',
    searchParameter: {
      type: 'address',
      value: '23 Adeola street',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'partial',
    confidenceScore: '86.42%',
    verifiedBy: {
      name: 'Olamide Coker',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/632d352b5280a6af94d91ade44c499248c6eb26a?width=64',
      date: '10/08/25 16:55'
    }
  },
  {
    id: '5',
    refId: 'VER-24957',
    name: 'Amaka Chukuebube',
    searchParameter: {
      type: 'address',
      value: '88, Ibrahim Taiwo Road, adject Challenge',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'complete',
    confidenceScore: '90.65%',
    verifiedBy: {
      name: 'Steve Johnson',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/6814d0377229dad55f088bda9f4d05f7d9668817?width=64',
      date: '07/08/25 7:18'
    }
  },
  {
    id: '6',
    refId: 'VER-87312',
    name: 'Yakubu Ibrahim',
    searchParameter: {
      type: 'address',
      value: '39, Yakubu Gowon close, Samuel Iniobong Estate',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'complete',
    confidenceScore: '98.11%',
    verifiedBy: {
      name: 'Lisa Kay',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4ca026a06f11a90528673d46b015a45f9ccde213?width=64',
      date: '05/08/25 19:02'
    }
  },
  {
    id: '7',
    refId: 'VER-65923',
    name: 'Folake Adeyemi',
    searchParameter: {
      type: 'security',
      value: 'RC 456789',
      icon: <ShieldEllipsis className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'partial',
    confidenceScore: '84.71%',
    verifiedBy: {
      name: 'Olamide Coker',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/632d352b5280a6af94d91ade44c499248c6eb26a?width=64',
      date: '03/08/25 14:27'
    }
  },
  {
    id: '8',
    refId: 'VER-73289',
    name: 'Ifeanyi Ubah',
    searchParameter: {
      type: 'address',
      value: '7, Isa Kaita Close, Birnin Gwari, Kaduna',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'complete',
    confidenceScore: '96.32%',
    verifiedBy: {
      name: 'Lisa Kay',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4ca026a06f11a90528673d46b015a45f9ccde213?width=64',
      date: '02/08/25 8:50'
    }
  },
  {
    id: '9',
    refId: 'VER-48106',
    name: 'Aisha Mohammed',
    searchParameter: {
      type: 'utility',
      value: '989843870433',
      icon: <PlugZap className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'complete',
    confidenceScore: '92.46%',
    verifiedBy: {
      name: 'Steve Johnson',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/6814d0377229dad55f088bda9f4d05f7d9668817?width=64',
      date: '01/08/25 21:11'
    }
  },
  {
    id: '10',
    refId: 'VER-99821',
    name: 'Emeka Nwosu',
    searchParameter: {
      type: 'address',
      value: '27, Ahmadu Bello Street, Enugu',
      icon: <MapPinHouse className="w-6 h-6 text-neutral-400 stroke-1.5" />
    },
    status: 'not-found',
    confidenceScore: '-',
    verifiedBy: {
      name: 'Steve Johnson',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/6814d0377229dad55f088bda9f4d05f7d9668817?width=64',
      date: '18/08/25 9:21'
    }
  }
];

function StatusBadge({ status }: { status: 'complete' | 'partial' | 'not-found' }) {
  const statusConfig = {
    complete: {
      label: 'Complete',
      className: 'bg-green-100 border-green-500 text-green-700'
    },
    partial: {
      label: 'Partial',
      className: 'bg-yellow-100 border-yellow-500 text-yellow-700'
    },
    'not-found': {
      label: 'Not Found',
      className: 'bg-red-100 border-red-500 text-red-700'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn(
      "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border-0.5",
      config.className
    )}>
      <span>{config.label}</span>
    </div>
  );
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex px-3 py-1 justify-center items-center gap-1.5 rounded-lg text-sm font-medium transition-colors",
        "min-w-[90px] lg:w-[142px] h-8",
        isActive 
          ? 'bg-white shadow-sm text-gray-700' 
          : 'hover:bg-white/50 text-gray-600'
      )}
    >
      <span>{label}</span>
    </button>
  );
}

export function HistoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'complete', label: 'Complete' },
    { id: 'partial', label: 'Partial' },
    { id: 'not-found', label: 'Not found' }
  ];

  const filteredData = activeTab === 'all' 
    ? mockData 
    : mockData.filter(record => record.status === activeTab);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-full min-h-screen lg:min-h-0 bg-gray-50">
      {/* Header */}
      <div className="flex w-full justify-between items-center px-4 py-4.5 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 tracking-tight">
          History
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/dashboard/search">
            <button className="flex items-center gap-1.5 px-3 py-1 bg-orange-primary text-white text-sm font-medium rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/90 transition-colors">
              Verify
              <UserRoundSearch className="w-4 h-4" strokeWidth={1.2} />
            </button>
          </Link>
          <Link to="/dashboard/notifications">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
              <Bell className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 gap-6 flex-1">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          {/* Filter Tabs */}
          <div className="flex p-0.5 items-start gap-2 rounded-lg bg-gray-100 overflow-x-auto">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
              />
            ))}
          </div>

          {/* Date Range and Export */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-9 px-3 py-2 items-center gap-2 rounded-lg border border-gray-200 bg-white text-sm">
              <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.2} />
              <span className="text-gray-700 whitespace-nowrap hidden sm:inline">27 Jan, 2025 - 27 Jun, 2025</span>
              <span className="text-gray-700 sm:hidden">Jan - Jun 2025</span>
            </div>
            <button 
              onClick={() => console.log("Export data")}
              className="flex h-9 px-3 py-1 justify-center items-center gap-1.5 rounded-lg border border-orange-primary bg-white shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/5 transition-colors"
            >
              <span className="text-orange-primary text-sm font-medium">Export</span>
              <Upload className="w-4 h-4 text-orange-primary rotate-180" strokeWidth={1.2} />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            {/* Table Header */}
            <div className="flex items-center bg-gray-100">
              <div className="flex w-32 xl:w-40 px-3 py-2.5 items-center">
                <span className="text-xs font-medium text-gray-600">REF ID</span>
              </div>
              <div className="flex px-3 py-2.5 items-center flex-1 min-w-0">
                <span className="text-xs font-medium text-gray-600">Name</span>
              </div>
              <div className="flex w-48 xl:w-72 px-3 py-2.5 items-center">
                <span className="text-xs font-medium text-gray-600">Search Parameter</span>
              </div>
              <div className="flex w-24 px-3 py-2.5 items-center">
                <span className="text-xs font-medium text-gray-600">Result</span>
              </div>
              <div className="flex w-28 px-3 py-2.5 items-center">
                <span className="text-xs font-medium text-gray-600">Confidence</span>
              </div>
              <div className="flex w-36 px-3 py-2.5 items-center">
                <span className="text-xs font-medium text-gray-600">Date</span>
              </div>
              <div className="flex w-16 px-3 py-2.5 items-center">
                <span className="text-xs font-medium text-gray-600">Actions</span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {currentRecords.map((record) => (
                <div key={record.id} className="flex items-center hover:bg-gray-50 transition-colors">
                  <div className="flex w-32 xl:w-40 px-3 py-3 items-center">
                    <span className="text-sm text-gray-900 font-mono">
                      <span className="text-gray-500">#</span>
                      {record.refId.split('-')[1]}
                    </span>
                  </div>
                  <div className="flex px-3 py-3 items-center flex-1 min-w-0">
                    <span className="text-sm text-gray-900 truncate">{record.name}</span>
                  </div>
                  <div className="flex w-48 xl:w-72 px-3 py-3 items-center gap-2">
                    <div className="flex-shrink-0">
                      {record.searchParameter.icon}
                    </div>
                    <span className="text-sm text-gray-900 truncate flex-1">
                      {record.searchParameter.value}
                    </span>
                  </div>
                  <div className="flex w-24 px-3 py-3 items-center">
                    <StatusBadge status={record.status} />
                  </div>
                  <div className="flex w-28 px-3 py-3 items-center">
                    <span className="text-sm text-gray-900">
                      {record.confidenceScore}
                    </span>
                  </div>
                  <div className="flex w-36 px-3 py-3 items-center gap-2">
                    <img 
                      src={record.verifiedBy.avatar} 
                      alt={record.verifiedBy.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-gray-900 truncate">
                        {record.verifiedBy.name}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {record.verifiedBy.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-16 px-3 py-3 items-center">
                    <button 
                      onClick={() => console.log("Action for record:", record.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {currentRecords.map((record) => (
              <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{record.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={record.status} />
                    <button 
                      onClick={() => console.log("Action for record:", record.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-mono text-gray-500">#VER-{record.refId.split('-')[1]}</span>
                    <span className="text-gray-400">•</span>
                    <span>{record.confidenceScore}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      {record.searchParameter.icon}
                    </div>
                    <span className="text-sm text-gray-700 break-words">
                      {record.searchParameter.value}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <img 
                      src={record.verifiedBy.avatar} 
                      alt={record.verifiedBy.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs text-gray-600">
                      {record.verifiedBy.name} • {record.verifiedBy.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-gray-600 text-sm">
            Showing {startIndex + 1} - {Math.min(endIndex, filteredData.length)} of {filteredData.length} items
          </span>
          
          <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className={cn(
                "flex h-9 px-3 py-2 items-center gap-2 transition-colors text-sm",
                currentPage === 1 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.2} />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="w-px h-6 bg-gray-200" />
            
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
              <div key={page} className="flex items-center">
                <button 
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "flex w-9 h-9 items-center justify-center text-sm transition-colors",
                    currentPage === page 
                      ? 'text-orange-primary font-medium bg-orange-primary/5' 
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {page}
                </button>
                {page < Math.min(3, totalPages) && <div className="w-px h-6 bg-gray-200" />}
              </div>
            ))}
            
            <div className="w-px h-6 bg-gray-200" />
            
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className={cn(
                "flex h-9 px-3 py-2 items-center gap-2 transition-colors text-sm",
                currentPage === totalPages 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const History = HistoryPage;
export default History;
