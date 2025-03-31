import React, { useEffect, useState } from 'react'

const PlusIcon = ({ className, id, onPlus, initialStatus }) => {
    
    const [active, setActive] = useState(initialStatus);

    useEffect(() => {
        setActive(initialStatus);
    }, [initialStatus]);

    const handleActive = () => {
        const newStatus = !active
        setActive(newStatus)
        onPlus(id, newStatus)
    }

    return (
        <svg
            className={`${className} ${active ? 'active' : ''}`}
            onClick={handleActive}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" rx="10" fill="white"/>
            <path d="M12.7683 10.5903H10.6259V12.7142C10.6259 13.0561 10.3463 13.3334 10.0013 13.3334C9.65634 13.3334 9.3767 13.0561 9.3767 12.7142V10.5903H7.23426C6.91249 10.5573 6.66797 10.2885 6.66797 9.96779C6.66797 9.6471 6.91249 9.37831 7.23426 9.34527H9.36999V7.22806C9.40331 6.90909 9.67445 6.66669 9.99794 6.66669C10.3214 6.66669 10.5926 6.90909 10.6259 7.22806V9.34527H12.7683C13.0901 9.37831 13.3346 9.6471 13.3346 9.96779C13.3346 10.2885 13.0901 10.5573 12.7683 10.5903Z" fill="#130F26"/>
        </svg>
    )
}

export default PlusIcon
