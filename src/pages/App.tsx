
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoSearch } from "@/components/VideoSearch";
import { VideoSummary } from "@/components/VideoSummary";
import { VideoSummaryData, searchVideo } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoSummaryData | null>(null);
  const { toast } = useToast();
  
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      const result = await searchVideo(query);
      setVideoData(result);
    } catch (error) {
      console.error("Error searching for video:", error);
      toast({
        title: "Error",
        description: "Failed to search for video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-down">
            <h1 className="text-3xl font-bold mb-2">Understand YouTube Videos in Seconds</h1>
            <p className="text-muted-foreground">
              Enter a YouTube video title or topic to get an instant summary and key points
            </p>
          </div>
          
          <div className="mb-12 animate-fade-up">
            <VideoSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
          
          {videoData ? (
            <div className="animate-fade-up">
              <VideoSummary
                title={videoData.title}
                summary={videoData.summary}
                keyPoints={videoData.keyPoints}
                videoUrl={videoData.videoUrl}
              />
            </div>
          ) : (
            <div className="text-center py-12 space-y-4 rounded-lg border border-dashed border-border animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">No results yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a YouTube video title or search term above to get started with your first summary
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
