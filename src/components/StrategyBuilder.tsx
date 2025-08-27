import { PortfolioAllocation } from '@/pages/Portfolio';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface StrategyBuilderProps {
  allocation: PortfolioAllocation[];
  onAllocationChange: (allocation: PortfolioAllocation[]) => void;
  targetCAGR: number;
  onTargetCAGRChange: (value: number) => void;
  initialInvestment: number;
  onInitialInvestmentChange: (value: number) => void;
  monthlyContribution: number;
  onMonthlyContributionChange: (value: number) => void;
}

export const StrategyBuilder = ({
  allocation,
  onAllocationChange,
  targetCAGR,
  onTargetCAGRChange,
  initialInvestment,
  onInitialInvestmentChange,
  monthlyContribution,
  onMonthlyContributionChange
}: StrategyBuilderProps) => {
  const [presetStrategy, setPresetStrategy] = useState<string>('balanced');

  const presetStrategies = {
    conservative: {
      name: "Conservative Growth",
      targetCAGR: 12,
      allocation: [
        { ...allocation[0], percentage: 50 }, // Core Growth Equity
        { ...allocation[1], percentage: 10 }, // Swing Trading
        { ...allocation[2], percentage: 20 }, // Options Income
        { ...allocation[3], percentage: 10 }, // Private/Alternative
        { ...allocation[4], percentage: 10 }  // Real Estate
      ]
    },
    balanced: {
      name: "Balanced Strategy",
      targetCAGR: 13.5,
      allocation: [
        { ...allocation[0], percentage: 40 }, // Core Growth Equity
        { ...allocation[1], percentage: 20 }, // Swing Trading
        { ...allocation[2], percentage: 15 }, // Options Income
        { ...allocation[3], percentage: 15 }, // Private/Alternative
        { ...allocation[4], percentage: 10 }  // Real Estate
      ]
    },
    aggressive: {
      name: "Aggressive Growth",
      targetCAGR: 15,
      allocation: [
        { ...allocation[0], percentage: 30 }, // Core Growth Equity
        { ...allocation[1], percentage: 30 }, // Swing Trading
        { ...allocation[2], percentage: 15 }, // Options Income
        { ...allocation[3], percentage: 20 }, // Private/Alternative
        { ...allocation[4], percentage: 5 }   // Real Estate
      ]
    }
  };

  const updateAllocationPercentage = (index: number, newPercentage: number) => {
    const newAllocation = [...allocation];
    const oldPercentage = newAllocation[index].percentage;
    const difference = newPercentage - oldPercentage;
    
    // Update the target allocation
    newAllocation[index].percentage = newPercentage;
    
    // Distribute the difference across other allocations proportionally
    const otherIndices = newAllocation.map((_, i) => i).filter(i => i !== index);
    const totalOtherPercentage = otherIndices.reduce((sum, i) => sum + newAllocation[i].percentage, 0);
    
    if (totalOtherPercentage > 0) {
      otherIndices.forEach(i => {
        const proportionalChange = (newAllocation[i].percentage / totalOtherPercentage) * difference;
        newAllocation[i].percentage = Math.max(0, newAllocation[i].percentage - proportionalChange);
      });
    }
    
    // Ensure total is 100%
    const total = newAllocation.reduce((sum, item) => sum + item.percentage, 0);
    if (total !== 100) {
      const adjustment = (100 - total) / newAllocation.length;
      newAllocation.forEach(item => {
        item.percentage += adjustment;
      });
    }
    
    onAllocationChange(newAllocation);
  };

  const applyPresetStrategy = (strategyKey: string) => {
    const strategy = presetStrategies[strategyKey as keyof typeof presetStrategies];
    setPresetStrategy(strategyKey);
    onTargetCAGRChange(strategy.targetCAGR);
    onAllocationChange(strategy.allocation);
  };

  const resetToDefaults = () => {
    applyPresetStrategy('balanced');
    onInitialInvestmentChange(100000);
    onMonthlyContributionChange(2000);
  };

  const calculateExpectedReturn = () => {
    return allocation.reduce((acc, item) => acc + (item.percentage / 100) * item.expectedReturn, 0);
  };

  const expectedReturn = calculateExpectedReturn();
  const isTargetMet = expectedReturn >= targetCAGR;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Strategy Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Target Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <Label htmlFor="target-cagr">Target CAGR (%)</Label>
            <div className="space-y-2">
              <Slider
                id="target-cagr"
                min={8}
                max={20}
                step={0.5}
                value={[targetCAGR]}
                onValueChange={(value) => onTargetCAGRChange(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>8%</span>
                <span className="font-medium text-foreground">{targetCAGR}%</span>
                <span>20%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <Label htmlFor="initial-investment">Initial Investment ($)</Label>
            <Input
              id="initial-investment"
              type="number"
              value={initialInvestment}
              onChange={(e) => onInitialInvestmentChange(Number(e.target.value))}
              placeholder="100000"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
            <Input
              id="monthly-contribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => onMonthlyContributionChange(Number(e.target.value))}
              placeholder="2000"
            />
          </div>
        </Card>
      </div>

      {/* Performance Status */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          <span className="font-medium">Expected Return:</span>
          <Badge variant={isTargetMet ? "default" : "destructive"}>
            {expectedReturn.toFixed(1)}% CAGR
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {isTargetMet 
            ? `✓ Exceeds target by ${(expectedReturn - targetCAGR).toFixed(1)}%`
            : `⚠ Falls short by ${(targetCAGR - expectedReturn).toFixed(1)}%`
          }
        </div>
      </div>

      {/* Preset Strategies */}
      <div className="space-y-3">
        <Label>Preset Strategies</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(presetStrategies).map(([key, strategy]) => (
            <Button
              key={key}
              variant={presetStrategy === key ? "default" : "outline"}
              onClick={() => applyPresetStrategy(key)}
              className="h-auto p-3 text-left"
            >
              <div>
                <div className="font-medium">{strategy.name}</div>
                <div className="text-xs opacity-80">{strategy.targetCAGR}% Target CAGR</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Allocation Sliders */}
      <div className="space-y-4">
        <Label>Asset Allocation</Label>
        <div className="space-y-4">
          {allocation.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-foreground">{item.name}</span>
                  <Badge variant="outline" className={`text-xs ${
                    item.riskLevel === 'Low' ? 'border-success text-success' :
                    item.riskLevel === 'Medium' ? 'border-warning text-warning' : 
                    'border-destructive text-destructive'
                  }`}>
                    {item.riskLevel} Risk
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-foreground">{item.percentage.toFixed(1)}%</span>
                  <span className="text-xs text-muted-foreground ml-2">({item.expectedReturn}% return)</span>
                </div>
              </div>
              <Slider
                min={0}
                max={60}
                step={0.5}
                value={[item.percentage]}
                onValueChange={(value) => updateAllocationPercentage(index, value[0])}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Allocation Summary */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Total Allocation</span>
          <span className="font-bold text-foreground">
            {allocation.reduce((sum, item) => sum + item.percentage, 0).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min(100, allocation.reduce((sum, item) => sum + item.percentage, 0))}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};