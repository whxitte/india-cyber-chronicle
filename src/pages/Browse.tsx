import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import IncidentTable from "@/components/IncidentTable";
import incidentsData from "@/data/incidents.json";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({
    years: [] as string[],
    sectors: [] as string[],
    incidentTypes: [] as string[],
    severities: [] as string[],
  });

  const filteredIncidents = useMemo(() => {
    return incidentsData.filter((incident) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchFields = [
          incident.organization,
          incident.sector,
          incident.incidentType,
          incident.attackMethod,
          incident.rootCause,
          new Date(incident.date).getFullYear().toString(),
        ].join(" ").toLowerCase();
        
        if (!searchFields.includes(query)) {
          return false;
        }
      }

      // Year filter
      if (filters.years.length > 0) {
        const incidentYear = new Date(incident.date).getFullYear().toString();
        if (!filters.years.includes(incidentYear)) {
          return false;
        }
      }

      // Sector filter
      if (filters.sectors.length > 0) {
        if (!filters.sectors.includes(incident.sector)) {
          return false;
        }
      }

      // Incident type filter
      if (filters.incidentTypes.length > 0) {
        if (!filters.incidentTypes.includes(incident.incidentType)) {
          return false;
        }
      }

      // Severity filter
      if (filters.severities.length > 0) {
        if (!filters.severities.includes(incident.severity)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Sort incidents by date (newest first)
  const sortedIncidents = useMemo(() => {
    return [...filteredIncidents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filteredIncidents]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold academic-heading">Browse Cyber Incidents</h1>
            <p className="text-lg text-muted-foreground">
              Explore and analyze cyber security incidents affecting Indian organizations from 2001 to 2025.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by organization, sector, incident type, or year..."
            />
          </div>

          {/* Content Layout */}
          <div className="lg:grid lg:grid-cols-4 lg:gap-8 space-y-6 lg:space-y-0">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                totalIncidents={incidentsData.length}
                filteredCount={sortedIncidents.length}
              />
            </div>

            {/* Incidents Table */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold academic-subheading">
                    Incident Records
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {sortedIncidents.length} incident{sortedIncidents.length !== 1 ? 's' : ''} found
                  </div>
                </div>
                
                {sortedIncidents.length > 0 ? (
                  <IncidentTable incidents={sortedIncidents} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <h3 className="text-lg font-medium">No incidents found</h3>
                      <p>Try adjusting your search criteria or filters</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;