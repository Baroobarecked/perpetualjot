import { useEffect, useRef, useState } from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import './loggedout.css';

function LoggedOut() {
    let style;
    const [change, setChange] = useState(false);
    let divs = useRef([])
    let count = useRef(0)
    const logo = () => {
        if(count.current < 10) {
            setChange(false)
            count.current++;
            const rand = Math.floor(Math.random() * 10);
            style = {
                // animationDuration: '3',
                // animationName: 'matrix',
                // display: 'relative',
                fontSize: rand,
                color: 'red',
            }
            divs.current.push(content())

        }
            console.log(divs)
    }

    const content = () => {
        return (
            <p style={style}>Perpetual</p>
        )
    }
    
    useEffect(() => {
        console.log('sup')
        const rand = Math.floor(Math.random() * 100);

        if(0 < count.current) {
            setInterval(() => {
                setChange(true)
            }, 3000);
        }
        console.log(change)
        logo();
    }, [change])
    if(count.current === 0) logo();
    return (
        <div className='loggedoutmain'>
            <div className='logo'>
                {/* {logo()} */}
                {/* {change && logo()} */}
                {!change && divs.current.map(div => div)}
            </div>
            <div className='links'>
                <LoginFormModal />
                <SignupFormModal />
            </div>
        </div>
    );
};

export default LoggedOut;