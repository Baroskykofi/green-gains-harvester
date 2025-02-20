
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function Navbar() {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

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
          {session ? (
            <>
              <Button variant="outline">Connect Wallet</Button>
              <Link to="/profile">
                <Button variant="ghost">
                  <UserCircle className="h-5 w-5 mr-2" />
                  Profile
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
