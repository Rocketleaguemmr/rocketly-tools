:root {
    --bg-primary: #090b12;
    --bg-card: #12151f;
    --border-color: #1e2330;
    --accent: #3b82f6;
    --accent-glow: rgba(59, 130, 246, 0.2);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.bg-grid {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: radial-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px);
    background-size: 24px 24px;
    z-index: -1;
}

.site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid var(--border-color);
    background: rgba(9, 11, 18, 0.8);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
}

.brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--text-main);
    font-weight: 600;
}

.brand-mark {
    background: var(--accent);
    color: white;
    padding: 6px 10px;
    border-radius: 8px;
    font-weight: bold;
}

nav {
    display: flex;
    gap: 20px;
}

nav a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
}

nav a:hover, nav a.active {
    color: var(--text-main);
}

main {
    flex: 1;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 40px 20px;
}

.hero-section, .calculator-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    margin-bottom: 60px;
}

.calculator-layout {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto 60px auto;
}

.badge {
    background: var(--accent-glow);
    color: var(--accent);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    display: inline-block;
    margin-bottom: 16px;
}

h1 {
    font-size: 36px;
    line-height: 1.2;
    margin-bottom: 16px;
}

.hero-content p, .calculator-card p {
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.5;
}

.calculator-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.calculator-card h2 {
    font-size: 22px;
    margin-bottom: 8px;
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 8px;
}

.input-group input {
    width: 100%;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 12px 16px;
    color: white;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
}

.input-group input:focus {
    border-color: var(--accent);
}

.result-box {
    background: rgba(0,0,0,0.2);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    margin-top: 20px;
}

.result-box .label {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 1px;
    margin-bottom: 4px;
}

.big-number {
    font-size: 28px;
    font-weight: 800;
    color: var(--accent);
}

.rank-name {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    margin-top: 2px;
}

.target-result {
    margin-top: 16px;
    font-size: 13px;
    color: var(--text-muted);
    text-align: center;
}

.ranks-section {
    margin-bottom: 60px;
}

.section-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;
}

.section-title h2 {
    font-size: 24px;
}

.section-title span {
    font-size: 13px;
    color: var(--text-muted);
}

.rank-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
}

.rank-item {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    padding: 16px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.rank-item .name {
    font-weight: 700;
    font-size: 14px;
}

.rank-item .mmr {
    font-size: 12px;
    color: var(--text-muted);
}

.info-section {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 40px;
}

.info-section h2 {
    font-size: 20px;
    margin-bottom: 12px;
}

.footer {
    border-top: 1px solid var(--border-color);
    padding: 30px 40px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text-muted);
    background: var(--bg-card);
}

@media(max-width: 768px) {
    .hero-section {
        grid-template-columns: 1fr;
    }
    .site-header {
        padding: 15px 20px;
    }
}
