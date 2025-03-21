
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, BookmarkCheck, Copy, Check, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LanguageSelector } from "./LanguageSelector";
import { translateText, translateArray } from "@/utils/translationService";
import { videoAPI } from "@/services/api";

interface VideoSummaryProps {
  title: string;
  summary: string;
  formattedSummary: string,
  keyPoints?: string[];
  videoUrl?: string;
  isLoggedIn?: boolean;
  isSaved?: boolean;
  onSave?: () => void;
}

export function VideoSummary({ 
  title, 
  summary, 
  keyPoints, 
  videoUrl, 
  isLoggedIn = false,
  isSaved = false,
  onSave,
  formattedSummary
}: VideoSummaryProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedSummary, setTranslatedSummary] = useState(summary);
  const [translatedFormattedSummary, setTranslatedFormattedSummary] = useState(formattedSummary);
  const [isTranslating, setIsTranslating] = useState(false);
  const {translate} = videoAPI;
  
  useEffect(() => {
    const translateContent = async () => {
      if (selectedLanguage === "en") {
        setTranslatedTitle(title);
        setTranslatedSummary(summary);
        setTranslatedFormattedSummary(formattedSummary)
        return;
      }
      
      setIsTranslating(true);
      
      try {
        const response = await translate(summary, selectedLanguage);
        
        setTranslatedSummary(response.text);
        setTranslatedFormattedSummary(response.formattedText);
      } catch (error) {
        console.error("Translation error:", error);
        toast({
          title: "Translation failed",
          description: "Could not translate the content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsTranslating(false);
      }
    };
    
    translateContent();
  }, [selectedLanguage, title, summary, toast]);
  
  const handleCopy = () => {
    // const textToCopy = `${translatedTitle}\n\nSummary:\n${translatedSummary}\n\nKey Points:\n${translatedKeyPoints.map(point => `• ${point}`).join('\n')}\n\nVideo: ${videoUrl}`;
    const textToCopy = `${translatedTitle}\n\nSummary:\n${translatedSummary}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Summary content has been copied to your clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleTextToSpeech = () => {
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `${translatedTitle}. ${translatedSummary}`;
      // utterance.text = `Summary of ${translatedTitle}. ${translatedSummary}. Key Points: ${translatedKeyPoints.join('. ')}`;

      utterance.rate = 1;
      
      // Set language for speech synthesis
      utterance.lang = selectedLanguage;
      
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  const handleLanguageChange = (languageCode: string) => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    setSelectedLanguage(languageCode);
  };
  
  return (
    <Card className="w-full overflow-hidden animate-fade-up">
      <CardHeader className="bg-secondary/50">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <CardTitle className="line-clamp-2">{translatedTitle.toUpperCase()}</CardTitle>
            {
              videoUrl &&
                <CardDescription>
                  <a 
                    href={videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    View original video <ExternalLink className="h-3 w-3" />
                  </a>
              </CardDescription>
            }
            
          </div>
          <LanguageSelector 
            selectedLanguage={selectedLanguage} 
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        {isTranslating ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-secondary rounded w-3/4"></div>
            <div className="h-4 bg-secondary rounded w-full"></div>
            <div className="h-4 bg-secondary rounded w-5/6"></div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <p className="text-muted-foreground" dangerouslySetInnerHTML={{__html: translatedFormattedSummary}}></p>
            </div>
            
            {/* <div>
              <h3 className="text-lg font-medium mb-2">Key Points</h3>
              <ul className="space-y-2">
                {translatedKeyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div> */}
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 justify-between border-t p-4 bg-background">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} disabled={isTranslating}>
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleTextToSpeech} disabled={isTranslating}>
            {isSpeaking ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
            {isSpeaking ? "Stop Speaking" : "Read Aloud"}
          </Button>
        </div>
        
        {isLoggedIn && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSave}
            className={isSaved ? "text-primary" : ""}
            disabled={isTranslating}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 mr-1" /> Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 mr-1" /> Save
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
