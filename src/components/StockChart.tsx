import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface StockChartProps {
  currentPrice: number;
  targetPrice: number;
  ticker: string;
}

export const StockChart = ({ currentPrice, targetPrice, ticker }: StockChartProps) => {
  // Generate mock historical data for the chart
  const generateMockData = () => {
    const data = [];
    const startPrice = currentPrice * 0.8;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 12; i++) {
      const variation = (Math.random() - 0.5) * 0.1;
      const price = startPrice + (currentPrice - startPrice) * (i / 11) + (startPrice * variation);
      data.push({
        month: months[i],
        price: Math.round(price * 100) / 100,
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    
    // Add current price as last point
    data.push({
      month: 'Current',
      price: currentPrice,
      volume: Math.floor(Math.random() * 1000000) + 500000
    });
    
    return data;
  };

  const data = generateMockData();
  const priceChange = ((currentPrice - data[0].price) / data[0].price) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{ticker} Price Chart (12M)</h3>
        <div className="text-right">
          <div className={`text-lg font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
          <div className="text-sm text-muted-foreground">12-month return</div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--card-foreground))'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
            <ReferenceLine 
              y={targetPrice} 
              stroke="hsl(var(--success))" 
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{ value: `Target: $${targetPrice}`, position: "right" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-medium">52W Low</div>
          <div className="text-muted-foreground">${Math.min(...data.map(d => d.price)).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">52W High</div>
          <div className="text-muted-foreground">${Math.max(...data.map(d => d.price)).toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Avg Volume</div>
          <div className="text-muted-foreground">{(data.reduce((acc, d) => acc + d.volume, 0) / data.length / 1000000).toFixed(1)}M</div>
        </div>
      </div>
    </div>
  );
};