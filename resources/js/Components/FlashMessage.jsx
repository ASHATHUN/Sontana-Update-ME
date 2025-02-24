import React, { useState, useEffect } from 'react';

const FlashMessage = ({ flash }) => { 
    console.log("Received Flash Message:", flash); // ✅ ตรวจสอบค่า

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");

    // ✅ ตรวจสอบว่า Flash Message เปลี่ยนแปลงหรือไม่
    useEffect(() => {
        if (flash?.success || flash?.error) {
            console.log("🔔 New Flash Message Received:", flash);
            setMessage(flash.success || flash.error);
            setMessageType(flash.success ? "success" : "error");
            setShowMessage(true);

            const timer = setTimeout(() => {
                console.log("⏳ Hiding Flash Message...");
                setShowMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash.success, flash.error]); // ✅ ฟังเฉพาะค่าที่เปลี่ยน

    console.log("Current State -> showMessage:", showMessage, "message:", message);

    if (!showMessage || !message) return null;

    return ( 
        <div 
            className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-md text-white 
                ${messageType === "success" ? 'bg-green-500' : 'bg-red-500'}`}
        > 
            <p>{message}</p> 
        </div> 
    ); 
}; 
 
export default FlashMessage;
