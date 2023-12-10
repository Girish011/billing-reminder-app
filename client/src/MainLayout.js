import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <nav className="sidebar">
                <ul>
                    <li>
                        <Link to="/create-bill">Create Bill</Link>
                    </li>
                    <li>
                        <Link to="/bills">View Bills</Link>
                    </li>
                </ul>
            </nav>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
