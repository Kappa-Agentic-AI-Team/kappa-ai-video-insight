
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, Search, Clock, BookOpen, ArrowRight } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useMemo } from "react";

const Index = () => {
  const {auth, logout} = useAuth();
  const userLoggedIn = useMemo(() => !!auth.id, [auth]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-secondary/70 to-background"></div>
          <div className="absolute inset-0 z-[1] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
          
          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Understand YouTube videos without watching them
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Get Video Insights in <span className="text-primary">Seconds</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI instantly analyzes YouTube videos, giving you concise summaries and key points, 
                so you can understand content without investing your valuable time.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                {!userLoggedIn ? (
                  <>
                    <Link to="/app">
                      <Button size="lg" className="rounded-full px-8">
                        Try as Guest <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" size="lg" className="rounded-full px-8">
                        Sign Up Free
                      </Button>
                    </Link>
                  </>
                ):(
                <Link to="/search">
                  <Button size="lg" className="rounded-full px-8">
                    Get Started
                  </Button>
                </Link>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 bg-secondary/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform uses advanced AI to analyze YouTube videos and provide you with comprehensive summaries and insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg glass-card animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Search for Content</h3>
                <p className="text-muted-foreground">
                  Enter any YouTube video title or topic, and our system will find the most relevant content.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg glass-card animate-fade-up" style={{ animationDelay: "200ms" }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI instantly analyzes the video, extracting the main themes, key points, and essential information.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg glass-card animate-fade-up" style={{ animationDelay: "300ms" }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Summary</h3>
                <p className="text-muted-foreground">
                  Review the comprehensive summary and key points, with the option to save for later or have it read aloud.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 space-y-6 animate-fade-up">
                <h2 className="text-3xl font-bold">Save Time Without Missing Out</h2>
                <p className="text-muted-foreground">
                  With KappaAI VideoInsight, you can stay informed about the latest content without spending hours watching videos. 
                  Our summaries give you the essence of any video in just seconds.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span>Save hours of watching time while getting the key information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span>Stay updated on trending content without the time investment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span>Quickly decide which videos are worth your full attention</span>
                  </li>
                </ul>
                
                <div className="pt-4">
                  <Link to="/register">
                    <Button className="rounded-full">Get Started Free</Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 rounded-lg overflow-hidden glass-card h-80 animate-fade-up">
                <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-primary/20">
                  <div className="absolute inset-6 rounded border border-primary/20 bg-white/50 backdrop-blur-sm shadow-lg flex flex-col">
                    <div className="p-4 border-b">
                      <div className="h-6 w-3/4 bg-primary/10 rounded animate-pulse-subtle"></div>
                    </div>
                    <div className="p-4 flex-grow">
                      <div className="space-y-2">
                        <div className="h-4 bg-primary/10 rounded w-full animate-pulse-subtle"></div>
                        <div className="h-4 bg-primary/10 rounded w-5/6 animate-pulse-subtle"></div>
                        <div className="h-4 bg-primary/10 rounded w-4/5 animate-pulse-subtle"></div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-primary/20"></div>
                            <div className="h-3 bg-primary/10 rounded w-3/4 animate-pulse-subtle"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-primary/20"></div>
                            <div className="h-3 bg-primary/10 rounded w-4/5 animate-pulse-subtle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-primary/5">
          <div className="container max-w-4xl mx-auto text-center space-y-6 animate-fade-up">
            <h2 className="text-3xl font-bold">Ready to Save Time?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who are already saving hours every week by using KappaAI VideoInsight.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/app">
                <Button variant="default" size="lg" className="rounded-full px-8">
                  Try as Guest
                </Button>
              </Link>
              
              <Link to="/register">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
