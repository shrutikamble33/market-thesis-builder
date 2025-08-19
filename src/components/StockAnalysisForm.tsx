import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Search, Loader2 } from "lucide-react";

interface StockAnalysisFormProps {
  onAnalyze: (ticker: string, market: string) => void;
  isAnalyzing: boolean;
}

export const StockAnalysisForm = ({ onAnalyze, isAnalyzing }: StockAnalysisFormProps) => {
  const [ticker, setTicker] = useState("");
  const [market, setMarket] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker && market) {
      onAnalyze(ticker, market);
    }
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-elevated">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <TrendingUp className="h-6 w-6 text-primary" />
          Stock Analysis
        </CardTitle>
        <CardDescription className="text-base">
          Enter a stock ticker to generate a comprehensive investment thesis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm font-medium">
                Stock Ticker
              </Label>
              <Input
                id="ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="e.g., NVDA, AAPL, TSLA"
                className="h-12 text-lg font-medium"
                disabled={isAnalyzing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="market" className="text-sm font-medium">
                Market
              </Label>
              <Select value={market} onValueChange={setMarket} disabled={isAnalyzing}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">🇺🇸 US Markets (NYSE, NASDAQ)</SelectItem>
                  <SelectItem value="uk">🇬🇧 UK Markets (LSE)</SelectItem>
                  <SelectItem value="eu">🇪🇺 European Markets (Euronext)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-medium bg-gradient-primary hover:opacity-90 transition-all shadow-primary"
            disabled={!ticker || !market || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing {ticker}...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Generate Investment Thesis
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};