import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export default function Index() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // Mock data - replace with actual Web3 integration
  const [stakedAmount] = useState("0.00");
  const [availableRewards] = useState("0.00");
  const [rewardRate] = useState("1.0");

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Implement wallet connection logic here
      setTimeout(() => {
        setIsConnected(true);
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected.",
        });
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

  const handleStake = async () => {
    setIsStaking(true);
    try {
      // Implement staking logic here
      toast({
        title: "Staking Successful",
        description: `Successfully staked ${stakeAmount} tokens.`,
      });
      setStakeAmount("");
    } catch (error) {
      toast({
        title: "Staking Failed",
        description: "Failed to stake tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    try {
      // Implement withdrawal logic here
      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrawn ${withdrawAmount} tokens.`,
      });
      setWithdrawAmount("");
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Failed to withdraw tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleClaim = async () => {
    setIsClaiming(true);
    try {
      // Implement claim rewards logic here
      toast({
        title: "Rewards Claimed",
        description: "Successfully claimed your rewards.",
      });
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Failed to claim rewards. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to GreenStake</h1>
            <p className="text-lg text-muted-foreground">
              Stake your tokens and earn rewards
            </p>
          </div>

          {!isConnected ? (
            <Card className="glass card-hover">
              <CardHeader className="text-center">
                <CardTitle>Connect Wallet</CardTitle>
                <CardDescription>
                  Connect your wallet to start staking or{" "}
                  <Button
                    variant="link"
                    className="px-0"
                    onClick={() => navigate("/signup")}
                  >
                    create an account
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardFooter className="justify-center">
                <Button
                  size="lg"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass card-hover">
                <CardHeader>
                  <CardTitle>Staking Overview</CardTitle>
                  <CardDescription>Your current staking status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Staked Amount:</span>
                    <span className="font-medium">{stakedAmount} Tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Rewards:</span>
                    <span className="font-medium">{availableRewards} GREEN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reward Rate:</span>
                    <span className="font-medium">{rewardRate}x</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={handleClaim}
                    disabled={isClaiming || availableRewards === "0.00"}
                  >
                    {isClaiming ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Claiming
                      </>
                    ) : (
                      "Claim Rewards"
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card className="glass card-hover">
                  <CardHeader>
                    <CardTitle>Stake Tokens</CardTitle>
                    <CardDescription>Enter amount to stake</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="input-ring"
                      />
                      <Button
                        onClick={handleStake}
                        disabled={isStaking || !stakeAmount}
                      >
                        {isStaking ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Staking
                          </>
                        ) : (
                          "Stake"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass card-hover">
                  <CardHeader>
                    <CardTitle>Withdraw Tokens</CardTitle>
                    <CardDescription>Enter amount to withdraw</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="input-ring"
                      />
                      <Button
                        onClick={handleWithdraw}
                        disabled={isWithdrawing || !withdrawAmount}
                      >
                        {isWithdrawing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Withdrawing
                          </>
                        ) : (
                          "Withdraw"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
