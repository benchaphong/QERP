import React, { useState } from 'react';
import { ShoppingCart, Plus, X } from 'lucide-react';

const Purchasing = () => {
    const [orders, setOrders] = useState([
        { id: 'PO-2026-001', supplier: 'Tech Gadgets Inc.', date: '2026-03-01', total: 125000, status: 'Approved' },
        { id: 'PO-2026-002', supplier: 'Office Supplies Co.', date: '2026-03-02', total: 8500, status: 'Pending' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({ supplier: '', total: 0 });

    const handleCreateOrder = (e) => {
        e.preventDefault();
        if (!newOrder.supplier) return;

        const newId = `PO-2026-00${orders.length + 1}`;
        setOrders([...orders, {
            id: newId,
            supplier: newOrder.supplier,
            date: new Date().toISOString().split('T')[0],
            total: newOrder.total,
            status: 'Pending'
        }]);
        setNewOrder({ supplier: '', total: 0 });
        setIsModalOpen(false);
    };

    return (
        <div className="module-container" style={{ position: 'relative' }}>
            <div className="module-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 className="module-title">Purchasing Module</h1>
                    <p className="module-desc">Manage suppliers, purchase orders, and receiving.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: '500' }}>
                    <Plus size={18} /> New Purchase Order
                </button>
            </div>

            <div className="content-card" style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '24px', minHeight: '400px' }}>
                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                        <ShoppingCart size={48} style={{ margin: '0 auto', opacity: 0.5, marginBottom: '16px' }} />
                        <p>No purchase orders yet. Create one to get started.</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '12px', fontWeight: '500' }}>PO Number</th>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Supplier</th>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Date</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'right' }}>Total (฿)</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                                    <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--primary-color)' }}>{order.id}</td>
                                    <td style={{ padding: '16px 12px', color: 'var(--text-main)' }}>{order.supplier}</td>
                                    <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{order.date}</td>
                                    <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '500' }}>
                                        {Number(order.total).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            backgroundColor: order.status === 'Approved' ? '#dcfce7' : '#fef08a',
                                            color: order.status === 'Approved' ? '#166534' : '#854d0e',
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
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Create Purchase Order</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Supplier Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newOrder.supplier}
                                    onChange={e => setNewOrder({ ...newOrder, supplier: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    placeholder="e.g. Acme Corp"
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
                                    Create PO
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Purchasing;
