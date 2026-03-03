import React, { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingCart, Package, Truck, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';

const Dashboard = () => {
    const { products, salesOrders, purchaseOrders } = useAppContext();

    const totalRevenue = salesOrders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
    const activeOrders = salesOrders.filter(order => order.status === 'Processing').length;

    const totalPurchases = purchaseOrders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
    const pendingPurchases = purchaseOrders.filter(order => order.status === 'Pending').length;

    const lowStockItems = products.filter(p => p.stock < 20).length;
    const totalProducts = products.length;

    // Process data for charts
    const monthlyData = useMemo(() => {
        const dataMap = {};

        // Month names for mapping
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Initialize an empty map for the year 2026 based on our mock data (or current year ideally)
        monthNames.forEach(m => {
            dataMap[m] = { name: m, sales: 0, purchases: 0 };
        });

        // Add Sales
        salesOrders.forEach(order => {
            if (order.status !== 'Cancelled') {
                const date = new Date(order.date);
                const month = monthNames[date.getMonth()];
                if (dataMap[month]) {
                    dataMap[month].sales += order.total;
                }
            }
        });

        // Add Purchases
        purchaseOrders.forEach(order => {
            if (order.status !== 'Cancelled') {
                const date = new Date(order.date);
                const month = monthNames[date.getMonth()];
                if (dataMap[month]) {
                    dataMap[month].purchases += order.total;
                }
            }
        });

        return Object.values(dataMap);
    }, [salesOrders, purchaseOrders]);

    return (
        <div className="module-container">
            <h1 className="module-title">Dashboard</h1>
            <p className="module-desc" style={{ marginBottom: '24px' }}>Overview of key business metrics, recent activities, and monthly trends.</p>

            {/* Top Stat Cards */}
            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {/* Sales Section */}
                <div className="stat-card" style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #3b82f6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ padding: '8px', backgroundColor: '#eff6ff', borderRadius: '8px', color: '#3b82f6' }}>
                                <ShoppingCart size={20} />
                            </div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Sales Revenue</h3>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.75rem', fontWeight: '600', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: '12px' }}>
                            <ArrowUpRight size={12} />
                            Activity
                        </span>
                    </div>
                    <div>
                        <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>฿{totalRevenue.toLocaleString()}</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                            <span style={{ fontWeight: '600', color: '#3b82f6' }}>{activeOrders}</span> Active Sales Orders
                        </p>
                    </div>
                </div>

                {/* Purchasing Section */}
                <div className="stat-card" style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #f59e0b', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ padding: '8px', backgroundColor: '#fef3c7', borderRadius: '8px', color: '#f59e0b' }}>
                                <Truck size={20} />
                            </div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Purchasing Cost</h3>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.75rem', fontWeight: '600', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '12px' }}>
                            <Activity size={12} />
                            Pending
                        </span>
                    </div>
                    <div>
                        <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>฿{totalPurchases.toLocaleString()}</p>
                        <p style={{ fontSize: '0.875rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                            <span style={{ fontWeight: '600', color: '#f59e0b' }}>{pendingPurchases}</span> Pending Purchase Orders
                        </p>
                    </div>
                </div>

                {/* Inventory Section */}
                <div className="stat-card" style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #10b981', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ padding: '8px', backgroundColor: '#d1fae5', borderRadius: '8px', color: '#10b981' }}>
                                <Package size={20} />
                            </div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>Inventory Status</h3>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: '0.75rem', fontWeight: '600', backgroundColor: '#fee2e2', padding: '2px 8px', borderRadius: '12px' }}>
                            <ArrowDownRight size={12} />
                            Alerts
                        </span>
                    </div>
                    <div>
                        <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>{totalProducts} <span style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-muted)' }}>items</span></p>
                        <p style={{ fontSize: '0.875rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                            <span style={{ fontWeight: '600', color: '#ef4444' }}>{lowStockItems}</span> items need restocking
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Monthly Sales & Purchases Overview */}
                <div style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', color: 'var(--text-main)' }}>Monthly Overview (Sales vs Purchases)</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart
                                data={monthlyData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dx={-10} tickFormatter={(value) => `฿${value / 1000} k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
                                    formatter={(value) => [`฿${value.toLocaleString()} `, undefined]}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="sales" name="Sales Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="purchases" name="Purchasing Cost" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Trend Line Chart */}
                <div style={{ padding: '24px', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', color: 'var(--text-main)' }}>Revenue Trend</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <LineChart
                                data={monthlyData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dx={-10} tickFormatter={(value) => `฿${value / 1000} k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
                                    formatter={(value) => [`฿${value.toLocaleString()} `, undefined]}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="sales" name="Sales Revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
