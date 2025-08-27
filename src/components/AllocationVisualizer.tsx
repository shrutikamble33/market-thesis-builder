import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PortfolioAllocation } from '@/pages/Portfolio';

interface AllocationVisualizerProps {
  allocation: PortfolioAllocation[];
  onAllocationChange: (allocation: PortfolioAllocation[]) => void;
}

export const AllocationVisualizer = ({ allocation }: AllocationVisualizerProps) => {
  const data = allocation.map(item => ({
    name: item.name,
    value: item.percentage,
    color: item.color,
    description: item.description,
    riskLevel: item.riskLevel,
    expectedReturn: item.expectedReturn
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.description}</p>
          <p className="text-sm">
            <span className="text-foreground font-medium">{data.value}%</span> allocation
          </p>
          <p className="text-sm">
            <span className="text-foreground font-medium">{data.expectedReturn}%</span> expected return
          </p>
          <p className="text-sm">
            Risk Level: <span className={`font-medium ${
              data.riskLevel === 'Low' ? 'text-success' :
              data.riskLevel === 'Medium' ? 'text-warning' : 'text-destructive'
            }`}>{data.riskLevel}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Allocation Legend */}
      <div className="space-y-3">
        {allocation.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{item.percentage}%</p>
              <p className="text-sm text-muted-foreground">{item.expectedReturn}% return</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};