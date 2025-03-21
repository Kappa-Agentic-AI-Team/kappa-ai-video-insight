
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoSearch } from "@/components/VideoSearch";
import { VideoSummary } from "@/components/VideoSummary";
import { VideoSummaryData, searchVideo, saveVideoToHistory, isUserLoggedIn } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { videoAPI } from "@/services/api";
import useAuth from "@/hooks/useAuth";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoSummary, setVideoSummary] = useState<VideoSummaryData | null>(null);
  const { toast } = useToast();
  const {auth} = useAuth();
  const {searchSummarize, userSearchSummarize} = videoAPI;
  
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      let result;
      if(auth.id){
        result = await userSearchSummarize(auth.username, auth.password, query);
      }else{
        result = await searchSummarize(query)
      }
      setVideoSummary(result);
    } catch (error) {
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
            <h1 className="text-3xl font-bold mb-2">Search YouTube Videos</h1>
            <p className="text-muted-foreground">
              Find and summarize any YouTube video with a simple search
              {auth.id && " - your searches will be saved to your history"}
            </p>
          </div>
          
          <div className="mb-12 animate-fade-up">
            <VideoSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
          
          {videoSummary ? (
            <div className="animate-fade-up">
              <VideoSummary
                title={videoSummary.title}
                summary={videoSummary.summary}
                formattedSummary={videoSummary.formattedSummary}
                videoUrl={videoSummary.videoUrl}
                isLoggedIn={!!auth.id}
                isSaved={!!auth.id}
                onSave={() => toast({ 
                  title: "Already saved", 
                  description: "This video is already in your history" 
                })}
              />
            </div>
          ) : (
            <div className="text-center py-12 space-y-4 rounded-lg border border-dashed border-border animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Ready to discover</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a YouTube video title or search term above to get a detailed summary
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
