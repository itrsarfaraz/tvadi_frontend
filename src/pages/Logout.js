import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.removeItem('userDetails');
        navigate('/login');
        window.location.reload();
    });
    return (
        <>
        </>
    )
}

export default Logout