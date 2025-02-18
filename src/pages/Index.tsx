
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wind, Sun, Droplets, FileStack, Globe2, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function Index() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Implement wallet connection logic here
      setTimeout(() => {
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected.",
        });
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Invest in a Greener Future
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join GreenStake and participate in renewable energy projects while earning rewards through decentralized staking.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/signup")}>
                Create Account
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Sustainable Investment Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="glass card-hover">
                <CardHeader>
                  <Sun className="w-12 h-12 text-yellow-500 mb-4" />
                  <CardTitle>Solar Farms</CardTitle>
                  <CardDescription>
                    Invest in large-scale solar energy projects powering communities.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="glass card-hover">
                <CardHeader>
                  <Wind className="w-12 h-12 text-blue-500 mb-4" />
                  <CardTitle>Wind Energy</CardTitle>
                  <CardDescription>
                    Support wind turbine farms generating clean electricity.
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="glass card-hover">
                <CardHeader>
                  <Droplets className="w-12 h-12 text-blue-400 mb-4" />
                  <CardTitle>Hydroelectric</CardTitle>
                  <CardDescription>
                    Fund hydroelectric power plants for sustainable energy generation.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose GreenStake?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass card-hover">
                <CardHeader>
                  <Globe2 className="w-12 h-12 text-green-500 mb-4" />
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>
                    Make a real difference in the fight against climate change through direct investment in renewable energy.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass card-hover">
                <CardHeader>
                  <PiggyBank className="w-12 h-12 text-purple-500 mb-4" />
                  <CardTitle>Earn Rewards</CardTitle>
                  <CardDescription>
                    Receive staking rewards while supporting sustainable energy projects.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="glass card-hover">
                <CardHeader>
                  <FileStack className="w-12 h-12 text-blue-500 mb-4" />
                  <CardTitle>Transparent & Secure</CardTitle>
                  <CardDescription>
                    All investments are recorded on the blockchain, ensuring transparency and security.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Investing in Green Energy?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of investors already making a difference while earning rewards.
            </p>
            <Button size="lg" onClick={() => navigate("/signup")} className="animate-pulse">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 GreenStake. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
