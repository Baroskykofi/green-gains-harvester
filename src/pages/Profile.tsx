
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, CoinsIcon, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

type Stake = {
  amount: number;
  created_at: string;
  project: {
    title: string;
    project_type: string;
    estimated_roi: number;
  };
};

export default function Profile() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/signin");
    }
  };

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  const { data: stakes, isLoading: isLoadingStakes } = useQuery({
    queryKey: ['user-stakes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('stakes')
        .select(`
          amount,
          created_at,
          project:projects (
            title,
            project_type,
            estimated_roi
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      return data as Stake[];
    },
  });

  const totalInvestment = stakes?.reduce((sum, stake) => sum + stake.amount, 0) || 0;

  if (isLoadingProfile || isLoadingStakes) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback>
                    {profile?.full_name?.[0] || profile?.username?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profile?.full_name || 'Anonymous'}</CardTitle>
                  <CardDescription>@{profile?.username || 'user'}</CardDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="ml-auto"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <CoinsIcon className="h-5 w-5 text-yellow-500" />
                      <span className="text-2xl font-bold">${totalInvestment.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Stakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-2xl font-bold">{stakes?.length || 0}</span>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Staking History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stakes?.map((stake, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">{stake.project.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(stake.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${stake.amount.toLocaleString()}</p>
                        <p className="text-sm text-green-600">ROI: {stake.project.estimated_roi}%</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {!stakes?.length && (
                  <p className="text-center text-muted-foreground py-4">
                    No staking history yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
