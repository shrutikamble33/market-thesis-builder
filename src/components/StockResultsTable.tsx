import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, TrendingDown, FileText, Download } from "lucide-react";
import { StockData, ScreeningFilters } from "@/pages/Research";
import { mockStocksData } from "@/data/mockStocks";

interface StockResultsTableProps {
  stocks: StockData[];
  isLoading: boolean;
  onUpdateResults: (stocks: StockData[]) => void;
  filters: ScreeningFilters;
}

export const StockResultsTable = ({ stocks, isLoading, onUpdateResults, filters }: StockResultsTableProps) => {
  const [sortedStocks, setSortedStocks] = useState<StockData[]>([]);

  useEffect(() => {
    // Filter and sort stocks based on current filters
    let filtered = mockStocksData.filter(stock => {
      // Market filter
      if (filters.market.length > 0 && !filters.market.includes(stock.market)) return false;
      
      // Sector filter
      if (filters.sector.length > 0 && !filters.sector.includes(stock.sector)) return false;
      
      // Market cap filter
      if (stock.marketCap < filters.marketCapMin || stock.marketCap > filters.marketCapMax) return false;
      
      // 12M return filter
      if (stock.return12M < filters.return12MMin || stock.return12M > filters.return12MMax) return false;
      
      // P/E ratio filter
      if (stock.peRatio < filters.peRatioMin || stock.peRatio > filters.peRatioMax) return false;
      
      // Dividend yield filter
      if (stock.dividendYield < filters.dividendYieldMin) return false;
      
      return true;
    });

    // Sort stocks
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof StockData] as number;
      const bValue = b[filters.sortBy as keyof StockData] as number;
      
      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    setSortedStocks(filtered);
    onUpdateResults(filtered);
  }, [filters, onUpdateResults]);

  const formatMarketCap = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}T`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
    return `$${value.toFixed(1)}M`;
  };

  const formatPercentage = (value: number) => {
    const formatted = value.toFixed(1);
    return value >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const getPerformanceColor = (value: number) => {
    if (value >= 10) return "text-success";
    if (value >= 0) return "text-neutral";
    if (value >= -10) return "text-warning";
    return "text-destructive";
  };

  const getPerformanceIcon = (value: number) => {
    return value >= 0 ? 
      <TrendingUp className="w-4 h-4" /> : 
      <TrendingDown className="w-4 h-4" />;
  };

  const getRecommendationBadge = (return12M: number, peRatio: number, dividendYield: number) => {
    if (return12M > 20 && peRatio < 25) return <Badge className="bg-success text-success-foreground">BUY</Badge>;
    if (return12M > 10 || dividendYield > 3) return <Badge variant="outline" className="border-warning text-warning">HOLD</Badge>;
    if (return12M < -20) return <Badge variant="destructive">SELL</Badge>;
    return <Badge variant="outline">HOLD</Badge>;
  };

  if (isLoading) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Screening stocks based on your criteria...</p>
        </CardContent>
      </Card>
    );
  }

  if (sortedStocks.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Stocks Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to find more investment opportunities.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h3 className="text-lg font-semibold">Screening Results</h3>
            <p className="text-sm text-muted-foreground">
              Found {sortedStocks.length} stocks matching your criteria
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>1M Return</TableHead>
                <TableHead>3M Return</TableHead>
                <TableHead>12M Return</TableHead>
                <TableHead>P/E Ratio</TableHead>
                <TableHead>Div. Yield</TableHead>
                <TableHead>Quick Rec.</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStocks.map((stock) => (
                <TableRow key={stock.ticker} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{stock.ticker}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {stock.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {stock.market}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{stock.sector}</div>
                  </TableCell>
                  <TableCell>{formatMarketCap(stock.marketCap)}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${getPerformanceColor(stock.return1M)}`}>
                      <span className="w-4 h-4">{getPerformanceIcon(stock.return1M)}</span>
                      {formatPercentage(stock.return1M)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${getPerformanceColor(stock.return3M)}`}>
                      <span className="w-4 h-4">{getPerformanceIcon(stock.return3M)}</span>
                      {formatPercentage(stock.return3M)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${getPerformanceColor(stock.return12M)}`}>
                      <span className="w-4 h-4">{getPerformanceIcon(stock.return12M)}</span>
                      {formatPercentage(stock.return12M)}
                    </div>
                  </TableCell>
                  <TableCell>{stock.peRatio.toFixed(1)}</TableCell>
                  <TableCell>{stock.dividendYield.toFixed(1)}%</TableCell>
                  <TableCell>
                    {getRecommendationBadge(stock.return12M, stock.peRatio, stock.dividendYield)}
                  </TableCell>
                  <TableCell>
                    <Link to={`/?ticker=${stock.ticker}&market=${stock.market}`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        Analyze
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};