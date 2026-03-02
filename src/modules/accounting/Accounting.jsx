import React, { useState } from 'react';
import { Calculator, Plus, X } from 'lucide-react';

const Accounting = () => {
    const [invoices, setInvoices] = useState([
        { id: 'INV-2026-001', client: 'Global Retail Corp', date: '2026-03-01', dueDate: '2026-03-31', quantity: 90, unitPrice: 5000, amount: 450000, status: 'Paid' },
        { id: 'INV-2026-002', client: 'Local Shop XYZ', date: '2026-03-02', dueDate: '2026-04-01', quantity: 250, unitPrice: 50, amount: 12500, status: 'Unpaid' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newInvoice, setNewInvoice] = useState({ client: '', quantity: 1, unitPrice: 0, dueDate: '' });

    const calculatedAmount = newInvoice.quantity * newInvoice.unitPrice;

    const handleCreateInvoice = (e) => {
        e.preventDefault();
        if (!newInvoice.client || !newInvoice.dueDate || newInvoice.quantity < 1) return;

        const newId = `INV-2026-00${invoices.length + 1}`;
        setInvoices([...invoices, {
            id: newId,
            client: newInvoice.client,
            date: new Date().toISOString().split('T')[0],
            dueDate: newInvoice.dueDate,
            quantity: newInvoice.quantity,
            unitPrice: newInvoice.unitPrice,
            amount: calculatedAmount,
            status: 'Unpaid'
        }]);
        setNewInvoice({ client: '', quantity: 1, unitPrice: 0, dueDate: '' });
        setIsModalOpen(false);
    };

    return (
        <div className="module-container" style={{ position: 'relative' }}>
            <div className="module-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 className="module-title">Accounting Module</h1>
                    <p className="module-desc">Manage charts of accounts, invoices, and payments.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: '500' }}>
                    <Plus size={18} /> Create Invoice
                </button>
            </div>

            <div className="content-card" style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '24px', minHeight: '400px' }}>
                {invoices.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                        <Calculator size={48} style={{ margin: '0 auto', opacity: 0.5, marginBottom: '16px' }} />
                        <p>No invoices generated yet.</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Invoice No</th>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Client</th>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Issued Date</th>
                                <th style={{ padding: '12px', fontWeight: '500' }}>Due Date</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>Qty</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'right' }}>Unit Price (฿)</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'right' }}>Amount (฿)</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(invoice => (
                                <tr key={invoice.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                                    <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--primary-color)' }}>{invoice.id}</td>
                                    <td style={{ padding: '16px 12px', color: 'var(--text-main)' }}>{invoice.client}</td>
                                    <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{invoice.date}</td>
                                    <td style={{ padding: '16px 12px', color: 'var(--text-main)' }}>{invoice.dueDate}</td>
                                    <td style={{ padding: '16px 12px', textAlign: 'center', fontWeight: '500' }}>{invoice.quantity || '-'}</td>
                                    <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '500' }}>{invoice.unitPrice ? Number(invoice.unitPrice).toLocaleString() : '-'}</td>
                                    <td style={{ padding: '16px 12px', textAlign: 'right', fontWeight: '500' }}>
                                        {Number(invoice.amount).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            backgroundColor: invoice.status === 'Paid' ? '#dcfce7' : '#fee2e2',
                                            color: invoice.status === 'Paid' ? '#166534' : '#991b1b',
                                            fontWeight: '600',
                                            fontSize: '0.75rem',
                                            textTransform: 'uppercase'
                                        }}>
                                            {invoice.status}
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
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Create Invoice</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateInvoice} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Client Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newInvoice.client}
                                    onChange={e => setNewInvoice({ ...newInvoice, client: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Quantity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        value={newInvoice.quantity}
                                        onChange={e => setNewInvoice({ ...newInvoice, quantity: parseInt(e.target.value) || 1 })}
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Unit Price (฿)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        required
                                        value={newInvoice.unitPrice}
                                        onChange={e => setNewInvoice({ ...newInvoice, unitPrice: parseFloat(e.target.value) || 0 })}
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Due Date</label>
                                <input
                                    type="date"
                                    required
                                    value={newInvoice.dueDate}
                                    onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ backgroundColor: 'var(--bg-color)', padding: '12px', borderRadius: 'var(--radius-md)', marginTop: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600' }}>
                                    <span>Total Amount:</span>
                                    <span style={{ color: 'var(--primary-color)', fontSize: '1.25rem' }}>฿{calculatedAmount.toLocaleString()}</span>
                                </div>
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
                                    Save Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accounting;
