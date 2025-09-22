import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Calendar, Building } from "lucide-react";

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
}

interface IncidentTableProps {
  incidents: Incident[];
}

const IncidentTable = ({ incidents }: IncidentTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Desktop Table View */}
      <div className="hidden lg:block flex-1 min-h-0">
        <div className="h-full flex flex-col border rounded-lg bg-background">
          {/* Table Header */}
          <div className="border-b">
            <div className="grid grid-cols-8 gap-4 p-4 text-sm font-semibold text-academic-red">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Organization
              </div>
              <div>Sector</div>
              <div>Incident Type</div>
              <div>Attack Method</div>
              <div>Root Cause</div>
              <div>Severity</div>
              <div>Sources</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-y-auto">
            {currentIncidents.map((incident) => (
              <Link
                key={incident.id}
                to={`/incident/${incident.id}`}
                className="block hover:bg-muted/50 transition-colors"
              >
                <div className="grid grid-cols-8 gap-4 p-4 text-sm border-b last:border-b-0">
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