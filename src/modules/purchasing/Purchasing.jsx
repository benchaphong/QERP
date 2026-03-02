import React, { useState } from 'react';
import { ShoppingCart, Plus, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Purchasing = () => {
    const { purchaseOrders, addPurchaseOrder, products } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Purchase Mode: 'existing' or 'new'
    const [purchaseMode, setPurchaseMode] = useState('existing');

    const [newOrder, setNewOrder] = useState({ supplier: '', productId: '', quantity: 1, purchasePrice: 0 });
    const [newProductDetails, setNewProductDetails] = useState({ name: '', sku: '', price: 0 });

    const selectedProduct = purchaseMode === 'existing' ? products.find(p => p.id === parseInt(newOrder.productId)) : null;

    // Calculate Total correctly
    const calculatedTotal = newOrder.purchasePrice * newOrder.quantity;

    const handleCreateOrder = (e) => {
        e.preventDefault();
        if (!newOrder.supplier || newOrder.quantity < 1 || newOrder.purchasePrice <= 0) return;

        if (purchaseMode === 'existing' && !selectedProduct) return;
        if (purchaseMode === 'new' && (!newProductDetails.name || !newProductDetails.sku)) return;

        let itemToOrder = {};

        if (purchaseMode === 'existing') {
            itemToOrder = {
                isNewProduct: false,
                productId: selectedProduct.id,
                quantity: newOrder.quantity,
                price: newOrder.purchasePrice
            };
        } else {
            itemToOrder = {
                isNewProduct: true,
                name: newProductDetails.name,
                sku: newProductDetails.sku,
                quantity: newOrder.quantity,
                price: newProductDetails.price // This is the selling price for the app
            };
        }

        addPurchaseOrder(
            { supplier: newOrder.supplier, total: calculatedTotal },
            [itemToOrder]
        );

        setNewOrder({ supplier: '', productId: '', quantity: 1, purchasePrice: 0 });
        setNewProductDetails({ name: '', sku: '', price: 0 });
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
                {purchaseOrders.length === 0 ? (
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
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>Qty</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'right' }}>Total (฿)</th>
                                <th style={{ padding: '12px', fontWeight: '500', textAlign: 'center' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseOrders.map(order => {
                                const totalQty = order.items?.reduce((sum, item) => sum + item.quantity, 0) || '-';
                                return (
                                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                                        <td style={{ padding: '16px 12px', fontWeight: '600', color: 'var(--primary-color)' }}>{order.id}</td>
                                        <td style={{ padding: '16px 12px', color: 'var(--text-main)' }}>{order.supplier}</td>
                                        <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{order.date}</td>
                                        <td style={{ padding: '16px 12px', textAlign: 'center', fontWeight: '500' }}>{totalQty}</td>
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
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)', padding: '20px' }}>
                    <div style={{ backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '600px', padding: '24px', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto' }}>
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

                            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="mode"
                                        checked={purchaseMode === 'existing'}
                                        onChange={() => setPurchaseMode('existing')}
                                    />
                                    <span>Restock Existing Product</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="mode"
                                        checked={purchaseMode === 'new'}
                                        onChange={() => setPurchaseMode('new')}
                                    />
                                    <span>Buy New Product (Add to Inventory)</span>
                                </label>
                            </div>

                            <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-color)' }}>
                                {purchaseMode === 'existing' ? (
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Select Product</label>
                                        <select
                                            required
                                            value={newOrder.productId}
                                            onChange={e => setNewOrder({ ...newOrder, productId: e.target.value })}
                                            style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                        >
                                            <option value="" disabled>-- Select a Product to Restock --</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>{p.name} (Current Stock: {p.stock})</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div style={{ gridColumn: 'span 2' }}>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>New Product Name</label>
                                            <input
                                                type="text"
                                                required={purchaseMode === 'new'}
                                                value={newProductDetails.name}
                                                onChange={e => setNewProductDetails({ ...newProductDetails, name: e.target.value })}
                                                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>SKU</label>
                                            <input
                                                type="text"
                                                required={purchaseMode === 'new'}
                                                value={newProductDetails.sku}
                                                onChange={e => setNewProductDetails({ ...newProductDetails, sku: e.target.value })}
                                                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Retail Selling Price (฿)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                required={purchaseMode === 'new'}
                                                value={newProductDetails.price}
                                                onChange={e => setNewProductDetails({ ...newProductDetails, price: parseFloat(e.target.value) || 0 })}
                                                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                                title="This is the price you will sell it for in the Sales module"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Quantity to Order</label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        value={newOrder.quantity}
                                        onChange={e => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 1 })}
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Purchase Price per Unit (฿)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        required
                                        value={newOrder.purchasePrice}
                                        onChange={e => setNewOrder({ ...newOrder, purchasePrice: parseFloat(e.target.value) || 0 })}
                                        style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit' }}
                                    />
                                </div>
                            </div>

                            <div style={{ backgroundColor: 'var(--bg-color)', padding: '12px', borderRadius: 'var(--radius-md)', marginTop: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600' }}>
                                    <span>Total Purchase Order Amount:</span>
                                    <span style={{ color: 'var(--primary-color)', fontSize: '1.25rem' }}>฿{calculatedTotal.toLocaleString()}</span>
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
                                    Confirm Order
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
