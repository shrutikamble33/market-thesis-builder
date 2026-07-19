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

*Built as a prototype by Shruti Kamble, MBA (UK), 2025.*
