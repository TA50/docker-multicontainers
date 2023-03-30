// component with a center button that call api and display the message inside the body
import React from 'react';

export const Button = ({  onResult }) => {
    const onClick = () => {
        fetch('http://api.localhost:3000/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                onResult(data.message);
            })
        }
        return <div>
            <button onClick={onClick}>Click me</button>
        </div>
    }
