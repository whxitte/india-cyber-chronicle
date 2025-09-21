import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";

interface FilterPanelProps {
  filters: {
    years: string[];
    sectors: string[];
    incidentTypes: string[];
    severities: string[];
  };
  onFiltersChange: (filters: any) => void;
  totalIncidents: number;
  filteredCount: number;
}

const FilterPanel = ({ filters, onFiltersChange, totalIncidents, filteredCount }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const yearOptions = Array.from({ length: 25 }, (_, i) => (2025 - i).toString());
  const sectorOptions = [
    "Banking",
    "Government", 
    "Healthcare",
    "Transportation",
    "Energy",
    "IT Services",
    "Financial Regulation",
    "Telecommunications",
    "Critical Infrastructure",
  ];
  const incidentTypeOptions = [
    "Phishing",
    "Ransomware", 
    "Data Breach",
    "DDoS Attack",
    "APT Attack",
    "Insider Threat",
    "Malware",
    "Web Defacement",
    "SIM Swapping",
  ];
  const severityOptions = ["Critical", "High", "Medium", "Low"];

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    const updatedFilters = { ...filters };
    if (checked) {
      updatedFilters[category as keyof typeof filters] = [...filters[category as keyof typeof filters], value];
    } else {
      updatedFilters[category as keyof typeof filters] = filters[category as keyof typeof filters].filter(
        (item) => item !== value
      );
    }
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      years: [],
      sectors: [],
      incidentTypes: [],
      severities: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  const FilterSection = ({ title, options, category }: { title: string; options: string[]; category: string }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm text-academic-red">{title}</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-${option}`}
              checked={filters[category as keyof typeof filters].includes(option)}
              onCheckedChange={(checked) =>
                handleFilterChange(category, option, checked as boolean)
              }
            />
            <Label 
              htmlFor={`${category}-${option}`}
              className="text-sm cursor-pointer hover:text-academic-red"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {Object.values(filters).flat().length}
              </Badge>
            )}
          </span>
          <span className="text-sm text-muted-foreground">
            {filteredCount} of {totalIncidents}
          </span>
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className={`p-4 space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-academic-red" />
            <h3 className="font-semibold text-academic-red">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalIncidents} incidents
        </div>

        <Separator />

        <FilterSection title="Year" options={yearOptions} category="years" />
        
        <Separator />
        
        <FilterSection title="Sector" options={sectorOptions} category="sectors" />
        
        <Separator />
        
        <FilterSection title="Incident Type" options={incidentTypeOptions} category="incidentTypes" />
        
        <Separator />
        
        <FilterSection title="Severity" options={severityOptions} category="severities" />

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-academic-red">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([category, values]) =>
                  values.map((value) => (
                    <Badge
                      key={`${category}-${value}`}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleFilterChange(category, value, false)}
                    >
                      {value}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default FilterPanel;