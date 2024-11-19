import React, { useState } from 'react';
import './switchButtonStyles.css'

const SwitchButton = () => {
    
    const [switchState, setSwitchState] = useState(false)
    const handleChangeSwitchState = (e) => {
        setSwitchState(!switchState)
    }

    return (
        <div>
            {
                switchState
                    ? <i className="bi bi-toggle-on switchIcon" onClick={handleChangeSwitchState}></i>
                    : <i className="bi bi-toggle-off switchIcon" onClick={handleChangeSwitchState}></i>
            }
        </div>
    )
}

export default SwitchButton

