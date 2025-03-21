
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Play, Search, History as HistoryIcon } from "lucide-react";
import { isUserLoggedIn } from "@/utils/mockData";
import useAuth from "@/hooks/useAuth";
import { useMemo } from "react";

export function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const {auth, logout} = useAuth();
  const userLoggedIn = useMemo(()=>!!auth.id, [auth]);
  const navigate = useNavigate();
  
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b backdrop-blur-sm bg-background/80 fixed top-0 z-50 transition-all duration-300">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Play className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">KappaAI VideoInsight</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {userLoggedIn ? (
          <>
            {location.pathname !== "/search" && (
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </Link>
            )}
            {location.pathname !== "/history" && (
              <Link to="/history">
                <Button variant="ghost" size="sm">
                  <HistoryIcon className="mr-2 h-4 w-4" />
                  History
                </Button>
              </Link>
            )}
            <Link to="/login">
              <Button onClick={()=>{
                logout();
                navigate('/login')
              }} variant="default" size="sm" className="animate-pulse-subtle">Logout</Button>
            </Link>
          </> 
         ): (
          <>
            {location.pathname !== "/search" && (
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Try as Guest
                </Button>
              </Link>
            )}
            {location.pathname !== "/login" && location.pathname !== "/register" && (
              <Link to="/register">
                <Button variant="default" size="sm" className="animate-pulse-subtle">Sign Up</Button>
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
