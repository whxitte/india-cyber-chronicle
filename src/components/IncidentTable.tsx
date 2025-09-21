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
        return "destructive";
      case "high":
        return "secondary";
      case "medium":
        return "outline";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return <AlertTriangle className="h-3 w-3" />;
      case "high":
        return <Shield className="h-3 w-3" />;
      default:
        return null;
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
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="data-table">
          <div className="data-table-header">
            <div className="grid grid-cols-8 gap-4 p-4 text-sm font-semibold text-academic-blue">
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
          <div>
            {currentIncidents.map((incident) => (
              <Link
                key={incident.id}
                to={`/incident/${incident.id}`}
                className="block hover:bg-muted/50 transition-colors"
              >
                <div className="data-table-row grid grid-cols-8 gap-4 p-4 text-sm">
                  <div className="font-medium">{formatDate(incident.date)}</div>
                  <div className="font-medium text-academic-blue">{incident.organization}</div>
                  <div>{incident.sector}</div>
                  <div>{incident.incidentType}</div>
                  <div className="text-muted-foreground">{incident.attackMethod}</div>
                  <div className="text-muted-foreground">{incident.rootCause}</div>
                  <div>
                    <Badge 
                      variant={getSeverityBadgeVariant(incident.severity)}
                      className="flex items-center gap-1 w-fit"
                    >
                      {getSeverityIcon(incident.severity)}
                      {incident.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    <span className="text-academic-blue">{incident.sources.length}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentIncidents.map((incident) => (
          <Card key={incident.id} className="p-4">
            <Link to={`/incident/${incident.id}`} className="block space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-academic-blue">{incident.organization}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(incident.date)}</p>
                </div>
                <Badge 
                  variant={getSeverityBadgeVariant(incident.severity)}
                  className="flex items-center gap-1"
                >
                  {getSeverityIcon(incident.severity)}
                  {incident.severity}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sector:</span>
                  <span>{incident.sector}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{incident.incidentType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sources:</span>
                  <span className="flex items-center gap-1 text-academic-blue">
                    <ExternalLink className="h-3 w-3" />
                    {incident.sources.length}
                  </span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, incidents.length)} of {incidents.length} incidents
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentTable;