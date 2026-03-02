import React from 'react';

const Dashboard = () => {
    return (
        <div className="module-container">
            <h1 className="module-title">Dashboard</h1>
            <p className="module-desc">Overview of key business metrics and recent activities.</p>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '24px' }}>
                <div className="stat-card" style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Total Revenue</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', marginTop: '8px', color: 'var(--text-main)' }}>฿1,234,500</p>
                </div>
                <div className="stat-card" style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Active Orders</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', marginTop: '8px', color: 'var(--text-main)' }}>42</p>
                </div>
                <div className="stat-card" style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Low Stock Items</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', marginTop: '8px', color: 'var(--text-main)' }}>8</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
