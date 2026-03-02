import React, { useState } from 'react';
import { CircleDollarSign, Plus, X } from 'lucide-react';

const Sales = () => {
    const [orders, setOrders] = useState([
        { id: 'SO-2026-001', customer: 'Global Retail Corp', date: '2026-03-01', total: 450000, status: 'Completed' },
        { id: 'SO-2026-002', customer: 'Local Shop XYZ', date: '2026-03-02', total: 12500, status: 'Processing' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({ customer: '', total: 0 });

    const handleCreateOrder = (e) => {
        e.preventDefault();
        if (!newOrder.customer) return;

        const newId = `SO-2026-00${orders.length + 1}`;
        setOrders([...orders, {
            id: newId,
            customer: newOrder.customer,
            date: new Date().toISOString().split('T')[0],
            total: newOrder.total,
            status: 'Processing'
        }]);
        setNewOrder({ customer: '', total: 0 });
        setIsModalOpen(false);
    };

    return (
        <div className="module-container" style={{ position: 'relative' }}>
            <div className="module-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 className="module-title">Sales Module</h1>
                    <p className="module-desc">Manage customers, sales orders, and shipping.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: '500' }}>
                    <Plus size={18} /> New Sales Order
                </button>
            </div>

            <div className="content-card" style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '24px', minHeight: '400px' }}>
                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                        <CircleDollarSign size={48} style={{ margin: '0 auto', opacity: 0.5, marginBottom: '16px' }} />
                        <p>No sales orders yet. Create one to get started.</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '12px', fontWeight: '500' }}>SO Number</th>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Customer</th>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Date</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'right' }}>Total (฿)</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                                    <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--primary-color)' }}>{order.id}</td>
                                    <td style={{ padding: '16px 12px', color: 'var(--text-main)' }}>{order.customer}</td>
                                    <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{order.date}</td>
                                    <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '500' }}>
                                        {Number(order.total).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            backgroundColor: order.status === 'Completed' ? '#dcfce7' : '#e0e7ff',
                                            color: order.status === 'Completed' ? '#166534' : '#3730a3',
                                            fontWeight: '600',
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Create Sales Order</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Customer Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newOrder.customer}
                                    onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    placeholder="e.g. John Doe"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Total Amount (฿)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    required
                                    value={newOrder.total}
                                    onChange={e => setNewOrder({ ...newOrder, total: parseFloat(e.target.value) || 0 })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: '500', color: 'var(--text-main)', backgroundColor: 'var(--bg-color)' }}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: '500', color: 'white', backgroundColor: 'var(--primary-color)' }}>
                                    Create SO
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sales;
