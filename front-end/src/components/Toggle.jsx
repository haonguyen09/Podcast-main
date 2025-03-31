import React, { useState } from 'react'

const Toggle = ({ id, onToggle, initialStatus  }) => {
    const [active, setActive] = useState(initialStatus)

    const handleToggle = () => {
        const newStatus = !active
        setActive(newStatus)
        onToggle(id, newStatus)
    }

    return (
        <div className={`toggle ${active ? 'active' : ''}`} onClick={handleToggle}>
            <div className='toggle-spinner'></div>
        </div>
    )
}

export default Toggle

