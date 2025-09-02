import { PortfolioAllocation } from '@/pages/Portfolio';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  Calendar,
  Target,
  Percent
} from 'lucide-react';

interface RiskManagementProps {
  allocation: PortfolioAllocation[];
}

export const RiskManagement = ({ allocation }: RiskManagementProps) => {
  const calculateRiskMetrics = () => {
    const totalRisk = allocation.reduce((acc, item) => {
      const riskWeight = item.riskLevel === 'Low' ? 1 : item.riskLevel === 'Medium' ? 2 : 3;
      return acc + (item.percentage / 100) * riskWeight;
    }, 0);

    const maxSinglePosition = Math.max(...allocation.map(item => item.percentage));
    const riskDiversification = allocation.length;
    const expectedVolatility = allocation.reduce((acc, item) => {
      const volatility = item.riskLevel === 'Low' ? 8 : item.riskLevel === 'Medium' ? 15 : 25;
      return acc + (item.percentage / 100) * volatility;
    }, 0);

    return {
      overallRisk: totalRisk,
      maxPosition: maxSinglePosition,
      diversification: riskDiversification,
      expectedVolatility: expectedVolatility,
      sharpeRatio: (allocation.reduce((acc, item) => acc + (item.percentage / 100) * item.expectedReturn, 0) - 3) / expectedVolatility
    };
  };

  const riskMetrics = calculateRiskMetrics();

  const riskRules = [
    {
      rule: "Maximum Single Position",
      current: `${riskMetrics.maxPosition.toFixed(1)}%`,
      limit: "5.0%",
      status: riskMetrics.maxPosition <= 5 ? "pass" : "warning",
      description: "No single stock should exceed 5% of portfolio"
    },
    {
      rule: "Sector Concentration",
      current: "15.0%",
      limit: "15.0%",
      status: "pass",
      description: "Maximum 15% allocation per sector"
    },
    {
      rule: "High-Risk Allocation",
      current: `${allocation.filter(a => a.riskLevel === 'High').reduce((sum, a) => sum + a.percentage, 0).toFixed(1)}%`,
      limit: "40.0%",
      status: allocation.filter(a => a.riskLevel === 'High').reduce((sum, a) => sum + a.percentage, 0) <= 40 ? "pass" : "warning",
      description: "Maximum 40% in high-risk investments"
    },
    {
      rule: "Minimum Diversification",
      current: `${allocation.length}`,
      limit: "5",
      status: allocation.length >= 5 ? "pass" : "warning",
      description: "At least 5 different asset classes"
    }
  ];

  const executionRules = [
    {
      category: "Entry Criteria",
      rules: [
        "Technical: RSI < 70, price above 20-day MA",
        "Fundamental: P/E < sector average, positive earnings growth",
        "Market: VIX < 30, overall market trend confirmation"
      ]
    },
    {
      category: "Position Sizing",
      rules: [
        "Start with 2-3% position, scale up on confirmation",
        "Maximum 5% per individual security",
        "Use Kelly Criterion for optimal sizing"
      ]
    },
    {
      category: "Exit Strategy",
      rules: [
        "Stop-loss: 8% below entry for growth stocks",
        "Take profit: 20-25% gains for swing trades",
        "Trailing stop: 15% for long-term positions"
      ]
    },
    {
      category: "Rebalancing",
      rules: [
        "Monthly review, quarterly rebalancing",
        "Rebalance if allocation drifts >5% from target",
        "Tax-loss harvesting in December"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Risk Management Framework</h2>
      </div>

      {/* Risk Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Overall Risk</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">
              {riskMetrics.overallRisk.toFixed(1)}
            </div>
            <Progress 
              value={(riskMetrics.overallRisk / 3) * 100} 
              className="h-2"
            />
            <div className="text-xs text-muted-foreground">
              {riskMetrics.overallRisk < 1.5 ? 'Conservative' : 
               riskMetrics.overallRisk < 2.5 ? 'Moderate' : 'Aggressive'}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Expected Volatility</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {riskMetrics.expectedVolatility.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">
            Annualized standard deviation
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {riskMetrics.sharpeRatio.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">
            Risk-adjusted return
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Max Position</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {riskMetrics.maxPosition.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">
            Largest single allocation
          </div>
        </Card>
      </div>

      {/* Risk Rules Compliance */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Risk Rules Compliance
        </h3>
        <div className="space-y-4">
          {riskRules.map((rule, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={rule.status === 'pass' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {rule.status === 'pass' ? '✓ PASS' : '⚠ WARNING'}
                  </Badge>
                  <span className="font-medium text-foreground">{rule.rule}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">{rule.current}</div>
                <div className="text-xs text-muted-foreground">Limit: {rule.limit}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Execution Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {executionRules.map((category, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {index === 0 && <DollarSign className="w-5 h-5 text-success" />}
              {index === 1 && <BarChart3 className="w-5 h-5 text-primary" />}
              {index === 2 && <TrendingDown className="w-5 h-5 text-destructive" />}
              {index === 3 && <Calendar className="w-5 h-5 text-accent" />}
              {category.category}
            </h3>
            <ul className="space-y-2">
              {category.rules.map((rule, ruleIndex) => (
                <li key={ruleIndex} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{rule}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Risk Monitoring */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Risk Monitoring Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg">
            <h4 className="font-medium text-success mb-2">Daily</h4>
            <ul className="text-sm text-success space-y-1">
              <li>• Portfolio P&L review</li>
              <li>• Market sentiment check</li>
              <li>• Stop-loss monitoring</li>
            </ul>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg">
            <h4 className="font-medium text-warning mb-2">Weekly</h4>
            <ul className="text-sm text-warning space-y-1">
              <li>• Risk metrics calculation</li>
              <li>• Correlation analysis</li>
              <li>• Performance attribution</li>
            </ul>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-primary mb-2">Monthly</h4>
            <ul className="text-sm text-primary space-y-1">
              <li>• Full portfolio review</li>
              <li>• Rebalancing decisions</li>
              <li>• Strategy adjustments</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};