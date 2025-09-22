import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search..." }: SearchBarProps) => {
  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 transition-colors group-focus-within:text-academic-red" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-12 pr-4 py-3 w-full h-12 text-base glass-card border border-white/20 backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-xl focus:border-academic-red/50 focus:ring-academic-red/20 placeholder:text-muted-foreground/70 transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;