
import { toast } from "@/hooks/use-toast";
import { VideoSummaryData } from "@/utils/mockData";

// Base API URL - would be replaced with actual backend URL in production
const API_BASE_URL = 'http://127.0.0.1:8000';
// const API_BASE_URL = "https://kappa-financial-advice-system-backend.onrender.com";

// Helper for making authenticated requests
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    // ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `Request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    toast({
      title: "Request Failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    throw error;
  }
};

// Authentication APIs
export const authApi = {
  login: async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    return fetchWithAuth('/login', {
      method: 'POST',
      body: formData.toString(),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  
  register: async (username: string, password: string, first_name: string, last_name: string, image:string="") => {
    return fetchWithAuth('/register', {
      method: 'POST',
      body: JSON.stringify({ username, name: username, password, first_name, last_name, image })
    });
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  }
};

function extractUrl(text: string): string | null {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches ? matches[0] : null;
}

export const videoAPI = {
  searchSummarize: async (text: string): Promise<VideoSummaryData|null> => {
    try{
      
      const {response, formatted_response} = await fetchWithAuth('/search-and-summarize', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      return {
        id: '',
        title: text,
        summary: response,
        formattedSummary: formatted_response,
        keyPoints: [],
        videoUrl: extractUrl(response),
        timestamp: Date.now()
      };
    }catch(error){
      console.error('Error summarizing video text:', error);
    }
    return null;
  },

  userSearchSummarize: async (username:string,password:string,text: string): Promise<VideoSummaryData|null> => {
    try{
      
      const {response, formatted_response} = await fetchWithAuth('/user-search', {
        method: 'POST',
        body: JSON.stringify({ username, password, text })
      });
      return {
        id: '',
        title: text,
        summary: response,
        formattedSummary: formatted_response,
        keyPoints: [],
        videoUrl: extractUrl(response),
        timestamp: Date.now()
      };
    }catch(error){
      console.error('Error summarizing video text:', error);
    }
    return null;
  },

  translate: async (text: string, languageCode: string): Promise<{text: string, formattedText: string}|null> => {
    try{
      
      const {response, formatted_response} = await fetchWithAuth('/translate', {
        method: 'POST',
        body: JSON.stringify({ text, languageCode })
      });
      return {
        text: response,
        formattedText: formatted_response
      };
    }catch(error){
      console.error('Error fetching stock news:', error);
    }
    return null;
  },

  fetchSearchHistory: async (userId: string): Promise<Array<VideoSummaryData>> => {
    try{
      
      const {response} = await fetchWithAuth(`/get_search/history?user_id=${userId}`, {
        method: 'POST',
        body: JSON.stringify({ user_id: userId })
      });
      if(response){
        return response.map(r=>({
          id: '',
          title: r['Query'],
          summary: r['Summary'],
          formattedSummary: r['FormattedSummary'],
          keyPoints: [],
          videoUrl: extractUrl(r['Summary']),
          timestamp: Date.now()
        }))
      }
      return [];
    }catch(error){
      console.error('Error summarizing video text:', error);
    }
    return null;
  },
  
};
