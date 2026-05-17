import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

const CHART_COLORS = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#f43f5e', '#ec4899', '#06b6d4'];

const AnalyticsCharts = ({ timeRange, setTimeRange, analyticsData, formatPrice }) => {
  return (
    <div className="dashboard-content">
      <div className="charts-grid">
        <section className="card">
          <div className="card-header">
            <h2 className="card-title"><BarChart3 size={22} color="var(--primary)" /> Spending Analysis</h2>
            <select 
              className="filter-select" 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              style={{ width: 'auto', minWidth: '120px', fontSize: '0.85rem' }}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div style={{ height: window.innerWidth < 640 ? '400px' : '350px', width: '100%', marginTop: '1rem' }}>
            {analyticsData.donutData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.donutData}
                    cx="50%"
                    cy="40%"
                    innerRadius={window.innerWidth < 640 ? 60 : 80}
                    outerRadius={window.innerWidth < 640 ? 90 : 110}
                    paddingAngle={8}
                    dataKey="value"
                    label={({ percentage }) => `${percentage}%`}
                    labelLine={false}
                  >
                    {analyticsData.donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(value) => formatPrice(value)}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle"
                    formatter={(value, entry) => (
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>No data for this period.</p>
            )}
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Cash Flow</h2>
          </div>
          <div style={{ height: window.innerWidth < 640 ? '300px' : '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-secondary)" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="var(--text-secondary)" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `${value}`} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 10 }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid var(--border-light)', 
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                  formatter={(value) => formatPrice(value)}
                />
                <Bar dataKey="amount" radius={[10, 10, 10, 10]} barSize={window.innerWidth < 640 ? 30 : 45}>
                  {analyticsData.barData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
