import { useState } from "react";
import { Link } from "react-router-dom";
import { StockScreener } from "@/components/StockScreener";
import { StockResultsTable } from "@/components/StockResultsTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";

export interface StockData {
  ticker: string;
  name: string;
  market: string;
  sector: string;
  marketCap: number;
  price: number;
  return1M: number;
  return3M: number;
  return12M: number;
  returnYTD: number;
  peRatio: number;
  pbRatio: number;
  psRatio: number;
  debtToEquity: number;
  dividendYield: number;
  roe: number;
}

export interface ScreeningFilters {
  market: string[];
  sector: string[];
  marketCapMin: number;
  marketCapMax: number;
  return12MMin: number;
  return12MMax: number;
  peRatioMin: number;
  peRatioMax: number;
  dividendYieldMin: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const Research = () => {
  const [filters, setFilters] = useState<ScreeningFilters>({
    market: [],
    sector: [],
    marketCapMin: 0,
    marketCapMax: 10000000,
    return12MMin: -100,
    return12MMax: 1000,
    peRatioMin: 0,
    peRatioMax: 100,
    dividendYieldMin: 0,
    sortBy: 'return12M',
    sortOrder: 'desc'
  });

  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [isScreening, setIsScreening] = useState(false);

  const handleScreening = (newFilters: ScreeningFilters) => {
    setFilters(newFilters);
    setIsScreening(true);
    
    // Simulate API call
    setTimeout(() => {
      // This will be populated by the StockScreener component
      setIsScreening(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Analysis
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Stock Research & Screening</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            Discover investment opportunities with advanced stock screening and filtering tools
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stock Screener */}
          <Card className="shadow-card">
            <StockScreener 
              onScreen={handleScreening}
              isScreening={isScreening}
              filters={filters}
            />
          </Card>

          {/* Results Table */}
          <StockResultsTable 
            stocks={filteredStocks}
            isLoading={isScreening}
            onUpdateResults={setFilteredStocks}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
};

export default Research;