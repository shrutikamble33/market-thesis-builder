import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { StockAnalysisForm } from "@/components/StockAnalysisForm";
import { InvestmentThesis } from "@/components/InvestmentThesis";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export interface ThesisData {
  company: {
    name: string;
    ticker: string;
    industry: string;
    sector: string;
    businessModel: string;
    keyProducts: string;
    recentPerformance: string;
  };
  rationale: {
    growthDrivers: string;
    competitiveAdvantages: string;
    industryTrends: string;
  };
  catalysts: string[];
  risks: {
    risks: string;
    mitigants: string;
  };
  valuation: {
    currentPrice: number;
    targetPrice: number;
    method: string;
    upside: number;
    downside: number;
  };
  horizon: {
    shortTerm: string;
    longTerm: string;
    exitCriteria: string;
  };
  finalThesis: string;
  recommendation: 'BUY' | 'HOLD' | 'SELL';
}

const Index = () => {
  const [analysisData, setAnalysisData] = useState<ThesisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchParams] = useSearchParams();

  // Auto-analyze if ticker and market are provided via URL params
  useEffect(() => {
    const ticker = searchParams.get('ticker');
    const market = searchParams.get('market');
    
    if (ticker && market && !analysisData && !isAnalyzing) {
      handleAnalysis(ticker, market);
    }
  }, [searchParams, analysisData, isAnalyzing]);

  const handleAnalysis = async (ticker: string, market: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock data generation based on ticker
    const mockData: ThesisData = {
      company: {
        name: `${ticker.toUpperCase()} Corporation`,
        ticker: ticker.toUpperCase(),
        industry: "Technology",
        sector: "Software & Services",
        businessModel: "Leading technology company providing innovative solutions across multiple segments with recurring revenue streams and strong market position.",
        keyProducts: "Cloud services, enterprise software, AI solutions, and digital platforms serving millions of users globally.",
        recentPerformance: `Strong FY2024 performance with revenue growth of 15-25% YoY, expanding margins, and solid cash generation. ${market} market leadership maintained.`
      },
      rationale: {
        growthDrivers: "Digital transformation acceleration, cloud adoption, AI integration, expanding market share in emerging segments.",
        competitiveAdvantages: "Strong brand recognition, extensive ecosystem, R&D capabilities, strategic partnerships, and market leadership position.",
        industryTrends: "Continued digital transformation, AI adoption, remote work trends, and increasing demand for cloud-based solutions."
      },
      catalysts: [
        "Product launches and feature expansions",
        "Strategic acquisitions and partnerships", 
        "Market expansion into new geographies",
        "AI and automation integration"
      ],
      risks: {
        risks: "Market competition, regulatory changes, economic downturn impact, technology disruption, and execution risks.",
        mitigants: "Diversified revenue streams, strong balance sheet, continuous innovation, strategic positioning, and risk management frameworks."
      },
      valuation: {
        currentPrice: Math.floor(Math.random() * 200) + 50,
        targetPrice: Math.floor(Math.random() * 250) + 100,
        method: "DCF analysis and peer comparison methodology",
        upside: Math.floor(Math.random() * 30) + 10,
        downside: Math.floor(Math.random() * 20) + 5
      },
      horizon: {
        shortTerm: "Continued execution on strategic initiatives with steady performance expected over next 12 months.",
        longTerm: "Strong secular growth trends support long-term value creation over 3-5 year horizon.",
        exitCriteria: "Loss of competitive position, structural market changes, or valuation reaching fair value targets."
      },
      finalThesis: `${ticker.toUpperCase()} represents a compelling investment opportunity with strong fundamentals, clear growth catalysts, and attractive risk-reward profile in the current market environment.`,
      recommendation: Math.random() > 0.3 ? 'BUY' : Math.random() > 0.5 ? 'HOLD' : 'SELL'
    };
    
    setAnalysisData(mockData);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Investment Thesis Portal
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
            Professional stock analysis and investment thesis generation for US, UK, and European markets
          </p>
          <Link to="/research">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Search className="w-4 h-4 mr-2" />
              Explore Stock Research
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Analysis Form */}
          <Card className="shadow-card">
            <StockAnalysisForm 
              onAnalyze={handleAnalysis}
              isAnalyzing={isAnalyzing}
            />
          </Card>

          {/* Results */}
          {analysisData && (
            <InvestmentThesis data={analysisData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;