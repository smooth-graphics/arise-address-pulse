
import { useState } from "react";
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
      className: 'bg-green-50 border-green-500 text-green-500'
    },
    partial: {
      label: 'Partial',
      className: 'bg-orange-50 border-orange-500 text-orange-500'
    },
    'not-found': {
      label: 'Not Found',
      className: 'bg-red-50 border-red-500 text-red-500'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`flex px-2 py-0.5 justify-center items-center gap-2 rounded-full border-0.5 ${config.className}`}>
      <span className="text-xs font-medium leading-[18px]">{config.label}</span>
    </div>
  );
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-[142px] h-8 px-3 py-1 justify-center items-center gap-1.5 rounded-lg ${
        isActive 
          ? 'bg-white shadow-sm' 
          : 'hover:bg-white/50'
      }`}
    >
      <span className={`text-sm font-medium leading-5 ${
        isActive ? 'text-text-secondary' : 'text-text-tertiary'
      }`}>
        {label}
      </span>
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
    <div className="flex flex-col h-full bg-bg-offwhite">
      {/* Header */}
      <div className="flex w-full justify-between items-center px-4 py-4.5 h-[68px] bg-white border-b border-neutral-100">
        <h1 className="text-text-secondary font-semibold text-2xl leading-normal tracking-[-0.96px]">
          History
        </h1>
        <div className="flex items-center gap-4">
          <button className="flex h-8 px-2 py-1 pl-3 justify-center items-center gap-1.5 rounded-lg bg-genital-orange shadow-genital-glow">
            <span className="text-white text-sm font-medium leading-5">Verify</span>
            <UserRoundSearch className="w-4 h-4 text-white stroke-1.2" />
          </button>
          <div className="flex justify-center items-center gap-4">
            <button className="flex w-8 h-8 p-1 justify-center items-center gap-2 rounded-lg bg-neutral-50">
              <Bell className="w-5 h-5 text-neutral-400 stroke-1.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 gap-6 flex-1">
        {/* Controls */}
        <div className="flex justify-between items-center">
          {/* Filter Tabs */}
          <div className="flex p-0.5 items-start gap-2 rounded-[10px] bg-neutral-100">
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
          <div className="flex items-start gap-2">
            <div className="flex h-9 px-3 py-2 pl-2 items-center gap-2 rounded-lg border border-neutral-200 bg-white">
              <Calendar className="w-4 h-4 text-neutral-400 stroke-1.2" />
              <span className="text-text-secondary text-sm font-normal">27 Jan, 2025 - 27 Jun, 2025</span>
            </div>
            <button className="flex h-9 px-3 py-1 justify-center items-center gap-1.5 rounded-lg border border-genital-orange bg-white shadow-genital-glow">
              <span className="text-genital-orange text-sm font-medium leading-5">Export</span>
              <Upload className="w-4 h-4 text-genital-orange stroke-1.2 rotate-180" />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex flex-col rounded-t-4 bg-white border border-neutral-100 flex-1">
          {/* Table Header */}
          <div className="flex items-center bg-neutral-100 rounded-t-4">
            <div className="flex w-40 h-9 px-3 py-1.75 items-center gap-2">
              <span className="text-neutral-500 text-xs font-medium leading-[18px]">REF ID</span>
            </div>
            <div className="flex h-9 px-3 py-1.75 items-center gap-2 flex-1">
              <span className="text-neutral-500 text-xs font-medium leading-[18px]">Name</span>
            </div>
            <div className="flex w-[290px] h-9 px-3 py-1.75 items-center gap-2">
              <span className="text-neutral-500 text-xs font-medium leading-[18px]">Search Parameter</span>
            </div>
            <div className="flex w-30 h-9 px-3 py-1.75 items-center gap-2">
              <span className="text-neutral-500 text-xs font-medium leading-[18px]">Result</span>
            </div>
            <div className="flex w-[131px] h-9 px-3 py-1.75 items-center gap-2">
              <span className="text-neutral-500 text-xs font-medium leading-[18px]">Confidence Score</span>
            </div>
            <div className="flex w-[150px] h-9 px-3 py-1.75 items-center gap-2">
              <span className="text-neutral-500 text-xs font-medium leading-[18px]">Date</span>
            </div>
            <div className="flex w-[70px] h-9 px-3 py-1.75 items-center gap-2">
              <span className="text-neutral-500 text-xs font-medium leading-[18px]">Actions</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {currentRecords.map((record, index) => (
              <div key={record.id} className="flex pt-2 items-center border-b border-neutral-100 bg-white">
                <div className="flex w-40 h-11 px-3 py-1.75 items-center gap-2">
                  <span className="text-text-primary text-sm font-normal leading-5">
                    <span className="text-text-tertiary">#VER-</span>
                    {record.refId.split('-')[1]}
                  </span>
                </div>
                <div className="flex h-11 px-3 py-1.75 items-center gap-2 flex-1">
                  <span className="text-text-primary text-sm font-normal leading-5">{record.name}</span>
                </div>
                <div className="flex w-[290px] h-11 px-3 py-1.75 items-center gap-2">
                  {record.searchParameter.icon}
                  <span className="text-text-primary text-sm font-normal leading-5 truncate flex-1">
                    {record.searchParameter.value}
                  </span>
                </div>
                <div className="flex w-30 h-11 px-3 py-1.75 items-center gap-2">
                  <StatusBadge status={record.status} />
                </div>
                <div className="flex w-[131px] h-11 px-3 py-1.75 items-center gap-2">
                  <span className="text-text-primary text-sm font-normal leading-5">
                    {record.confidenceScore}
                  </span>
                </div>
                <div className="flex w-[150px] h-11 px-3 py-1.75 items-center gap-2">
                  <img 
                    src={record.verifiedBy.avatar} 
                    alt={record.verifiedBy.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <span className="text-text-primary text-xs font-normal leading-[18px]">
                      {record.verifiedBy.name}
                    </span>
                    <span className="text-text-tertiary text-xs font-normal leading-[18px]">
                      {record.verifiedBy.date}
                    </span>
                  </div>
                </div>
                <div className="flex w-[70px] h-11 px-3 py-1.75 items-center gap-1">
                  <button className="flex w-6 h-6 p-1 justify-center items-center">
                    <MoreVertical className="w-4 h-4 text-text-primary" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center h-8">
          <span className="text-neutral-600 text-sm font-normal">
            Showing {startIndex + 1} - {Math.min(endIndex, filteredData.length)} of {filteredData.length} items
          </span>
          
          <div className="flex justify-between items-center rounded-lg border border-neutral-200 bg-white">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="flex h-8 px-3 py-2 pl-2 items-center gap-2 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-400 stroke-1.2" />
              <span className="text-neutral-400 text-sm font-normal">Previous</span>
            </button>
            
            <div className="w-px h-8 bg-neutral-200" />
            
            {[1, 2, 3].slice(0, totalPages).map((page) => (
              <div key={page}>
                <button 
                  onClick={() => setCurrentPage(page)}
                  className={`flex w-8 h-8 px-3 py-2 justify-end items-center gap-2 rounded-lg ${
                    currentPage === page ? 'text-neutral-600' : 'text-neutral-600'
                  }`}
                >
                  <span className="text-sm font-normal">{page}</span>
                </button>
                {page < Math.min(3, totalPages) && <div className="w-px h-8 bg-neutral-200" />}
              </div>
            ))}
            
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="flex h-8 px-2 py-2 pr-3 items-center gap-2 rounded-lg disabled:opacity-50"
            >
              <span className="text-neutral-600 text-sm font-normal">Next</span>
              <ChevronRight className="w-4 h-4 text-neutral-600 stroke-1.2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const History = HistoryPage;
export default History;
