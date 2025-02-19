import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Sun, Wind, Droplets } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";

type Project = {
  id: string;
  title: string;
  description: string;
  project_type: 'solar' | 'wind' | 'hydro';
  location: string;
  total_funding_target: number;
  current_funding: number;
  image_url: string | null;
  estimated_roi: number;
  status: string;
};

export default function Projects() {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data as Project[];
    },
  });

  const getProjectIcon = (type: Project['project_type']) => {
    switch (type) {
      case 'solar':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'wind':
        return <Wind className="w-8 h-8 text-blue-500" />;
      case 'hydro':
        return <Droplets className="w-8 h-8 text-blue-400" />;
    }
  };

  const handleStake = async (project: Project) => {
    setIsStaking(true);
    try {
      const amount = parseFloat(stakeAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Please connect your wallet first");
      }

      const { error } = await supabase
        .from('stakes')
        .insert({
          project_id: project.id,
          amount: amount,
          user_id: user.id,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Stake Successful",
        description: `You have successfully staked ${amount} tokens in ${project.title}`,
      });

      setStakeAmount("");
      setSelectedProject(null);
    } catch (error: any) {
      toast({
        title: "Stake Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Renewable Energy Projects</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project) => (
                <Card key={project.id} className="glass card-hover">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {getProjectIcon(project.project_type)}
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.location}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">{project.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Target Funding</p>
                          <p className="font-medium">${project.total_funding_target.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Current Funding</p>
                          <p className="font-medium">${project.current_funding.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estimated ROI</p>
                          <p className="font-medium text-green-600">{project.estimated_roi}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Progress</p>
                          <p className="font-medium">
                            {((project.current_funding / project.total_funding_target) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          onClick={() => setSelectedProject(project)}
                        >
                          Stake Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Stake in {project.title}</DialogTitle>
                          <DialogDescription>
                            Enter the amount you want to stake in this project.
                            Expected ROI: {project.estimated_roi}%
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Input
                              type="number"
                              placeholder="Enter stake amount"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            disabled={isStaking}
                            onClick={() => handleStake(project)}
                          >
                            {isStaking ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Staking...
                              </>
                            ) : (
                              "Confirm Stake"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
