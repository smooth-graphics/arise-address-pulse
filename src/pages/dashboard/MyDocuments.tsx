import { useState } from "react";
import { Bell, Info, CloudUpload, Upload, Trash2 } from "lucide-react";

interface Document {
  id: string;
  type: "utility" | "financial" | "identity";
  name: string;
  size: string;
  format: string;
  date: string;
  status: "approved" | "pending";
  image?: string;
}

export default function MyDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      type: "utility",
      name: "Utility Bill",
      size: "2.3 MB",
      format: "Image",
      date: "12 Jun, 2025",
      status: "approved",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/15bffdae7acfe25c1000d516702007c9adbe18a7?width=728",
    },
    {
      id: "2",
      type: "financial",
      name: "Financial Record",
      size: "3.4 MB",
      format: "PDF",
      date: "11 Jun, 2025",
      status: "approved",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/ac2403f8d44ca4292ded01a810b7863280ce5ab4?width=730",
    },
    {
      id: "3",
      type: "identity",
      name: "Identity Document",
      size: "2.3 MB",
      format: "Image",
      date: "12 Jun, 2025",
      status: "pending",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7d90b28fec239947c3f8149a05964b27efad25de?width=720",
    },
  ]);

  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const documentTypes = [
    {
      id: "utility",
      title: "Utility Bill",
      description:
        "A recent bill from a service provider — like electricity, water, internet, or waste.",
      acceptedFormats: "PDF, PNG, JPG",
    },
    {
      id: "financial",
      title: "Financial Records",
      description:
        "A recent bank statement, salary slip, or tax document showing your name and address.",
      acceptedFormats: "PDF, PNG, JPG",
    },
    {
      id: "identity",
      title: "Identity Document",
      description:
        "A valid government-issued ID like passport, driver's license, or national ID card.",
      acceptedFormats: "PDF, PNG, JPG",
    },
  ];

  const handleFileUpload = (
    type: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log(`Uploading ${file.name} for ${type}`);
    }
  };

  const handleDelete = (documentId: string) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId));
  };

  const getDocumentByType = (type: string) => {
    return documents.find((doc) => doc.type === type);
  };

  const StatusBadge = ({ status }: { status: "approved" | "pending" }) => (
    <div
      className={`
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      ${
        status === "approved"
          ? "bg-green-600 text-white border border-green-600"
          : "bg-orange-500 text-white border border-orange-500"
      }
    `}
    >
      {status === "approved" ? "Approved" : "Pending"}
    </div>
  );

  const DocumentCard = ({ document }: { document: Document }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-2 space-y-2">
      {/* Header with title and status */}
      <div className="flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-1">
          <h3 className="text-base font-medium text-gray-700">
            {documentTypes.find((t) => t.id === document.type)?.title}
          </h3>
          <button
            className="relative"
            onMouseEnter={() => setShowTooltip(document.type)}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <Info className="w-4 h-4 text-gray-700" />
            {showTooltip === document.type && (
              <div className="absolute left-20 top-8 z-10 w-72 p-3 bg-white border border-gray-100 rounded-xl shadow-lg">
                <div className="flex items-start gap-1 mb-2">
                  <Info className="w-4 h-4 text-green-600 mt-0.5" />
                  <span className="text-xs font-medium text-green-600">
                    Info
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {
                    documentTypes.find((t) => t.id === document.type)
                      ?.description
                  }
                </p>
              </div>
            )}
          </button>
        </div>
        <StatusBadge status={document.status} />
      </div>

      {/* Document Preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-48 flex items-center justify-center">
        {document.image ? (
          <img
            src={document.image}
            alt={document.name}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-gray-400">Document Preview</div>
        )}
      </div>

      {/* Document Info */}
      <div className="flex items-center justify-between px-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>{document.size}</span>
          <span>•</span>
          <span>{document.format}</span>
        </div>
        <span>{document.date}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-2 pb-1">
        <button className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
          <Upload className="w-4 h-4" />
          Update
        </button>
        <button
          onClick={() => handleDelete(document.id)}
          className="flex items-center gap-2 px-2 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );

  const UploadArea = ({ type }: { type: any }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-2 space-y-2">
      {/* Header */}
      <div className="flex items-center gap-1 px-2 pt-1">
        <h3 className="text-base font-medium text-gray-700">{type.title}</h3>
        <button
          className="relative"
          onMouseEnter={() => setShowTooltip(type.id)}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Info className="w-4 h-4 text-gray-700" />
          {showTooltip === type.id && (
            <div className="absolute left-20 top-8 z-10 w-72 p-3 bg-white border border-gray-100 rounded-xl shadow-lg">
              <div className="flex items-start gap-1 mb-2">
                <Info className="w-4 h-4 text-green-600 mt-0.5" />
                <span className="text-xs font-medium text-green-600">Info</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {type.description}
              </p>
            </div>
          )}
        </button>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-16 flex flex-col items-center justify-center text-center bg-gray-50">
        <CloudUpload className="w-8 h-8 text-gray-400 mb-3" />
        <div className="space-y-1.5">
          <p className="text-xs text-gray-500">
            Drop your file here, or{" "}
            <label className="text-blue-600 underline cursor-pointer hover:text-blue-700">
              Browse
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleFileUpload(type.id, e)}
              />
            </label>
          </p>
          <p className="text-xs text-gray-400">
            Accepted Formats: {type.acceptedFormats}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 min-h-screen" style={{ background: "#FDF9F6" }}>
      <div className="w-full bg-white lg:rounded-tl-xl min-h-screen lg:min-h-0 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4.5 border-b border-gray-100">
          <h1 className="text-xl font-medium text-black">My Documents</h1>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {documentTypes.map((type) => {
              const existingDocument = getDocumentByType(type.id);

              return (
                <div key={type.id} className="space-y-4">
                  {existingDocument ? (
                    <DocumentCard document={existingDocument} />
                  ) : (
                    <UploadArea type={type} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 right-6">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <button className="hover:text-gray-600 transition-colors">
              Terms
            </button>
            <button className="hover:text-gray-600 transition-colors">
              Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
