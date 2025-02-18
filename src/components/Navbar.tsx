
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Button
            variant="link"
            className="font-bold text-xl"
            onClick={() => navigate("/")}
          >
            GreenStake
          </Button>
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
            >
              Dashboard
            </Button>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
