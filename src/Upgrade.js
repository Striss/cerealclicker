import React from 'react';

function Upgrade({ name, cost, clickMultiplier, onClick }) {
    return (
        <div>
            <p>{name} - Cost: {cost} clicks</p>
            <button onClick={onClick}>Upgrade ({clickMultiplier}x)</button>
        </div>
    );
}

export default Upgrade;
