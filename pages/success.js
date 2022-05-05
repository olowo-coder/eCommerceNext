import React,{ useState, useEffect } from 'react';
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalQuantities(0);
        setTotalPrice(0);
    }, [])

  return (
    <div className="success-wrapper">
        <div className="success">
            <p className="icon">
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email inbox for your receipt.</p>
            <p className="description">
                If you have any questions, please email
                <a className="email" href="mailto:lanre.olowo@yahoo.com">
                lanre.olowo@yahoo.com
                </a>
            </p>
            <Link href="/">
                <button type="button" width="30px" className="btn">
                    Continue shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success;