import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThesisData } from "@/pages/Index";
import { Building2, TrendingUp, AlertTriangle, Target, Clock, FileText, DollarSign } from "lucide-react";
import { StockChart } from "./StockChart";

interface InvestmentThesisProps {
  data: ThesisData;
}

const getRecommendationColor = (recommendation: string) => {
  switch (recommendation) {
    case 'BUY':
      return 'bg-success text-success-foreground';
    case 'HOLD':
      return 'bg-warning text-warning-foreground';
    case 'SELL':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-neutral text-neutral-foreground';
  }
};

export const InvestmentThesis = ({ data }: InvestmentThesisProps) => {
  return (
    <div className="space-y-6">
      {/* Header with Recommendation */}
      <Card className="bg-gradient-card border-0 shadow-elevated">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl font-bold">{data.company.name}</h2>
            <Badge className={`text-lg px-4 py-2 ${getRecommendationColor(data.recommendation)}`}>
              {data.recommendation}
            </Badge>
          </div>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <span className="text-xl font-medium">{data.company.ticker}</span>
            <span>•</span>
            <span>{data.company.sector}</span>
            <span>•</span>
            <span>{data.company.industry}</span>
          </div>
        </CardHeader>
      </Card>

      {/* Price Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Price Performance & Target
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StockChart 
            currentPrice={data.valuation.currentPrice}
            targetPrice={data.valuation.targetPrice}
            ticker={data.company.ticker}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-neutral-light rounded-lg">
              <div className="text-2xl font-bold">${data.valuation.currentPrice}</div>
              <div className="text-sm text-muted-foreground">Current Price</div>
            </div>
            <div className="text-center p-4 bg-success-light rounded-lg">
              <div className="text-2xl font-bold text-success">${data.valuation.targetPrice}</div>
              <div className="text-sm text-muted-foreground">Target Price</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">+{data.valuation.upside}%</div>
              <div className="text-sm text-muted-foreground">Potential Upside</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Business Model</h4>
              <p className="text-sm text-muted-foreground">{data.company.businessModel}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Products/Services</h4>
              <p className="text-sm text-muted-foreground">{data.company.keyProducts}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recent Performance</h4>
              <p className="text-sm text-muted-foreground">{data.company.recentPerformance}</p>
            </div>
          </CardContent>
        </Card>

        {/* Investment Rationale */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Investment Rationale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Growth Drivers</h4>
              <p className="text-sm text-muted-foreground">{data.rationale.growthDrivers}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Competitive Advantages</h4>
              <p className="text-sm text-muted-foreground">{data.rationale.competitiveAdvantages}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Industry Trends</h4>
              <p className="text-sm text-muted-foreground">{data.rationale.industryTrends}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Catalysts */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Key Catalysts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.catalysts.map((catalyst, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-success-light rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">{catalyst}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risks & Mitigants */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risks & Mitigants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-destructive">Key Risks</h4>
              <p className="text-sm text-muted-foreground">{data.risks.risks}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-success">Mitigating Factors</h4>
              <p className="text-sm text-muted-foreground">{data.risks.mitigants}</p>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-sm mb-2">
                <span>Risk Level</span>
                <span className="text-warning">Moderate</span>
              </div>
              <Progress value={data.valuation.downside * 3} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Valuation */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Valuation Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Methodology</h4>
              <p className="text-sm text-muted-foreground">{data.valuation.method}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-success-light rounded-lg">
                <div className="text-lg font-bold text-success">+{data.valuation.upside}%</div>
                <div className="text-xs text-muted-foreground">Potential Upside</div>
              </div>
              <div className="text-center p-3 bg-destructive-light rounded-lg">
                <div className="text-lg font-bold text-destructive">-{data.valuation.downside}%</div>
                <div className="text-xs text-muted-foreground">Downside Risk</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Horizon */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Investment Horizon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-light rounded-lg">
              <h4 className="font-semibold mb-2">Short-term (0-12 months)</h4>
              <p className="text-sm text-muted-foreground">{data.horizon.shortTerm}</p>
            </div>
            <div className="p-4 bg-neutral-light rounded-lg">
              <h4 className="font-semibold mb-2">Long-term (3-5 years)</h4>
              <p className="text-sm text-muted-foreground">{data.horizon.longTerm}</p>
            </div>
            <div className="p-4 bg-warning-light rounded-lg">
              <h4 className="font-semibold mb-2">Exit Criteria</h4>
              <p className="text-sm text-muted-foreground">{data.horizon.exitCriteria}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Thesis */}
      <Card className="shadow-card bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary-foreground">
            <FileText className="h-5 w-5" />
            Investment Thesis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed opacity-95">{data.finalThesis}</p>
          <div className="mt-4 pt-4 border-t border-primary-foreground/20">
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-80">Recommendation:</span>
              <Badge className={`${getRecommendationColor(data.recommendation)} shadow-lg`}>
                {data.recommendation}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};