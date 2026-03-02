import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    // Inventory State
    const [products, setProducts] = useState([
        { id: 1, name: 'Premium Office Chair', sku: 'FUR-001', stock: 45, price: 3500 },
        { id: 2, name: 'Mechanical Keyboard', sku: 'ELC-042', stock: 12, price: 2800 },
    ]);

    // Sales State
    const [salesOrders, setSalesOrders] = useState([
        { id: 'SO-2026-001', customer: 'Global Retail Corp', date: '2026-03-01', total: 450000, status: 'Completed', items: [] },
        { id: 'SO-2026-002', customer: 'Local Shop XYZ', date: '2026-03-02', total: 12500, status: 'Processing', items: [] },
    ]);

    // Purchasing State
    const [purchaseOrders, setPurchaseOrders] = useState([
        { id: 'PO-2026-001', supplier: 'Tech Gadgets Inc.', date: '2026-03-01', total: 125000, status: 'Approved', items: [] },
        { id: 'PO-2026-002', supplier: 'Office Supplies Co.', date: '2026-03-02', total: 8500, status: 'Pending', items: [] },
    ]);

    // Actions
    const addProduct = (product) => {
        setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    };

    const updateProductStock = (productId, quantityChange) => {
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, stock: p.stock + quantityChange } : p
        ));
    };

    const addSalesOrder = (order, orderItems) => {
        const newId = `SO-2026-00${salesOrders.length + 1}`;
        setSalesOrders(prev => [...prev, {
            id: newId,
            customer: order.customer,
            date: new Date().toISOString().split('T')[0],
            total: order.total,
            status: 'Processing',
            items: orderItems
        }]);

        // Deduct inventory
        orderItems.forEach(item => {
            updateProductStock(item.productId, -item.quantity);
        });
    };

    const addPurchaseOrder = (order, orderItems) => {
        const newId = `PO-2026-00${purchaseOrders.length + 1}`;
        setPurchaseOrders(prev => [...prev, {
            id: newId,
            supplier: order.supplier,
            date: new Date().toISOString().split('T')[0],
            total: order.total,
            status: 'Pending',
            items: orderItems
        }]);

        // We can increase inventory here, or wait until status is 'Approved/Received'
        // For simplicity, let's increase it right now or if it's a new product, add it
        orderItems.forEach(item => {
            if (item.isNewProduct) {
                addProduct({
                    name: item.name,
                    sku: item.sku,
                    stock: item.quantity,
                    price: item.price
                });
            } else {
                updateProductStock(item.productId, item.quantity);
            }
        });
    };

    const updateSalesOrderStatus = (orderId, newStatus) => {
        setSalesOrders(prev => {
            const order = prev.find(o => o.id === orderId);
            if (!order || order.status === newStatus) return prev;

            // Revert inventory if Cancelled
            if (newStatus === 'Cancelled' && order.status !== 'Cancelled') {
                setProducts(prodList => {
                    let map = [...prodList];
                    order.items.forEach(item => {
                        map = map.map(p => p.id === item.productId ? { ...p, stock: p.stock + item.quantity } : p);
                    });
                    return map;
                });
            }
            // Deduct again if moved from Cancelled to Processing/Completed
            else if (order.status === 'Cancelled' && newStatus !== 'Cancelled') {
                setProducts(prodList => {
                    let map = [...prodList];
                    order.items.forEach(item => {
                        map = map.map(p => p.id === item.productId ? { ...p, stock: p.stock - item.quantity } : p);
                    });
                    return map;
                });
            }

            return prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
        });
    };

    const updatePurchaseOrderStatus = (orderId, newStatus) => {
        setPurchaseOrders(prev => {
            const order = prev.find(o => o.id === orderId);
            if (!order || order.status === newStatus) return prev;

            // Revert inventory if Cancelled
            if (newStatus === 'Cancelled' && order.status !== 'Cancelled') {
                setProducts(prodList => {
                    let map = [...prodList];
                    order.items.forEach(item => {
                        if (!item.isNewProduct) {
                            map = map.map(p => p.id === item.productId ? { ...p, stock: p.stock - item.quantity } : p);
                        }
                    });
                    return map;
                });
            }
            // Add again if moved from Cancelled to Pending/Approved
            else if (order.status === 'Cancelled' && newStatus !== 'Cancelled') {
                setProducts(prodList => {
                    let map = [...prodList];
                    order.items.forEach(item => {
                        if (!item.isNewProduct) {
                            map = map.map(p => p.id === item.productId ? { ...p, stock: p.stock + item.quantity } : p);
                        }
                    });
                    return map;
                });
            }

            return prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
        });
    };

    const value = {
        products, addProduct, updateProductStock,
        salesOrders, addSalesOrder, updateSalesOrderStatus,
        purchaseOrders, addPurchaseOrder, updatePurchaseOrderStatus
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
