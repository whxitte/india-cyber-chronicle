import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Database, Shield, FileText, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Incidents", value: "250+", icon: Database, color: "text-academic-red" },
    { label: "Organizations", value: "120+", icon: Users, color: "text-green-600" },
    { label: "Sectors Covered", value: "15", icon: Shield, color: "text-orange-600" },
    { label: "Years of Data", value: "25", icon: TrendingUp, color: "text-purple-600" },
  ];


  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Use React Router navigation instead of window.location
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-academic-red-lighter to-background min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold academic-heading">
                India Cyber Incident Archive
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light">
                A comprehensive database of cyber security incidents in India (2001–2025)
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-lg academic-body">
                Documenting, analyzing, and preserving knowledge of cyber security incidents affecting Indian organizations, infrastructure, and citizens.
              </p>
              
              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by organization, sector, or incident type..."
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="px-8 bg-academic-red hover:bg-academic-red/90"
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-academic-red hover:bg-academic-red/90">
                <Link to="/browse">
                  <Database className="mr-2 h-5 w-5" />
                  Browse All Incidents
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">
                  <FileText className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold academic-heading text-center mb-12">
              Archive Statistics
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-academic-red-lighter">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-academic-red mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-6 w-6 text-academic-red" />
              <span className="font-semibold text-academic-red">India Cyber Incident Archive</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advancing cyber security awareness through documented incident analysis
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-academic-red">About</Link>
              <Link to="/sources" className="text-muted-foreground hover:text-academic-red">Sources</Link>
              <span className="text-muted-foreground"><a href="https://www.linkedin.com/in/sethusatheesh" target="_blank" rel="noopener noreferrer">Author Linkedin</a></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
