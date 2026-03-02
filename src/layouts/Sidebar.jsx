import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    Calculator,
    CircleDollarSign,
    PackageSearch
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Purchasing', path: '/purchasing', icon: ShoppingCart },
        { name: 'Sales', path: '/sales', icon: CircleDollarSign },
        { name: 'Accounting', path: '/accounting', icon: Calculator },
        { name: 'Inventory', path: '/inventory', icon: PackageSearch },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="brand">
                    <span className="brand-icon">◼</span> QERP
                </div>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        <item.icon className="nav-icon" />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
