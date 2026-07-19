# Investment Thesis Portal — Feature Description

## Overview

The **Investment Thesis Portal** is a professional, colour-coded web application that helps investors research stocks, generate structured investment theses, and design diversified portfolios targeting consistent long-term returns. It brings together three core workflows — **single-stock analysis**, **multi-stock screening**, and **portfolio strategy building** — into a single, clean interface designed for US, UK, and European markets.

> **Note:** This is a prototype application built for educational and demonstration purposes. It does not use live market data and should not be used for real financial decisions.

**Tech stack:** React 18, Vite, TypeScript, Tailwind CSS, shadcn-ui, Recharts, React Router.

---

## 1. Investment Thesis Generator (Home Page)

Generate a full institutional-style investment thesis for any stock ticker in seconds.

- **Ticker + Market Selector** — enter a ticker (e.g. NVDA, AAPL, BP) and choose the market: 🇺🇸 US (NYSE, NASDAQ), 🇬🇧 UK (LSE), or 🇪🇺 Europe (Euronext).
- **Structured 7-Section Thesis Output**, matching a professional research report format:
  1. Company Overview — name, ticker, industry, sector, business model, key products, recent performance
  2. Investment Rationale — growth drivers, competitive advantages, industry trends
  3. Key Catalysts — colour-coded catalyst cards
  4. Risks & Mitigants — with a visual risk-level indicator
  5. Valuation — current price, target price, methodology, upside % vs downside %
  6. Investment Horizon — short-term view, long-term view, exit criteria
  7. Final Thesis Summary — concise 1–2 sentence recommendation
- **BUY / HOLD / SELL Recommendation Badge** — colour coded (green / amber / red) and displayed prominently.
- **Interactive 12-Month Price Chart** — built with Recharts, includes a dashed reference line for the target price, plus 52-week high/low and average volume stats.
- **Deep-linkable analysis** — thesis pages can be opened directly via URL parameters (`/?ticker=NVDA&market=US`), allowing one-click hand-off from other tools in the app.

---

## 2. Stock Research & Screening (`/research`)

A powerful stock screener for discovering investment opportunities that match specific criteria.

- **Multi-Criteria Filters:**
  - Markets (US / UK / EU) — multi-select
  - Sectors — Technology, Healthcare, Financials, Energy, Consumer, etc.
  - Market capitalisation range (small-cap to mega-cap)
  - 12-month return range (min and max)
  - P/E ratio range
  - Minimum dividend yield
- **Preset "Quick Screens"** for common investment styles:
  - Top Performers
  - Value Stocks
  - Dividend Champions
  - Large Cap Growth
- **Sortable Results Table** displaying ticker, name, market, sector, market cap, price, 1M / 3M / 12M returns, P/E, dividend yield, and a quick BUY / HOLD / SELL badge.
- **Colour-Coded Performance Indicators** — green up-arrows for gains, red down-arrows for losses, with intensity based on magnitude.
- **One-Click "Analyze"** — jump directly from any screener result into the full investment thesis generator with the ticker and market pre-filled.
- **Export Results** — download screening results for offline review.
- **Empty & Loading States** — friendly messages when no stocks match filters or while screening is in progress.

---

## 3. Portfolio Strategy Builder (`/portfolio`)

Design, visualise, and stress-test a diversified portfolio targeting **12–15% consistent CAGR** with smart risk management.

### Allocation Model
A 5-bucket asset allocation framework, each with its own colour, risk level, and expected return:

| Bucket | Default Weight | Risk | Expected Return |
| --- | --- | --- | --- |
| Core Growth Equity (blue-chip stocks & ETFs) | 40% | Medium | 12% |
| Swing / Algorithmic Trading | 20% | High | 18% |
| Options Income Strategies (covered calls, CSPs) | 15% | Medium | 15% |
| Private / Alternative Investments (REITs, commodities, crypto) | 15% | High | 16% |
| Real Estate | 10% | Low | 8% |

### Interactive Visualisations
- **Allocation Pie Chart** — hoverable segments with tooltips showing description, weight, expected return, and risk level. Full colour-coded legend below the chart.
- **Compound Growth Projection Chart** — area chart projecting portfolio value over up to 20 years, with an optional overlay of total contributions vs gains.
- **Growth Metrics Cards** — final value, total gains, contributions, and value multiple.
- **Three-Scenario Comparison** — side-by-side final-value projections for Conservative (12%), Balanced (13.5%), and Aggressive (15%) return assumptions.

### Strategy Builder Controls
- **Preset Strategies:** Conservative Growth, Balanced Strategy, Aggressive Growth — one click reweights the allocation and adjusts the target CAGR.
- **Adjustable Inputs:**
  - Target CAGR slider (8% – 20%)
  - Initial investment
  - Monthly contribution
- **Live Allocation Sliders** — drag any bucket up or down; other buckets rebalance proportionally so the total always stays at 100%.
- **Target-Met Indicator** — real-time badge showing whether the weighted expected return exceeds the target CAGR, with the delta.

### Risk Management Dashboard
- **Risk Metrics:** Overall Risk Score, Expected Volatility, Sharpe Ratio, Max Position size.
- **Risk Rules Compliance Checker** with pass / warning badges:
  - Max single position ≤ 5%
  - Sector concentration ≤ 15%
  - High-risk allocation ≤ 40%
  - Minimum 5 asset classes
- **Execution Rules** organised into four categories:
  - Entry Criteria (technical, fundamental, market)
  - Position Sizing (Kelly Criterion, scaling in)
  - Exit Strategy (stop-loss, take-profit, trailing stops)
  - Rebalancing (monthly review, quarterly rebalance, tax-loss harvesting)
- **Monitoring Schedule** — colour-coded Daily / Weekly / Monthly checklists.

---

## 4. Cross-Cutting Features

- **Unified Navigation** — hero-based landing on every page with clear links between Analysis, Research, and Portfolio.
- **Consistent Design System** — deep-blue and teal gradient theme built on semantic HSL design tokens (no hardcoded colours), ensuring theme consistency across every component.
- **Responsive Layout** — optimised for mobile, tablet, and desktop.
- **Professional Financial Typography** — clean, readable hierarchy tuned for numeric and tabular data.
- **Loading & Empty States** — animated spinners during analysis, helpful empty-state messages when no data is available.
- **Prototype Disclaimer Footer** — visible on every page, clearly stating the app is for educational purposes only and not for financial advice.
- **Copyright Footer** — © 2025 Shruti Kamble, MBA, UK. All rights reserved.

---

## 5. Target Users

- Retail investors learning to structure their research process
- Finance students and MBA candidates studying investment analysis
- Portfolio managers prototyping allocation strategies
- Anyone wanting a clean, opinionated framework for evaluating stocks and building a diversified portfolio

---

## 6. Epics and Features

Organised in agile-style epics for backlog planning, roadmap communication, or portfolio documentation.

### Epic 1: Investment Thesis Generation
Deliver an institutional-quality, single-stock research experience.
- **F1.1 Ticker & Market Intake** — validated ticker input with US / UK / EU market selector.
- **F1.2 Structured 7-Section Thesis** — Company Overview, Rationale, Catalysts, Risks & Mitigants, Valuation, Horizon, Final Thesis.
- **F1.3 BUY / HOLD / SELL Recommendation Engine** — colour-coded verdict badge with supporting rationale.
- **F1.4 Valuation Snapshot** — current price, target price, methodology, upside / downside %.
- **F1.5 Interactive 12-Month Price Chart** — Recharts line chart with target-price reference line and 52-week stats.
- **F1.6 Deep-Linkable Thesis URLs** — shareable `/?ticker=XYZ&market=US` links that auto-run the analysis.

### Epic 2: Stock Research & Screening
Help users discover candidates that match their investment style.
- **F2.1 Multi-Criteria Filter Panel** — market, sector, market cap, 12M return, P/E, dividend yield.
- **F2.2 Preset Quick Screens** — Top Performers, Value Stocks, Dividend Champions, Large Cap Growth.
- **F2.3 Sortable Results Table** — multi-column sort with colour-coded performance indicators.
- **F2.4 One-Click Analyse Hand-off** — jump from any row into the Thesis Generator with context preserved.
- **F2.5 Results Export** — download the filtered list for offline review.
- **F2.6 Empty & Loading States** — friendly UX for zero-match and in-progress screening.

### Epic 3: Portfolio Strategy Builder
Design and stress-test a diversified portfolio targeting 12–15% CAGR.
- **F3.1 5-Bucket Allocation Model** — Core Growth, Swing / Algo, Options Income, Alternatives, Real Estate.
- **F3.2 Interactive Allocation Pie Chart** — hover tooltips, risk-level badges, colour-coded legend.
- **F3.3 Live Allocation Sliders** — proportional rebalancing keeps total at 100%.
- **F3.4 Preset Strategies** — Conservative, Balanced, Aggressive one-click profiles.
- **F3.5 Compound Growth Projection** — 20-year area chart driven by initial + monthly contributions.
- **F3.6 Scenario Comparison** — side-by-side final values for 12% / 13.5% / 15% CAGR.
- **F3.7 Target-CAGR Indicator** — real-time badge showing weighted return vs. target.

### Epic 4: Risk Management Framework
Institutionalise discipline through explicit rules and metrics.
- **F4.1 Risk Metrics Dashboard** — Risk Score, Volatility, Sharpe Ratio, Max Position.
- **F4.2 Compliance Checker** — automated pass / warning badges against position, sector, and diversification rules.
- **F4.3 Execution Rulebook** — Entry, Position Sizing, Exit, and Rebalancing checklists.
- **F4.4 Monitoring Schedule** — Daily / Weekly / Monthly review cadence.

### Epic 5: Platform, Design System & Compliance
Cross-cutting foundations that keep the app consistent and safe.
- **F5.1 Unified Navigation** — hero landing with links across Analysis, Research, and Portfolio.
- **F5.2 Semantic Design Tokens** — HSL-based tokens for colours, gradients, and shadows.
- **F5.3 Responsive Layout** — mobile, tablet, and desktop breakpoints.
- **F5.4 Prototype Disclaimer** — persistent footer stating the app is educational only.
- **F5.5 Copyright & Attribution** — © 2025 Shruti Kamble, MBA, UK on every page.
- **F5.6 Loading & Empty State Library** — consistent spinners and messages across features.

---

*Built as a prototype by Shruti Kamble, MBA (UK), 2025.*

