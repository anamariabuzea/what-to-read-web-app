import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        let isAuthenticated = localStorage.getItem('isAuthenticated');

        if(isAuthenticated) {
            navigate('/browse');
        } else {
            navigate('/login')
        }
    });

    return (
        <div>Home</div>
    )
}

export default Home