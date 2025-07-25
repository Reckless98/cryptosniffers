<script setup lang="ts">
import { Brain, TrendingUp, Shield, BarChart3, Zap, AlertTriangle, Target } from 'lucide-vue-next'
</script>

<template>
  <div class="about-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <Brain :size="48" class="hero-icon" />
          <span class="gradient-text">AI-Powered Crypto Analysis</span>
        </h1>
        <p class="hero-subtitle">
          Discover how our advanced algorithms analyze multiple market factors to provide intelligent investment recommendations
        </p>
      </div>
    </section>

    <!-- Analysis Factors -->
    <section class="factors-section">
      <div class="container">
        <h2 class="section-title">Investment Analysis Factors</h2>
        <div class="factors-grid">
          <div class="factor-card glass">
            <div class="factor-icon">
              <BarChart3 :size="32" />
            </div>
            <h3 class="factor-title">Market Capitalization</h3>
            <p class="factor-description">
              We analyze market cap to determine the stability and growth potential of cryptocurrencies. 
              Higher market cap generally indicates more stability and established market presence.
            </p>
            <div class="factor-weight">Weight: 20%</div>
          </div>

          <div class="factor-card glass">
            <div class="factor-icon">
              <TrendingUp :size="32" />
            </div>
            <h3 class="factor-title">Trading Volume</h3>
            <p class="factor-description">
              High trading volume indicates strong liquidity and market interest. We calculate volume-to-market-cap ratio 
              to assess how actively a cryptocurrency is being traded.
            </p>
            <div class="factor-weight">Weight: 20%</div>
          </div>

          <div class="factor-card glass">
            <div class="factor-icon">
              <Zap :size="32" />
            </div>
            <h3 class="factor-title">Price Momentum</h3>
            <p class="factor-description">
              We analyze both 24-hour and 7-day price changes to identify short-term and medium-term trends. 
              Positive momentum can indicate growing market confidence.
            </p>
            <div class="factor-weight">Weight: 30%</div>
          </div>

          <div class="factor-card glass">
            <div class="factor-icon">
              <Target :size="32" />
            </div>
            <h3 class="factor-title">Market Ranking</h3>
            <p class="factor-description">
              Market ranking reflects overall market position and adoption. Top-ranked cryptocurrencies 
              typically have stronger fundamentals and wider acceptance.
            </p>
            <div class="factor-weight">Weight: 15%</div>
          </div>

          <div class="factor-card glass">
            <div class="factor-icon">
              <Shield :size="32" />
            </div>
            <h3 class="factor-title">Volatility Analysis</h3>
            <p class="factor-description">
              We assess price volatility by analyzing daily high-low ranges. Lower volatility indicates 
              more stability, which is important for risk assessment.
            </p>
            <div class="factor-weight">Weight: 15%</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scoring System -->
    <section class="scoring-section">
      <div class="container">
        <h2 class="section-title">Scoring & Recommendations</h2>
        <div class="scoring-grid">
          <div class="score-range strong-buy glass">
            <div class="score-header">
              <span class="score-label">Strong Buy</span>
              <span class="score-value">80-100</span>
            </div>
            <p class="score-description">
              Excellent fundamentals with strong momentum, low volatility, and high market confidence. 
              These cryptocurrencies show the best investment potential.
            </p>
          </div>

          <div class="score-range buy glass">
            <div class="score-header">
              <span class="score-label">Buy</span>
              <span class="score-value">65-79</span>
            </div>
            <p class="score-description">
              Good investment prospects with solid fundamentals and positive trends. 
              Suitable for investors seeking growth opportunities.
            </p>
          </div>

          <div class="score-range hold glass">
            <div class="score-header">
              <span class="score-label">Hold</span>
              <span class="score-value">45-64</span>
            </div>
            <p class="score-description">
              Neutral outlook with mixed signals. These cryptocurrencies may be suitable 
              for maintaining current positions while monitoring trends.
            </p>
          </div>

          <div class="score-range sell glass">
            <div class="score-header">
              <span class="score-label">Sell</span>
              <span class="score-value">30-44</span>
            </div>
            <p class="score-description">
              Weak fundamentals or negative momentum. Consider reducing exposure 
              or exiting positions in these cryptocurrencies.
            </p>
          </div>

          <div class="score-range strong-sell glass">
            <div class="score-header">
              <span class="score-label">Strong Sell</span>
              <span class="score-value">0-29</span>
            </div>
            <p class="score-description">
              Poor fundamentals with significant risks. Strong recommendation 
              to avoid or exit these investments.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Risk Assessment -->
    <section class="risk-section">
      <div class="container">
        <h2 class="section-title">Risk Assessment</h2>
        <div class="risk-grid">
          <div class="risk-card low-risk glass">
            <Shield :size="32" class="risk-icon" />
            <h3 class="risk-title">Low Risk</h3>
            <p class="risk-description">
              Large market cap (&gt;$10B), low volatility, top 25 ranking. 
              Suitable for conservative investors.
            </p>
          </div>

          <div class="risk-card medium-risk glass">
            <AlertTriangle :size="32" class="risk-icon" />
            <h3 class="risk-title">Medium Risk</h3>
            <p class="risk-description">
              Moderate market cap ($1B-$10B), moderate volatility, ranking 25-50. 
              Balanced risk-reward profile.
            </p>
          </div>

          <div class="risk-card high-risk glass">
            <AlertTriangle :size="32" class="risk-icon" />
            <h3 class="risk-title">High Risk</h3>
            <p class="risk-description">
              Small market cap (&lt;$1B), high volatility, ranking &gt;50. 
              Higher potential returns but significant risk.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="disclaimer-section">
      <div class="container">
        <div class="disclaimer glass-dark">
          <AlertTriangle :size="24" class="disclaimer-icon" />
          <div class="disclaimer-content">
            <h3 class="disclaimer-title">Important Disclaimer</h3>
            <p class="disclaimer-text">
              The information and analysis provided by CryptoSniffers are for educational purposes only and should not be considered as financial advice. 
              Cryptocurrency investments are highly volatile and carry significant risk. Always conduct your own research, consider your financial situation and risk tolerance, 
              and consult with qualified financial advisors before making investment decisions. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  min-height: 100vh;
  width: 100%;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero {
  padding: 80px 20px 60px;
  text-align: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: slideUp 1s ease-out;
}

.hero-icon {
  color: #667eea;
  filter: drop-shadow(0 0 12px rgba(102, 126, 234, 0.4));
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #a1a1aa;
  line-height: 1.6;
  animation: slideUp 1s ease-out 0.2s both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sections */
.factors-section,
.scoring-section,
.risk-section,
.disclaimer-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Factors Grid */
.factors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.factor-card {
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-align: center;
}

.factor-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.6);
}

.factor-icon {
  display: inline-flex;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.factor-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.factor-description {
  font-size: 1rem;
  color: #a1a1aa;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.factor-weight {
  font-size: 0.875rem;
  color: #667eea;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 20px;
  display: inline-block;
}

/* Scoring Grid */
.scoring-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.score-range {
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.score-range:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
}

.score-range::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 16px 16px 0 0;
}

.score-range.strong-buy::before { background: #10b981; }
.score-range.buy::before { background: #34d399; }
.score-range.hold::before { background: #fbbf24; }
.score-range.sell::before { background: #fb923c; }
.score-range.strong-sell::before { background: #ef4444; }

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.score-label {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e2e8f0;
}

.score-value {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.score-description {
  font-size: 0.875rem;
  color: #a1a1aa;
  line-height: 1.6;
}

/* Risk Grid */
.risk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.risk-card {
  padding: 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.risk-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
}

.risk-icon {
  margin-bottom: 1rem;
}

.low-risk .risk-icon { color: #10b981; }
.medium-risk .risk-icon { color: #fbbf24; }
.high-risk .risk-icon { color: #ef4444; }

.risk-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.risk-description {
  font-size: 0.875rem;
  color: #a1a1aa;
  line-height: 1.6;
}

/* Disclaimer */
.disclaimer {
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.disclaimer-icon {
  color: #fbbf24;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.disclaimer-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.disclaimer-text {
  font-size: 0.875rem;
  color: #a1a1aa;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 60px 15px 40px;
  }
  
  .hero-title {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .factors-grid,
  .scoring-grid,
  .risk-grid {
    grid-template-columns: 1fr;
  }
  
  .factors-section,
  .scoring-section,
  .risk-section {
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .disclaimer {
    flex-direction: column;
    text-align: center;
  }
}
</style>
