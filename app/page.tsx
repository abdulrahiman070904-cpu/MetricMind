"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type RegionName = "North" | "South" | "East" | "West";
type RegionFilter = "All regions" | RegionName;
type PageName = "Overview" | "Analytics" | "Revenue" | "Regions" | "Products" | "Settings";
type DashboardStats = { revenue: number; profit: number; orders: number; source: "demo" | "cube" };

type RegionStats = { revenue: number; profit: number; orders: number; quantity: number; growth: number };
const regionData: Record<RegionName, RegionStats> = {
  North: { revenue: 3284000, profit: 1048000, orders: 1248, quantity: 3768, growth: 13.4 },
  South: { revenue: 2672000, profit: 828000, orders: 1074, quantity: 3210, growth: 8.1 },
  East: { revenue: 2416000, profit: 716000, orders: 936, quantity: 2754, growth: 5.8 },
  West: { revenue: 3108000, profit: 1092000, orders: 1196, quantity: 3624, growth: 16.2 },
};
const trends = [
  { month: "Jan", revenue: 760000, profit: 248000 }, { month: "Feb", revenue: 830000, profit: 270000 },
  { month: "Mar", revenue: 805000, profit: 254000 }, { month: "Apr", revenue: 960000, profit: 316000 },
  { month: "May", revenue: 1030000, profit: 338000 }, { month: "Jun", revenue: 980000, profit: 310000 },
  { month: "Jul", revenue: 1170000, profit: 394000 }, { month: "Aug", revenue: 1230000, profit: 410000 },
  { month: "Sep", revenue: 1130000, profit: 362000 }, { month: "Oct", revenue: 1320000, profit: 444000 },
  { month: "Nov", revenue: 1480000, profit: 510000 }, { month: "Dec", revenue: 1595000, profit: 560000 },
];
const products = [
  { name: "Aura Pro", category: "Premium", share: 28, revenue: 3190000, growth: 18.4, units: 1840 },
  { name: "Nova X", category: "Flagship", share: 24, revenue: 2740000, growth: 14.2, units: 1620 },
  { name: "Vertex", category: "Business", share: 19, revenue: 2170000, growth: 8.7, units: 1310 },
  { name: "Pulse", category: "Consumer", share: 16, revenue: 1830000, growth: 6.3, units: 1095 },
  { name: "Core", category: "Essential", share: 13, revenue: 1480000, growth: 3.9, units: 890 },
];
const pages: PageName[] = ["Overview", "Analytics", "Revenue", "Regions", "Products"];
const pageDescriptions: Record<PageName, string> = {
  Overview: "A clear picture of what is happening across your business.",
  Analytics: "Find the trends, drivers, and opportunities behind your results.",
  Revenue: "Track revenue quality and month-by-month business performance.",
  Regions: "Compare operational performance across every region.",
  Products: "Understand which products drive growth and profitability.",
  Settings: "Personalize MetricMind and manage the analytics data connection.",
};
const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
const number = (value: number) => new Intl.NumberFormat("en-IN").format(Math.round(value));
const percentage = (value: number) => `${value.toFixed(1)}%`;

function Icon({ name }: { name: string }) {
  const icons: Record<string, ReactNode> = {
    Overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    Analytics: <><path d="M4 19V5" /><path d="M4 19h17" /><path d="m7 15 4-4 3 2 5-6" /></>,
    Revenue: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M16 12h5v4h-5a2 2 0 1 1 0-4Z" /><path d="M3 9V5a2 2 0 0 1 2-2h13" /></>,
    Regions: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    Products: <><path d="m21 8-9 5-9-5 9-5 9 5Z" /><path d="M3 8v9l9 5 9-5V8" /><path d="M12 13v9" /></>,
    Settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56v.1h-3v-.1A1.7 1.7 0 0 0 10.7 18.7a1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.04 15 1.7 1.7 0 0 0 5.5 14H5.4v-3h.1A1.7 1.7 0 0 0 7.04 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06A1.7 1.7 0 0 0 10.7 6.3a1.7 1.7 0 0 0 1.03-1.56v-.1h3v.1A1.7 1.7 0 0 0 15.76 6.3a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1h.1v3h-.1A1.7 1.7 0 0 0 19.4 15Z" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`panel ${className}`}>{children}</section>; }
function Heading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) { return <div className="panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>; }
function Kpi({ label, value, change, tone = "positive" }: { label: string; value: string; change: string; tone?: "positive" | "healthy" }) { return <article className="kpi"><span>{label}</span><strong>{value}</strong><small className={tone}>{tone === "healthy" ? "●" : "↗"} {change} <em>{tone === "healthy" ? "performance" : "vs. previous period"}</em></small></article>; }

function TrendChart({ scale }: { scale: number }) {
  const max = Math.max(...trends.map((item) => item.revenue));
  const points = trends.map((item, index) => `${25 + index * 70},${175 - item.revenue / max * 135}`).join(" ");
  const profitPoints = trends.map((item, index) => `${25 + index * 70},${175 - item.profit / max * 135}`).join(" ");
  return <div className="chart-wrap"><div className="chart-legend"><span><i className="gold" />Revenue</span><span><i className="blue" />Net profit</span></div><svg className="line-chart" viewBox="0 0 830 230" role="img" aria-label="Revenue and net profit by month"><defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d5a73a" stopOpacity=".32" /><stop offset="1" stopColor="#d5a73a" stopOpacity="0" /></linearGradient></defs>{[40,80,120,160].map((y) => <line key={y} x1="25" x2="795" y1={y} y2={y} />)}<polygon points={`25,175 ${points} 795,175`} fill="url(#revenue-fill)" /><polyline points={points} fill="none" stroke="#d6a937" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><polyline points={profitPoints} fill="none" stroke="#67aad7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />{trends.map((item, index) => <text key={item.month} x={25 + index * 70} y="207">{item.month}</text>)}</svg><div className="chart-total">Current projected revenue <b>{money(trends[trends.length - 1].revenue * scale)}</b></div></div>;
}

export default function Home() {
  const [region, setRegion] = useState<RegionFilter>("All regions");
  const [period, setPeriod] = useState("This year");
  const [active, setActive] = useState<PageName>("Overview");
  const [liveStats, setLiveStats] = useState<DashboardStats | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [userName, setUserName] = useState("Abdul Rahiman");
  const [draftName, setDraftName] = useState("Abdul Rahiman");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const base = useMemo(() => region === "All regions" ? Object.values(regionData).reduce((sum, item) => ({ revenue: sum.revenue + item.revenue, profit: sum.profit + item.profit, orders: sum.orders + item.orders, quantity: sum.quantity + item.quantity }), { revenue: 0, profit: 0, orders: 0, quantity: 0 }) : regionData[region], [region]);
  const scale = period === "Last 30 days" ? 0.18 : period === "Last quarter" ? 0.28 : 1;

  useEffect(() => {
    const controller = new AbortController();
    setDataLoading(true); setDataError(false);
    fetch(`/api/dashboard?region=${encodeURIComponent(region)}&period=${encodeURIComponent(period)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Dashboard request failed")))
      .then((data: DashboardStats) => setLiveStats(data))
      .catch((error: unknown) => { if ((error as Error).name !== "AbortError") { setDataError(true); setLiveStats(null); } })
      .finally(() => setDataLoading(false));
    return () => controller.abort();
  }, [region, period]);

  const revenue = liveStats?.revenue ?? Math.round(base.revenue * scale);
  const profit = liveStats?.profit ?? Math.round(base.profit * scale);
  const orders = liveStats?.orders ?? Math.round(base.orders * scale);
  const margin = revenue ? profit / revenue * 100 : 0;
  const quantity = Math.round(base.quantity * scale);
  const initial = userName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const sourceLabel = dataLoading ? "Refreshing data…" : dataError ? "Using offline dashboard data" : liveStats?.source === "cube" ? "Live Cube data · Updated just now" : "Demo data · Connect Cube to go live";

  const changeRegion = (value: RegionFilter) => { setDataLoading(true); setDataError(false); setRegion(value); };
  const changePeriod = (value: string) => { setDataLoading(true); setDataError(false); setPeriod(value); };
  const exportReport = () => {
    const lines = [["MetricMind executive report"], ["Metric", "Value"], ["Total revenue", revenue.toString()], ["Net profit", profit.toString()], ["Total orders", orders.toString()], ["Profit margin", percentage(margin)]];
    const url = URL.createObjectURL(new Blob([lines.map((line) => line.join(",")).join("\n")], { type: "text/csv" }));
    const link = document.createElement("a"); link.href = url; link.download = "metricmind-executive-report.csv"; link.click(); URL.revokeObjectURL(url);
  };
  const saveProfile = () => { const value = draftName.trim(); if (value) { setUserName(value); setSaved(true); window.setTimeout(() => setSaved(false), 2500); } };

  const overview = <>
    <section className="kpis"><Kpi label="Total revenue" value={money(revenue)} change="12.5%" /><Kpi label="Net profit" value={money(profit)} change="8.2%" /><Kpi label="Total orders" value={number(orders)} change="5.7%" /><Kpi label="Profit margin" value={percentage(margin)} change="Healthy" tone="healthy" /></section>
    <section className="dashboard-grid"><Panel className="revenue-panel"><Heading title="Revenue performance" subtitle="Revenue and profit trend over time" action={<button className="quiet-button">This year</button>} /><TrendChart scale={scale} /></Panel><Panel className="insights"><Heading title="Executive insights" subtitle="AI-powered performance signals" action={<span className="ai">✦ AI</span>} /><div className="insight"><i className="spark">↗</i><div><b>Revenue is trending upward</b><p>Revenue is <strong>12.5% ahead</strong> of the previous period, led by West and North.</p></div></div><div className="insight"><i className="spark">◎</i><div><b>Margin remains healthy</b><p>Your current margin of <strong>{percentage(margin)}</strong> is above the target threshold.</p></div></div><button className="text-button" onClick={() => setActive("Analytics")}>View full intelligence report <span>→</span></button></Panel></section>
    <section className="lower-grid"><Panel><Heading title="Revenue by region" subtitle="Share of total revenue" action={<button className="text-button compact" onClick={() => setActive("Regions")}>Details →</button>} /><RegionBars region={region} scale={scale} totalRevenue={base.revenue} /></Panel><Panel><Heading title="Top products" subtitle="Ranked by revenue contribution" action={<button className="text-button compact" onClick={() => setActive("Products")}>View all →</button>} /><ProductBars scale={scale} /></Panel></section>
  </>;

  const analytics = <>
    <section className="kpis"><Kpi label="Revenue growth" value="12.5%" change="2.1 pts faster" /><Kpi label="Average order value" value={money(revenue / Math.max(orders, 1))} change="6.4%" /><Kpi label="Best region" value="West" change="16.2% growth" /><Kpi label="Business health" value="Excellent" change="On target" tone="healthy" /></section>
    <section className="dashboard-grid"><Panel className="revenue-panel"><Heading title="Revenue versus profit" subtitle="A twelve-month view of business performance" action={<button className="quiet-button" onClick={exportReport}>Export CSV</button>} /><TrendChart scale={scale} /></Panel><Panel><Heading title="Growth drivers" subtitle="What is moving the numbers" /><div className="metric-list"><Metric label="West region contribution" value="29%" note="Highest growth market" /><Metric label="Aura Pro revenue share" value="28%" note="Top product line" /><Metric label="Repeat order rate" value="64%" note="Above 60% target" /><Metric label="Cost-to-revenue ratio" value={`${percentage(100 - margin)}`} note="Improving steadily" /></div></Panel></section>
    <Panel><Heading title="Recommended actions" subtitle="Practical next steps generated from the current data" /><div className="action-grid"><Action title="Increase West inventory" text="Demand continues to outpace the other regions. Keep availability high for Aura Pro and Nova X." /><Action title="Lift East margin" text="Review discounting and delivery costs in East to move performance toward the company average." /><Action title="Protect repeat business" text="The existing customer base is healthy. Use post-purchase offers to increase the average order value." /></div></Panel>
  </>;

  const revenuePage = <>
    <section className="kpis"><Kpi label="Recognized revenue" value={money(revenue)} change="12.5%" /><Kpi label="Gross profit" value={money(profit)} change="8.2%" /><Kpi label="Revenue / order" value={money(revenue / Math.max(orders, 1))} change="6.4%" /><Kpi label="Monthly run rate" value={money(revenue / (period === "This year" ? 12 : period === "Last quarter" ? 3 : 1))} change="Forecast stable" tone="healthy" /></section>
    <section className="dashboard-grid"><Panel className="revenue-panel"><Heading title="Revenue cadence" subtitle="Monthly performance across the selected period" action={<button className="quiet-button" onClick={exportReport}>Export CSV</button>} /><TrendChart scale={scale} /></Panel><Panel><Heading title="Revenue quality" subtitle="Signals from the current period" /><div className="metric-list"><Metric label="Profit margin" value={percentage(margin)} note="Above operating target" /><Metric label="Largest single market" value="West" note={money(regionData.West.revenue * scale)} /><Metric label="Order volume" value={number(orders)} note="Increasing quarter on quarter" /><Metric label="Sales quantity" value={number(quantity)} note="Units fulfilled" /></div></Panel></section>
    <Panel><Heading title="Monthly revenue ledger" subtitle="Revenue and profit contribution by month" /><div className="table-wrap"><table><thead><tr><th>Month</th><th>Revenue</th><th>Profit</th><th>Margin</th><th>Trend</th></tr></thead><tbody>{trends.map((item, index) => { const previous = trends[Math.max(index - 1, 0)].revenue; const itemRevenue = item.revenue * scale; const itemProfit = item.profit * scale; return <tr key={item.month}><td><b>{item.month}</b></td><td>{money(itemRevenue)}</td><td>{money(itemProfit)}</td><td>{percentage(itemProfit / itemRevenue * 100)}</td><td className="up">↗ {index ? percentage((item.revenue / previous - 1) * 100) : "—"}</td></tr>; })}</tbody></table></div></Panel>
  </>;

  const regionsPage = <>
    <section className="kpis"><Kpi label="Leading region" value="West" change="16.2% growth" /><Kpi label="Regional revenue" value={money(revenue)} change="Across 4 regions" /><Kpi label="Best margin" value="35.1%" change="West region" tone="healthy" /><Kpi label="Regions on target" value="4 / 4" change="All markets healthy" tone="healthy" /></section>
    <Panel><Heading title="Regional performance" subtitle="Click a region to use it as the dashboard filter" /><div className="region-cards">{(Object.entries(regionData) as [RegionName, RegionStats][]).map(([name, item], index) => <button key={name} className={`region-card ${region === name ? "selected" : ""}`} onClick={() => setRegion(name)}><span className={`dot dot-${index}`} /><div><b>{name}</b><small>{number(item.orders * scale)} orders</small></div><strong>{money(item.revenue * scale)}</strong><em>↗ {percentage(item.growth)}</em><div className="mini-progress"><i style={{ width: `${item.revenue / 36000}%` }} /></div></button>)}</div></Panel>
    <section className="dashboard-grid"><Panel><Heading title="Regional contribution" subtitle="Revenue share by market" /><RegionBars region={region} scale={scale} totalRevenue={base.revenue} /></Panel><Panel><Heading title="Regional opportunity" subtitle="The next business priority" /><div className="callout"><span>01</span><div><b>Build on West&apos;s momentum</b><p>West is the fastest-growing region and has the strongest margin. Retain inventory coverage and support the sales team with premium product bundles.</p></div></div><div className="callout"><span>02</span><div><b>Improve East efficiency</b><p>East has the most room to improve margin. Focus on fulfilment costs and premium-product attachment.</p></div></div></Panel></section>
  </>;

  const productsPage = <>
    <section className="kpis"><Kpi label="Top product" value="Aura Pro" change="18.4% growth" /><Kpi label="Products tracked" value="5" change="All active" tone="healthy" /><Kpi label="Top 2 revenue share" value="52%" change="Strong concentration" /><Kpi label="Units sold" value={number(quantity)} change="5.7%" /></section>
    <Panel><Heading title="Product performance" subtitle="Revenue, growth, and contribution across the product portfolio" action={<button className="quiet-button" onClick={exportReport}>Export CSV</button>} /><div className="table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Revenue</th><th>Units</th><th>Share</th><th>Growth</th></tr></thead><tbody>{products.map((item, index) => <tr key={item.name}><td><span className="product-index">0{index + 1}</span><b>{item.name}</b></td><td><span className="tag">{item.category}</span></td><td>{money(item.revenue * scale)}</td><td>{number(item.units * scale)}</td><td><div className="share-cell"><i style={{ width: `${item.share}%` }} />{item.share}%</div></td><td className="up">↗ {percentage(item.growth)}</td></tr>)}</tbody></table></div></Panel>
    <section className="lower-grid"><Panel><Heading title="Portfolio mix" subtitle="Contribution to total revenue" /><ProductBars scale={scale} /></Panel><Panel><Heading title="Merchandising recommendation" subtitle="Based on current product performance" /><div className="callout"><span>✦</span><div><b>Feature Aura Pro and Nova X together</b><p>These products generate more than half of product revenue. Promote them as a premium bundle to protect margin and drive average order value.</p></div></div></Panel></section>
  </>;

  const settings = <div className="settings-grid"><Panel><Heading title="Profile" subtitle="How MetricMind identifies you" /><label className="field-label">Display name<input value={draftName} onChange={(event) => setDraftName(event.target.value)} /></label><div className="settings-actions"><button className="primary-button" onClick={saveProfile}>Save profile</button>{saved && <span className="save-message">Profile saved</span>}</div></Panel><Panel><Heading title="Notifications" subtitle="Choose how MetricMind communicates important changes" /><label className="toggle-row"><span><b>Performance alerts</b><small>Notify me when key metrics change significantly.</small></span><button className={`toggle ${notifications ? "on" : ""}`} onClick={() => setNotifications(!notifications)} aria-label="Toggle performance alerts"><i /></button></label></Panel><Panel><Heading title="Data connection" subtitle="Current analytics source" /><div className="connection"><span className={liveStats?.source === "cube" ? "connection-dot live" : "connection-dot"} /><div><b>{liveStats?.source === "cube" ? "Cube connection active" : "Demo data mode"}</b><p>{liveStats?.source === "cube" ? "MetricMind is receiving live metrics from the Cube API." : "Add the Cube values in .env and start Docker to enable live analytics."}</p></div></div></Panel><Panel><Heading title="Reporting" subtitle="Download a snapshot of the selected dashboard data" /><button className="primary-button" onClick={exportReport}>Download executive report</button></Panel></div>;

  const content: Record<PageName, ReactNode> = { Overview: overview, Analytics: analytics, Revenue: revenuePage, Regions: regionsPage, Products: productsPage, Settings: settings };

  return <div className="app-shell"><aside className="sidebar"><div><div className="brand"><div className="brand-mark">M</div><div><strong>MetricMind</strong><span>INTELLIGENCE SUITE</span></div></div><nav>{pages.map((page) => <button key={page} onClick={() => setActive(page)} className={`nav-item ${active === page ? "active" : ""}`}><Icon name={page} /><span>{page}</span></button>)}</nav></div><div className="side-bottom"><button onClick={() => setActive("Settings")} className={`nav-item ${active === "Settings" ? "active" : ""}`}><Icon name="Settings" /><span>Settings</span></button><p><b>MetricMind 5.0</b><br />Executive Business Intelligence</p></div></aside><main className="content"><header className="topbar"><div><p className="eyebrow">{active === "Overview" ? "EXECUTIVE OVERVIEW" : active.toUpperCase()}</p><h1>{active === "Overview" ? `Good morning, ${userName}.` : active}</h1><p className="muted">{pageDescriptions[active]}</p></div><div className="top-actions"><button className="notification" aria-label="Notifications">●<i /></button><div className="avatar">{initial}</div><div className="profile"><b>{userName}</b><span>Administrator</span></div></div></header>{active !== "Settings" && <section className="filters"><div><b>Business performance</b><span>{sourceLabel}</span></div><div className="selects"><label>Region<select value={region} onChange={(event) => changeRegion(event.target.value as RegionFilter)}><option>All regions</option>{(Object.keys(regionData) as RegionName[]).map((name) => <option key={name}>{name}</option>)}</select></label><label>Time period<select value={period} onChange={(event) => changePeriod(event.target.value)}><option>This year</option><option>Last quarter</option><option>Last 30 days</option></select></label></div></section>}<div className="page-content">{content[active]}</div><footer>© 2026 MetricMind Intelligence · Data refreshes automatically every 15 minutes</footer></main></div>;
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) { return <div className="metric-row"><span>{label}<small>{note}</small></span><b>{value}</b></div>; }
function Action({ title, text }: { title: string; text: string }) { return <article className="action-card"><span>✦</span><h3>{title}</h3><p>{text}</p></article>; }
function RegionBars({ region, scale, totalRevenue }: { region: RegionFilter; scale: number; totalRevenue: number }) { return <div className="regions">{(Object.entries(regionData) as [RegionName, RegionStats][]).map(([name, item], index) => <div className={`region-row ${region === name ? "highlighted" : ""}`} key={name}><span className={`dot dot-${index}`} /><b>{name}</b><div><i style={{ width: `${item.revenue / 36000}%` }} /></div><strong>{money(item.revenue * scale)}</strong><em>{Math.round(item.revenue / totalRevenue * 100)}%</em></div>)}</div>; }
function ProductBars({ scale }: { scale: number }) { return <div className="products">{products.map((item, index) => <div key={item.name}><span className="rank">0{index + 1}</span><b>{item.name}</b><div className="product-bar"><i style={{ width: `${item.share}%` }} /></div><strong>{money(item.revenue * scale)}</strong></div>)}</div>; }

