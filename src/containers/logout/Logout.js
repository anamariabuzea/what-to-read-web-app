import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('userData');
        localStorage.removeItem('isAuthenticated');

        setTimeout(() => {
            navigate('/login')
        }, 500);
    });

    return (
        <div className="container">
            <div class="row">
                <div class="col">
                    <p>Loging out...</p>
                </div>
            </div>
        </div>
    )
}

export default Logout