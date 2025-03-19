
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface VideoSearchProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function VideoSearch({ onSearch, isLoading = false }: VideoSearchProps) {
  const [query, setQuery] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter a YouTube video title or topic to get started",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter YouTube video title or search term..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-24 py-6 text-base rounded-full shadow-sm border-input"
        />
        <Button 
          type="submit" 
          className="absolute right-1.5 rounded-full py-5"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching
            </>
          ) : (
            "Get Summary"
          )}
        </Button>
      </div>
    </form>
  );
}
