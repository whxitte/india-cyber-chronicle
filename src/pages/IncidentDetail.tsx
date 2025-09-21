import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import incidentsData from "@/data/incidents.json";
import { 
  ArrowLeft, 
  Calendar, 
  Building, 
  Shield, 
  AlertTriangle, 
  Target, 
  ExternalLink,
  FileText,
  Info
} from "lucide-react";

const IncidentDetail = () => {
  const { id } = useParams();
  const incident = incidentsData.find((inc) => inc.id === id);

  if (!incident) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-muted-foreground">Incident Not Found</h1>
            <p>The requested incident could not be found in our database.</p>
            <Button asChild>
              <Link to="/browse">Back to Browse</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const incidentDetails = [
    { label: "Date of Incident", value: formatDate(incident.date), icon: Calendar },
    { label: "Organization", value: incident.organization, icon: Building },
    { label: "Sector", value: incident.sector, icon: Shield },
    { label: "Incident Type", value: incident.incidentType, icon: AlertTriangle },
    { label: "Attack Method", value: incident.attackMethod, icon: Target },
    { label: "Root Cause", value: incident.rootCause, icon: Info },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/browse" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Browse</span>
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold academic-heading">
                  {incident.organization} Cyber Incident
                </h1>
                <p className="text-lg text-muted-foreground">
                  {incident.incidentType} • {formatDate(incident.date)}
                </p>
              </div>
              <Badge className={`text-sm px-3 py-1 ${getSeverityColor(incident.severity)}`}>
                {incident.severity} Severity
              </Badge>
            </div>
            
            <Separator />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Incident Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold academic-subheading mb-4">Incident Description</h2>
                <div className="prose max-w-none">
                  <p className="academic-body leading-relaxed text-base">{incident.description}</p>
                </div>
              </Card>

              {/* Impact */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold academic-subheading mb-4">Impact Assessment</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Organizational Impact</h3>
                      <p className="text-muted-foreground">{incident.impact}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Sources */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold academic-subheading mb-4">Source References</h2>
                <div className="space-y-3">
                  {incident.sources.map((source, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <FileText className="h-5 w-5 text-academic-red mt-0.5 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{source.title}</h3>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-academic-red hover:text-academic-red/80 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-sm">View</span>
                          </a>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {source.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Incident Metadata */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold academic-subheading mb-4">Incident Details</h2>
                <div className="space-y-4">
                  {incidentDetails.map((detail, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <detail.icon className="h-4 w-4" />
                        <span>{detail.label}</span>
                      </div>
                      <p className="font-medium text-sm pl-6">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold academic-subheading mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/browse?search=${encodeURIComponent(incident.organization)}`}>
                      <Building className="h-4 w-4 mr-2" />
                      View Similar Incidents
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/browse?search=${encodeURIComponent(incident.sector)}`}>
                      <Shield className="h-4 w-4 mr-2" />
                      Browse {incident.sector} Sector
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/browse?search=${encodeURIComponent(incident.incidentType)}`}>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Similar Attack Types
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Incident ID */}
              <Card className="p-4 bg-muted/30">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Incident ID</p>
                  <p className="font-mono text-sm font-medium">{incident.id}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;