import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Calendar, Building, Shield, AlertTriangle } from "lucide-react";

interface Incident {
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

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "critical";
      case "high":
        return "high";
      case "medium":
        return "medium";
      case "low":
        return "low";
      default:
        return "outline";
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="glass-card rounded-xl border border-white/10 backdrop-blur-sm bg-white/5 dark:bg-black/5 overflow-hidden shadow-xl" style={{ height: 'calc(100vh - 400px)', minHeight: '600px' }}>
          <div className="sticky top-0 z-10 bg-gradient-to-r from-academic-red/10 to-academic-red/5 border-b border-academic-red/20 backdrop-blur-sm">
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
          <div className="overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
            {currentIncidents.map((incident) => (
              <Link
                key={incident.id}
                to={`/incident/${incident.id}`}
                className="block hover:bg-academic-red/5 transition-all duration-200 border-b border-white/5 last:border-b-0"
              >
                <div className="grid grid-cols-8 gap-4 p-4 text-sm">
                  <div className="font-medium text-foreground truncate" title={formatDate(incident.date)}>
                    {formatDate(incident.date)}
                  </div>
                  <div className="font-medium text-academic-red truncate" title={incident.organization}>
                    {incident.organization}
                  </div>
                  <div className="text-muted-foreground truncate" title={incident.sector}>
                    {incident.sector}
                  </div>
                  <div className="text-foreground truncate" title={incident.incidentType}>
                    {incident.incidentType}
                  </div>
                  <div className="text-muted-foreground truncate" title={incident.attackMethod}>
                    {incident.attackMethod}
                  </div>
                  <div className="text-muted-foreground truncate" title={incident.rootCause}>
                    {incident.rootCause}
                  </div>
                  <div>
                    <Badge 
                      variant={getSeverityBadgeVariant(incident.severity)}
                      className="w-fit text-xs font-medium"
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    <span className="text-academic-red font-medium">{incident.sources.length}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Desktop Pagination */}
          {totalPages > 1 && (
            <div className="sticky bottom-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-white/20 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, incidents.length)} of {incidents.length} incidents
                </p>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-9 px-3"
                  >
                    Previous
                  </Button>
                  
                  {renderPageNumbers().map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-9 w-9 p-0 ${
                        currentPage === pageNum 
                          ? 'bg-academic-red text-white hover:bg-academic-red/90' 
                          : 'hover:bg-academic-red/10'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentIncidents.map((incident) => (
          <Card key={incident.id} className="glass-card p-4 border border-white/10 backdrop-blur-sm bg-white/5 dark:bg-black/5 hover:bg-academic-red/5 transition-all duration-200">
            <Link to={`/incident/${incident.id}`} className="block space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-academic-red truncate pr-2">{incident.organization}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(incident.date)}</p>
                </div>
                <Badge 
                  variant={getSeverityBadgeVariant(incident.severity)}
                  className="text-xs font-medium shrink-0"
                >
                  {incident.severity}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sector:</span>
                  <span className="truncate ml-2">{incident.sector}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="truncate ml-2">{incident.incidentType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sources:</span>
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

      {/* Mobile Pagination */}
      <div className="lg:hidden">
        {totalPages > 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Showing {startIndex + 1} to {Math.min(endIndex, incidents.length)} of {incidents.length} incidents
            </p>
            <div className="flex items-center justify-center space-x-1 flex-wrap gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-9 px-3"
              >
                Previous
              </Button>
              
              {renderPageNumbers().map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-9 w-9 p-0 ${
                    currentPage === pageNum 
                      ? 'bg-academic-red text-white hover:bg-academic-red/90' 
                      : 'hover:bg-academic-red/10'
                  }`}
                >
                  {pageNum}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-3"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentTable;