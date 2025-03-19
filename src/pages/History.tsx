
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoSummary } from "@/components/VideoSummary";
import { VideoSummaryData, getUserHistory } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<VideoSummaryData[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userHistory = await getUserHistory();
        setHistory(userHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
        toast({
          title: "Error",
          description: "Failed to load your search history. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, [toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your History</h1>
              <p className="text-muted-foreground">Your previous video summaries</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-full p-6 rounded-lg border">
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="pt-4">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  </div>
                </div>
              ))
            ) : history.length > 0 ? (
              history.map((video) => (
                <VideoSummary
                  key={video.id}
                  title={video.title}
                  summary={video.summary}
                  keyPoints={video.keyPoints}
                  videoUrl={video.videoUrl}
                  isLoggedIn={true}
                  isSaved={true}
                />
              ))
            ) : (
              <div className="text-center py-12 space-y-4 rounded-lg border border-dashed border-border">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium">No history yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your search history will appear here once you start using the app
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
