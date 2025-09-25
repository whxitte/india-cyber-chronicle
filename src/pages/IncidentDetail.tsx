import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Incident } from "@/components/IncidentTable"; // Assuming Incident interface is exported from IncidentTable
import {
  ArrowLeft,
  Calendar,
  Building,
  Shield,
  AlertTriangle,
  Target,
  ExternalLink,
  FileText,
  Info,
  CheckCircle
} from "lucide-react";

const IncidentDetail = () => {
  const { id } = useParams();
  console.log("Incident ID from URL params:", id);
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllIncidents = async () => {
      try {
        const years = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2000 + i);
        const fetchPromises = years.map(async (year) => {
          try {
            const response = await fetch(`/data/${year}.json`);
            console.log(`Fetching: /data/${year}.json`);
            if (!response.ok) {
              if (response.status === 404) {
                console.warn(`404: No data for year ${year}.`);
                return []; // No data for this year, return empty array
              }
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              throw new TypeError(`Oops, we didn't get JSON! Content-Type: ${contentType}`);
            }
            return response.json();
          } catch (innerError) {
            console.warn(`Could not fetch data for year ${year}:`, innerError);
            return []; // Return empty array for failed fetches as well
          }
        });

        const results = await Promise.all(fetchPromises);
        const combinedIncidents: Incident[] = results.flat();
        console.log("Combined Incidents:", combinedIncidents);
        const foundIncident = combinedIncidents.find((inc) => inc.id === id);
        console.log("Found Incident:", foundIncident);
        setIncident(foundIncident || null);
      } catch (outerError) {
        console.error("Error fetching incidents:", outerError);
        setError("Failed to load incident data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllIncidents();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Loading incident details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center text-red-500">
          <p>{error}</p>
          <Button asChild className="mt-4">
            <Link to="/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>
    );
  }

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

  const getVerificationStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200";
      case "unverified":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "disputed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
      month: "long",
      day: "numeric",
    });
  };

  const formatDescription = (description: string) => {
    const paragraphs = description.split('\n\n').filter(paragraph => paragraph.trim() !== '');

    return paragraphs.map((paragraph, index) => {
      const trimmedParagraph = paragraph.trim();

      // Check if this paragraph is a list (starts with multiple lines beginning with -)
      const lines = trimmedParagraph.split('\n');
      const isListParagraph = lines.every(line => line.trim().startsWith('-') || line.trim() === '');

      if (isListParagraph && lines.some(line => line.trim().startsWith('-'))) {
        // Render as unordered list
        const listItems = lines
          .filter(line => line.trim().startsWith('-'))
          .map((line, itemIndex) => {
            const content = line.replace(/^-\s*/, '').trim();
            return (
              <li key={itemIndex} className="mb-1">
                {formatTextWithBold(content)}
              </li>
            );
          });

        return (
          <ul key={index} className="list-disc list-inside mb-4 last:mb-0 space-y-1">
            {listItems}
          </ul>
        );
      } else {
        // Render as paragraph
        return (
          <p key={index} className="academic-body leading-relaxed text-base mb-4 last:mb-0">
            {formatTextWithBold(trimmedParagraph)}
          </p>
        );
      }
    });
  };

  const formatTextWithBold = (text: string) => {
    // Split text by both **bold** and *bold* patterns
    // Using a regex that matches both single and double asterisks
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/);

    return parts.map((part, index) => {
      if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('*') && part.endsWith('*'))) {
        // Remove the * or ** markers and make bold
        const boldText = part.startsWith('**') ? part.slice(2, -2) : part.slice(1, -1);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
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
                  {formatDescription(incident.description)}
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

              {/* Verification Status */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold academic-subheading mb-4">Verification Status</h2>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className={`text-sm px-3 py-1 ${getVerificationStatusColor(incident.verificationStatus)}`}>
                        {incident.verificationStatus}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This incident report has been {incident.verificationStatus.toLowerCase()} based on available sources and evidence.
                    </p>
                  </div>
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
                    <Link to={`/browse?search=${encodeURIComponent(incident.organization)}`} className="flex items-center w-full">
                      <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">View Similar Incidents</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/browse?search=${encodeURIComponent(incident.sector)}`} className="flex items-center w-full">
                      <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Browse {incident.sector} Sector</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={`/browse?search=${encodeURIComponent(incident.incidentType)}`} className="flex items-center w-full">
                      <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Similar Attack Types</span>
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