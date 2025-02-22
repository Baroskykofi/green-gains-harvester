
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "./providers/WagmiProvider";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
