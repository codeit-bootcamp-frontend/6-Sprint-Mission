import BestItemsSection from "./components/BestItemsSection";
import AllItemsSection from "./components/AllItemsSection";
import "./MarketPage.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MarketPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrapper">
        <BestItemsSection />
        <AllItemsSection />
      </div>
    </QueryClientProvider>
  );
}

export default MarketPage;
