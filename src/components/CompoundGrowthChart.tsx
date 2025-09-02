import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CompoundGrowthChartProps {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  years: number;
}

export const CompoundGrowthChart = ({ 
  initialInvestment, 
  monthlyContribution, 
  annualReturn, 
  years 
}: CompoundGrowthChartProps) => {
  const [showContributions, setShowContributions] = useState(true);

  const generateGrowthData = () => {
    const data = [];
    let portfolioValue = initialInvestment;
    let totalContributions = initialInvestment;

    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        // Add monthly contributions throughout the year
        const yearlyContributions = monthlyContribution * 12;
        totalContributions += yearlyContributions;
        
        // Calculate compound growth
        portfolioValue = (portfolioValue + yearlyContributions) * (1 + annualReturn / 100);
      }

      const gains = portfolioValue - totalContributions;

      data.push({
        year,
        portfolioValue: Math.round(portfolioValue),
        contributions: Math.round(totalContributions),
        gains: Math.round(gains),
        formattedValue: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(portfolioValue)
      });
    }

    return data;
  };

  const data = generateGrowthData();
  const finalValue = data[data.length - 1];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-foreground">Year {label}</p>
          <p className="text-sm">
            Portfolio Value: <span className="text-success font-semibold">{data.formattedValue}</span>
          </p>
          <p className="text-sm">
            Contributions: <span className="text-muted-foreground">${data.contributions.toLocaleString()}</span>
          </p>
          <p className="text-sm">
            Gains: <span className="text-primary font-semibold">${data.gains.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Growth Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Final Value</p>
          <p className="text-lg font-bold text-success">{finalValue.formattedValue}</p>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Gains</p>
          <p className="text-lg font-bold text-primary">${finalValue.gains.toLocaleString()}</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Contributions</p>
          <p className="text-lg font-bold text-foreground">${finalValue.contributions.toLocaleString()}</p>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Multiple</p>
          <p className="text-lg font-bold text-accent">{(finalValue.portfolioValue / finalValue.contributions).toFixed(1)}x</p>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex gap-2">
        <Button
          variant={showContributions ? "default" : "outline"}
          size="sm"
          onClick={() => setShowContributions(!showContributions)}
        >
          {showContributions ? "Hide" : "Show"} Contributions
        </Button>
      </div>

      {/* Growth Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="contributionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(215 15% 65%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(215 15% 65%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 88%)" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(215 15% 45%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215 15% 45%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {showContributions && (
              <Area
                type="monotone"
                dataKey="contributions"
                stroke="hsl(215 15% 65%)"
                strokeWidth={2}
                fill="url(#contributionsGradient)"
                name="Contributions"
              />
            )}
            
            <Area
              type="monotone"
              dataKey="portfolioValue"
              stroke="hsl(142 76% 36%)"
              strokeWidth={3}
              fill="url(#portfolioGradient)"
              name="Portfolio Value"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          { scenario: "Conservative", return: 12, color: "hsl(142 76% 36%)" },
          { scenario: "Balanced", return: 13.5, color: "hsl(195 75% 35%)" },
          { scenario: "Aggressive", return: 15, color: "hsl(45 93% 47%)" }
        ].map(({ scenario, return: returnRate, color }) => {
          const scenarioValue = (initialInvestment + monthlyContribution * 12 * years) * Math.pow(1 + returnRate / 100, years);
          return (
            <div key={scenario} className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold text-foreground mb-2" style={{ color }}>{scenario} ({returnRate}%)</h4>
              <p className="text-2xl font-bold" style={{ color }}>
                ${Math.round(scenarioValue).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {Math.round(scenarioValue / (initialInvestment + monthlyContribution * 12 * years))}x multiple
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};