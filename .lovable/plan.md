## Feature Description Document

I'll create a comprehensive, copy-paste-ready written feature description of the Investment Thesis Portal project. This will be delivered as a Markdown document that summarises all functionality across the three main pages.

### Deliverable

A single file `FEATURES.md` at the project root containing:

**1. Project Overview**
- Product name, purpose, target audience
- Tech stack summary (React, Vite, TypeScript, Tailwind, shadcn-ui, Recharts)
- Prototype disclaimer note

**2. Core Features (organised by page)**

*Home / Investment Thesis Generator (`/`)*
- Ticker + market selector (US / UK / EU)
- AI-style thesis generation covering: Company Overview, Investment Rationale, Catalysts, Risks & Mitigants, Valuation, Investment Horizon, Final Thesis
- BUY / HOLD / SELL colour-coded recommendation
- Interactive 12-month price chart with target price reference line
- Deep-link support via URL params (`?ticker=&market=`)

*Stock Research & Screening (`/research`)*
- Multi-criteria screener: market, sector, market cap, 12M return range, P/E range, dividend yield
- Preset quick screens (Top Performers, Value Stocks, Dividend Champions, Large Cap Growth)
- Sortable results table with colour-coded performance indicators and quick recommendation badges
- One-click "Analyze" that pipes a stock into the thesis generator
- Export results action

*Portfolio Strategy Builder (`/portfolio`)*
- 5-bucket allocation model (Core Growth Equity, Swing/Algo, Options Income, Private/Alt, Real Estate)
- Interactive pie chart allocation visualiser with risk badges
- Compound growth projection chart (up to 20 years) with contributions overlay
- Three preset strategies: Conservative (12%), Balanced (13.5%), Aggressive (15%)
- Adjustable target CAGR, initial investment, monthly contribution
- Weighted expected return vs target status indicator
- Risk management dashboard: overall risk score, expected volatility, Sharpe ratio, max position
- Risk rules compliance checker and execution rules (entry, sizing, exit, rebalancing)
- Daily / Weekly / Monthly monitoring schedule

**3. Cross-cutting Features**
- Consistent gradient hero design with cross-page navigation
- Responsive layout (mobile / tablet / desktop)
- Semantic design tokens (HSL) for theming
- Prototype disclaimer footer on every page
- Copyright footer (Shruti Kamble, MBA, UK 2025)

**4. Format Options**
The document will use clean Markdown with headings, bullet lists, and short paragraphs so it renders well in GitHub, Notion, Google Docs, LinkedIn, or plain text.

### Clarification (optional)

If you'd rather have it as a shorter marketing blurb (1–2 paragraphs) or a formal spec-style document, let me know before I build — otherwise I'll produce the Markdown feature list described above.