import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="layout-main">
                <header className="layout-header">
                    <div className="header-title">QERP System</div>
                    <div className="header-actions">
                        <button className="user-btn">
                            <span className="user-avatar">AD</span>
                            Admin User
                        </button>
                    </div>
                </header>
                <main className="layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
