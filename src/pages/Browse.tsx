import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import IncidentTable from "@/components/IncidentTable";
import { Incident } from "@/components/IncidentTable";

const Browse = () => {
  const [allIncidents, setAllIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
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
        const combinedIncidents = results.flat();
        console.log("Combined Incidents:", combinedIncidents);

        // Sort incidents by date in ascending order
        combinedIncidents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setAllIncidents(combinedIncidents);
      } catch (outerError) {
        console.error("Error fetching incidents:", outerError);
        setError("Failed to load incident data.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({
    years: [] as string[],
    sectors: [] as string[],
    incidentTypes: [] as string[],
    severities: [] as string[],
  });

  const filteredIncidents = useMemo(() => {
    return allIncidents.filter((incident) => {
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
  }, [searchQuery, filters, allIncidents]);

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
                totalIncidents={allIncidents.length}
                filteredCount={filteredIncidents.length}
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
                    {filteredIncidents.length} incident{filteredIncidents.length !== 1 ? 's' : ''} found
                  </div>
                </div>
                
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading incidents...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-red-500">
                    <p>{error}</p>
                  </div>
                ) : filteredIncidents.length > 0 ? (
                  <IncidentTable incidents={filteredIncidents} />
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