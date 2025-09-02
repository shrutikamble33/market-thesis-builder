import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, TrendingUp, Shield } from "lucide-react";
import { AllocationVisualizer } from "@/components/AllocationVisualizer";
import { CompoundGrowthChart } from "@/components/CompoundGrowthChart";
import { RiskManagement } from "@/components/RiskManagement";
import { StrategyBuilder } from "@/components/StrategyBuilder";

export interface PortfolioAllocation {
  name: string;
  percentage: number;
  color: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedReturn: number;
}

const defaultAllocation: PortfolioAllocation[] = [
  {
    name: "Core Growth Equity",
    percentage: 40,
    color: "hsl(215 85% 25%)",
    description: "Blue-chip growth stocks and ETFs",
    riskLevel: "Medium",
    expectedReturn: 12
  },
  {
    name: "Swing/Algorithmic Trading",
    percentage: 20,
    color: "hsl(195 75% 35%)",
    description: "Active trading strategies",
    riskLevel: "High",
    expectedReturn: 18
  },
  {
    name: "Options Income Strategies",
    percentage: 15,
    color: "hsl(142 76% 36%)",
    description: "Covered calls, cash-secured puts",
    riskLevel: "Medium",
    expectedReturn: 15
  },
  {
    name: "Private/Alternative Investments",
    percentage: 15,
    color: "hsl(45 93% 47%)",
    description: "REITs, commodities, crypto",
    riskLevel: "High",
    expectedReturn: 16
  },
  {
    name: "Real Estate",
    percentage: 10,
    color: "hsl(0 84% 60%)",
    description: "Direct real estate, REITs",
    riskLevel: "Low",
    expectedReturn: 8
  }
];

const Portfolio = () => {
  const [allocation, setAllocation] = useState<PortfolioAllocation[]>(defaultAllocation);
  const [targetCAGR, setTargetCAGR] = useState(13.5);
  const [initialInvestment, setInitialInvestment] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(2000);

  const calculateWeightedReturn = () => {
    return allocation.reduce((acc, item) => acc + (item.percentage / 100) * item.expectedReturn, 0);
  };

  const portfolioReturn = calculateWeightedReturn();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Portfolio Strategy Builder
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-6">
              Create and optimize your portfolio strategy for consistent 12-15% CAGR with smart risk management
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Target: {targetCAGR}% CAGR</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Current: {portfolioReturn.toFixed(1)}% Expected</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Diversified Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Strategy Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Portfolio Allocation</h2>
              <AllocationVisualizer 
                allocation={allocation}
                onAllocationChange={setAllocation}
              />
            </Card>

            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Compound Growth Projection</h2>
              <CompoundGrowthChart
                initialInvestment={initialInvestment}
                monthlyContribution={monthlyContribution}
                annualReturn={portfolioReturn}
                years={20}
              />
            </Card>
          </div>

          {/* Strategy Builder */}
          <Card className="p-6 shadow-lg">
            <StrategyBuilder
              allocation={allocation}
              onAllocationChange={setAllocation}
              targetCAGR={targetCAGR}
              onTargetCAGRChange={setTargetCAGR}
              initialInvestment={initialInvestment}
              onInitialInvestmentChange={setInitialInvestment}
              monthlyContribution={monthlyContribution}
              onMonthlyContributionChange={setMonthlyContribution}
            />
          </Card>

          {/* Risk Management */}
          <Card className="p-6 shadow-lg">
            <RiskManagement allocation={allocation} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;