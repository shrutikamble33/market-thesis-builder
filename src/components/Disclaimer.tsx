import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-start gap-3 max-w-4xl mx-auto">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground mb-2">Important Disclaimer</p>
            <p className="mb-2">
              This is a <strong>prototype application</strong> designed for educational and demonstration purposes only. 
              This is not an actual financial services website and does not provide real-time stock market data or information.
            </p>
            <p className="mb-2">
              <strong>This application should NOT be used for financial advice or investment decision-making.</strong> 
              All data, analysis, and projections shown are simulated and for illustrative purposes only.
            </p>
            <p>
              Always consult with qualified financial professionals before making any investment decisions. 
              Past performance does not guarantee future results, and all investments carry risk of loss.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Disclaimer;