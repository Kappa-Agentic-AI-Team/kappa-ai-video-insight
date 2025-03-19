
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full py-8 px-6 border-t bg-secondary/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">KappaAI VideoInsight</h3>
            <p className="text-muted-foreground text-sm">
              Understand YouTube videos without watching them. Save time and stay informed.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/app" className="text-sm hover:text-primary transition-colors">Try as Guest</Link></li>
              <li><Link to="/register" className="text-sm hover:text-primary transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="text-sm hover:text-primary transition-colors">Login</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KappaAI VideoInsight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
