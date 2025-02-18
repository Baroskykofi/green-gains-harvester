import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function Signup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Implement signup logic here
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <Card className="w-full max-w-md glass card-hover">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign up</CardTitle>
              <CardDescription className="text-center">
                Create an account to start staking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="input-ring"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="input-ring"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="input-ring"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Already have an account? Sign in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
