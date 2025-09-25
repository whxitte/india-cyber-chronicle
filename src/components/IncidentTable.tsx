import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export interface Incident {
  id: string;
  date: string;
  organization: string;
  sector: string;
  incidentType: string;
  attackMethod: string;
  rootCause: string;
  impact: string;
  severity: string;
  description: string;
  sources: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  verificationStatus: string;
}

interface IncidentTableProps {
  incidents: Incident[];
}

const IncidentTable = ({ incidents }: IncidentTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (tableContainerRef.current) {
        const viewportHeight = window.innerHeight;
        const headerHeight = 200; // Approximate space for header, search, title
        const paginationHeight = 80; // Space for pagination
        const availableHeight = viewportHeight - headerHeight - paginationHeight;
        const rowHeight = 48; // Row height with p-3 padding
        const calculatedItems = Math.floor(availableHeight / rowHeight);

        const minItems = 15;
        const maxItems = 50;
        const newItemsPerPage = Math.max(minItems, Math.min(maxItems, calculatedItems));

        setItemsPerPage(newItemsPerPage);
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(calculateItemsPerPage, 100);
    window.addEventListener('resize', calculateItemsPerPage);

    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIncidents = incidents.slice(startIndex, endIndex);
  const totalPages = Math.ceil(incidents.length / itemsPerPage);

  const getSeverityStyle = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    // Handle special unverified dates like "2000-0-0" or "0-0-0"
    if (dateString.includes("-0-0") || dateString === "0-0-0") {
      return dateString;
    }

    // Try to parse as a valid date, if invalid return as-is
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div ref={tableContainerRef} className="flex flex-col">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="flex flex-col border rounded-lg bg-background">
          {/* Table Header */}
          <div className="border-b">
            <div className="grid grid-cols-8 gap-4 p-3 text-sm font-semibold text-academic-red">
              <div>Date</div>
              <div>Organization</div>
              <div>Sector</div>
              <div>Incident Type</div>
              <div>Attack Method</div>
              <div>Root Cause</div>
              <div>Severity</div>
              <div>Sources</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-hidden">
            {currentIncidents.map((incident) => (
              <Link
                key={incident.id}
                to={`/incident/${incident.id}`}
                className="block hover:bg-muted/50 transition-colors"
              >
                <div className="grid grid-cols-8 gap-4 p-3 text-sm border-b border-border">
                  <div className="font-medium">
                    {formatDate(incident.date)}
                  </div>
                  <div className="font-medium text-academic-red relative group">
                    <div className="truncate">{incident.organization}</div>
                    <div className="invisible group-hover:visible absolute z-10 left-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg -mt-1 min-w-[200px] break-words">
                      {incident.organization}
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="truncate">{incident.sector}</div>
                    <div className="invisible group-hover:visible absolute z-10 left-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg -mt-1 min-w-[200px] break-words">
                      {incident.sector}
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="truncate">{incident.incidentType}</div>
                    <div className="invisible group-hover:visible absolute z-10 left-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg -mt-1 min-w-[200px] break-words">
                      {incident.incidentType}
                    </div>
                  </div>
                  <div className="text-muted-foreground relative group">
                    <div className="truncate">{incident.attackMethod}</div>
                    <div className="invisible group-hover:visible absolute z-10 left-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg -mt-1 min-w-[200px] break-words">
                      {incident.attackMethod}
                    </div>
                  </div>
                  <div className="text-muted-foreground relative group">
                    <div className="truncate">{incident.rootCause}</div>
                    <div className="invisible group-hover:visible absolute z-10 left-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg -mt-1 min-w-[200px] break-words">
                      {incident.rootCause}
                    </div>
                  </div>
                  <div>
                    <div className="w-24">
                      <Badge 
                        variant="outline"
                        className={`${getSeverityStyle(incident.severity)} w-full justify-center`}
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    <span className="text-academic-red">{incident.sources.length}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden flex-1 overflow-y-auto">
        <div className="space-y-4 p-1">
          {currentIncidents.map((incident) => (
            <Card key={incident.id} className="p-4">
              <Link to={`/incident/${incident.id}`} className="block space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-academic-red relative group">
                      <div className="truncate">{incident.organization}</div>
                      <div className="invisible group-hover:visible absolute z-10 left-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg mt-1 min-w-[200px] break-words">
                        {incident.organization}
                      </div>
                    </h3>
                    <p className="text-sm text-muted-foreground">{formatDate(incident.date)}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`${getSeverityStyle(incident.severity)} w-24 justify-center`}
                  >
                    {incident.severity}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground shrink-0">Sector:</span>
                    <span className="text-right relative group">
                      <div className="truncate">{incident.sector}</div>
                      <div className="invisible group-hover:visible absolute z-10 right-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg mt-1 min-w-[200px] break-words">
                        {incident.sector}
                      </div>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground shrink-0">Type:</span>
                    <span className="text-right relative group">
                      <div className="truncate">{incident.incidentType}</div>
                      <div className="invisible group-hover:visible absolute z-10 right-0 bg-popover text-popover-foreground p-2 rounded-md shadow-lg mt-1 min-w-[200px] break-words">
                        {incident.incidentType}
                      </div>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground shrink-0">Sources:</span>
                    <span className="flex items-center gap-1 text-academic-red">
                      <ExternalLink className="h-3 w-3" />
                      {incident.sources.length}
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="mt-auto mt-4 border-t bg-background py-2 px-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, incidents.length)} of {incidents.length} incidents
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ←
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const shouldShow = pageNum === 1 || 
                              pageNum === totalPages || 
                              Math.abs(pageNum - currentPage) <= 1;
              
              if (!shouldShow && (pageNum === 2 || pageNum === totalPages - 1)) {
                return <span key={`ellipsis-${pageNum}`} className="px-2">...</span>;
              }
              
              if (!shouldShow) return null;
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              →
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default IncidentTable;