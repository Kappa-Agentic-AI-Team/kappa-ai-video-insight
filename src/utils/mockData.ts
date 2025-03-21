
export interface VideoSummaryData {
  id: string;
  title: string;
  summary: string;
  formattedSummary?: string,
  keyPoints: string[];
  videoUrl: string;
  timestamp: number;
}

// Mock function to determine if a user is logged in
export function isUserLoggedIn(): boolean {
  // In a real app, this would check authentication state
  // For demo purposes, return a fixed value
  return true; // Set to true to simulate a logged-in user
}

// Mock data for video summaries
export const mockSummaries: VideoSummaryData[] = [
  {
    id: "1",
    title: "Love in Every Word (Odogwu Paranra) by Omoni Oboli",
    summary: "Love in Every Word (Odogwu Paranra) is a romantic comedy directed by Omoni Oboli. The film follows the story of a successful businesswoman who falls in love with a charming but less affluent man, challenging societal expectations and family pressures. As their relationship develops, they face obstacles related to class differences and family acceptance, with themes of love transcending social barriers and staying true to one's heart despite external pressures.",
    keyPoints: [
      "The film stars Omoni Oboli in the lead role alongside other prominent Nollywood actors",
      "Cultural elements and traditional Nigerian values play a significant role in the storyline",
      "The movie explores themes of love, social class differences, and family expectations",
      "There are compelling scenes that showcase Nigerian wedding traditions and ceremonies",
      "The ending delivers a powerful message about choosing love over material wealth and social status"
    ],
    videoUrl: "https://www.youtube.com/watch?v=example1",
    timestamp: Date.now() - 1000000
  },
  {
    id: "2",
    title: "How to Build a Successful Tech Startup in Africa",
    summary: "This comprehensive guide discusses the unique challenges and opportunities for tech entrepreneurs in Africa. The video covers essential strategies for securing funding in an environment with limited venture capital, building products that address specifically African problems, and navigating regulatory complexities across different countries. It also highlights success stories from African tech ecosystems like Nigeria, Kenya, and South Africa.",
    keyPoints: [
      "Focus on solving real local problems rather than copying Western solutions",
      "Build strong relationships with local investors and international funds focused on African markets",
      "Create a diverse team with complementary skills and local market knowledge",
      "Understand and prepare for the unique infrastructure challenges like inconsistent internet and power",
      "Develop flexible payment solutions that work for unbanked or underbanked populations"
    ],
    videoUrl: "https://www.youtube.com/watch?v=example2",
    timestamp: Date.now() - 2000000
  },
  {
    id: "3",
    title: "Traditional African Cooking Methods Explained",
    summary: "This educational video explores the rich culinary heritage of various African regions, focusing on traditional cooking methods that have been preserved for generations. From the unique clay pot cooking of West Africa to the underground earth ovens of East Africa, the video demonstrates how these techniques enhance flavor and preserve nutrients. The presenter also discusses how modern African chefs are reimagining these ancient methods for contemporary cuisine.",
    keyPoints: [
      "Clay pot cooking imparts a distinctive earthy flavor to stews and soups",
      "Many traditional methods require minimal fuel, making them environmentally sustainable",
      "Fermentation techniques are widely used to preserve food and create complex flavors",
      "Smoking and drying methods vary significantly across different regions and climates",
      "Traditional cooking tools like wooden mortars and pestles extract unique flavors from ingredients"
    ],
    videoUrl: "https://www.youtube.com/watch?v=example3",
    timestamp: Date.now() - 3000000
  }
];

// Simulate API request delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock search function
export async function searchVideo(query: string): Promise<VideoSummaryData> {
  // Simulate API delay
  await delay(2000);
  
  // For demo purposes, always return the first mock summary
  // In a real app, this would search for videos based on the query
  return mockSummaries[0];
}

// Mock history function for logged in users
export async function getUserHistory(): Promise<VideoSummaryData[]> {
  // Simulate API delay
  await delay(1000);
  
  // Return mock summaries as user history
  return mockSummaries;
}

// Mock save function
export async function saveVideoToHistory(videoId: string): Promise<boolean> {
  // Simulate API delay
  await delay(500);
  
  // In a real app, this would save the video to the user's history
  return true;
}
