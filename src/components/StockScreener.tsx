import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, RotateCcw } from "lucide-react";
import { ScreeningFilters } from "@/pages/Research";

interface StockScreenerProps {
  onScreen: (filters: ScreeningFilters) => void;
  isScreening: boolean;
  filters: ScreeningFilters;
}

const MARKETS = [
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'EU', label: 'Europe' }
];

const SECTORS = [
  'Technology', 'Healthcare', 'Financials', 'Consumer Discretionary',
  'Communication Services', 'Industrials', 'Consumer Staples', 
  'Energy', 'Utilities', 'Real Estate', 'Materials'
];

const PRESET_SCREENS = [
  { name: 'Top Performers', filters: { return12MMin: 20, sortBy: 'return12M' } },
  { name: 'Value Stocks', filters: { peRatioMax: 15, pbRatio: 2, sortBy: 'peRatio' } },
  { name: 'Dividend Champions', filters: { dividendYieldMin: 3, sortBy: 'dividendYield' } },
  { name: 'Large Cap Growth', filters: { marketCapMin: 10000, return12MMin: 15, sortBy: 'marketCap' } }
];

export const StockScreener = ({ onScreen, isScreening, filters }: StockScreenerProps) => {
  const [localFilters, setLocalFilters] = useState<ScreeningFilters>(filters);

  const handleMarketToggle = (market: string) => {
    const newMarkets = localFilters.market.includes(market)
      ? localFilters.market.filter(m => m !== market)
      : [...localFilters.market, market];
    
    setLocalFilters({ ...localFilters, market: newMarkets });
  };

  const handleSectorToggle = (sector: string) => {
    const newSectors = localFilters.sector.includes(sector)
      ? localFilters.sector.filter(s => s !== sector)
      : [...localFilters.sector, sector];
    
    setLocalFilters({ ...localFilters, sector: newSectors });
  };

  const handlePresetScreen = (preset: any) => {
    const newFilters = { ...localFilters, ...preset.filters };
    setLocalFilters(newFilters);
    onScreen(newFilters);
  };

  const handleReset = () => {
    const resetFilters: ScreeningFilters = {
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
    };
    setLocalFilters(resetFilters);
  };

  const handleScreen = () => {
    onScreen(localFilters);
  };

  return (
    <div className="p-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Stock Screening Filters
        </CardTitle>
        <CardDescription>
          Filter stocks based on performance, valuation, and fundamental metrics
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 space-y-6">
        {/* Preset Screens */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Quick Screens</Label>
          <div className="flex flex-wrap gap-2">
            {PRESET_SCREENS.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => handlePresetScreen(preset)}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Markets */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Markets</Label>
          <div className="flex flex-wrap gap-2">
            {MARKETS.map((market) => (
              <Badge
                key={market.value}
                variant={localFilters.market.includes(market.value) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleMarketToggle(market.value)}
              >
                {market.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Sectors</Label>
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((sector) => (
              <Badge
                key={sector}
                variant={localFilters.sector.includes(sector) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSectorToggle(sector)}
              >
                {sector}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Performance Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              12-Month Return: {localFilters.return12MMin}% to {localFilters.return12MMax}%
            </Label>
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Minimum</Label>
                <Slider
                  value={[localFilters.return12MMin]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, return12MMin: value })}
                  min={-100}
                  max={500}
                  step={5}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Maximum</Label>
                <Slider
                  value={[localFilters.return12MMax]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, return12MMax: value })}
                  min={-100}
                  max={1000}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Market Cap: ${(localFilters.marketCapMin / 1000).toFixed(0)}B to ${(localFilters.marketCapMax / 1000).toFixed(0)}B
            </Label>
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Minimum (Billions)</Label>
                <Slider
                  value={[localFilters.marketCapMin]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, marketCapMin: value })}
                  min={0}
                  max={50000}
                  step={1000}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Maximum (Billions)</Label>
                <Slider
                  value={[localFilters.marketCapMax]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, marketCapMax: value })}
                  min={1000}
                  max={10000000}
                  step={10000}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Valuation Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">
              P/E Ratio: {localFilters.peRatioMin} to {localFilters.peRatioMax}
            </Label>
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Minimum</Label>
                <Slider
                  value={[localFilters.peRatioMin]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, peRatioMin: value })}
                  min={0}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Maximum</Label>
                <Slider
                  value={[localFilters.peRatioMax]}
                  onValueChange={([value]) => setLocalFilters({ ...localFilters, peRatioMax: value })}
                  min={5}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Minimum Dividend Yield: {localFilters.dividendYieldMin}%
            </Label>
            <Slider
              value={[localFilters.dividendYieldMin]}
              onValueChange={([value]) => setLocalFilters({ ...localFilters, dividendYieldMin: value })}
              min={0}
              max={10}
              step={0.1}
              className="mt-2"
            />
          </div>
        </div>

        <Separator />

        {/* Sort Options */}  
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-sm font-medium mb-2 block">Sort By</Label>
            <Select 
              value={localFilters.sortBy} 
              onValueChange={(value) => setLocalFilters({ ...localFilters, sortBy: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="return12M">12-Month Return</SelectItem>
                <SelectItem value="return3M">3-Month Return</SelectItem>
                <SelectItem value="marketCap">Market Cap</SelectItem>
                <SelectItem value="peRatio">P/E Ratio</SelectItem>
                <SelectItem value="dividendYield">Dividend Yield</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Label className="text-sm font-medium mb-2 block">Order</Label>
            <Select 
              value={localFilters.sortOrder} 
              onValueChange={(value: 'asc' | 'desc') => setLocalFilters({ ...localFilters, sortOrder: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">High to Low</SelectItem>
                <SelectItem value="asc">Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            onClick={handleScreen}
            disabled={isScreening}
            className="flex-1"
          >
            <Search className="w-4 h-4 mr-2" />
            {isScreening ? "Screening..." : "Screen Stocks"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex-1 sm:flex-initial"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </div>
  );
};