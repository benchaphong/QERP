import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingCart, Package, Truck, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const Dashboard = () => {
    const { products, salesOrders, purchaseOrders } = useAppContext();

    const totalRevenue = salesOrders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
    const activeOrders = salesOrders.filter(order => order.status === 'Processing').length;

    const totalPurchases = purchaseOrders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
    const pendingPurchases = purchaseOrders.filter(order => order.status === 'Pending').length;

    const lowStockItems = products.filter(p => p.stock < 20).length;
    const totalProducts = products.length;

    return (
        <div className="module-container">
            <h1 className="module-title">Dashboard</h1>
            <p className="module-desc" style={{ marginBottom: '24px' }}>Overview of key business metrics and recent activities across Sales, Purchasing, and Inventory.</p>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
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
        </div>
    );
};

export default Dashboard;
