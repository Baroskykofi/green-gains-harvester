
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-green-600">
            GreenStake
          </Link>
          <Link to="/projects">
            <Button variant="ghost">Projects</Button>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost">Connect Wallet</Button>
        </div>
      </div>
    </nav>
  );
}
