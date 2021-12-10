import './HomePage.css';
import { useRef } from 'react';

function HomePage() {
    let style;
    let divs = useRef([]);
    let count = useRef(0);
    const logo1 = () => {
        while(count.current < 100) {
            count.current++;
            const rand = Math.floor((Math.random() * 30)+10);
            const rand2 = Math.floor(Math.random() * 100);
            const rand3 = Math.floor(Math.random() * 100);
            style = {
                top: `${rand2}vh`,
                left: `${rand3}vw`,
                fontSize: rand,
            }
            divs.current.push(content1(rand))

        }
    }
    const logo2 = () => {
        count.current = 0;
        while(count.current < 100) {
            count.current++;
            const rand = Math.floor((Math.random() * 30)+10);
            const rand2 = Math.floor(Math.random() * 100);
            const rand3 = Math.floor(Math.random() * 100);
            style = {
                top: `${rand2}vh`,
                left: `${rand3}vw`,
                fontSize: rand,
            }
            divs.current.push(content2(rand))

        }
    }
    const logo3 = () => {
        count.current = 0;
        while(count.current < 100) {
            count.current++;
            const rand = Math.floor((Math.random() * 30)+10);
            const rand2 = Math.floor(Math.random() * 100);
            const rand3 = Math.floor(Math.random() * 100);
            style = {
                top: `${rand2}vh`,
                left: `${rand3}vw`,
                fontSize: rand,
            }
            divs.current.push(content3(rand))

        }
    }
    const logo4 = () => {
        count.current = 0;
        while(count.current < 100) {
            count.current++;
            const rand = Math.floor((Math.random() * 30)+10);
            const rand2 = Math.floor(Math.random() * 100);
            const rand3 = Math.floor(Math.random() * 100);
            style = {
                top: `${rand2}vh`,
                left: `${rand3}vw`,
                fontSize: rand,
            }
            divs.current.push(content4(rand))

        }
    }

    const content1 = (rand) => {
        return (
            <p className={rand % 2 ? 'left fast' : 'right fast'} style={style}>Perpetual</p>
        )
    }
    const content2 = (rand) => {
        return (
            <p className={rand % 2 ? 'left slow' : 'right slow'} style={style}>Perpetual</p>
        )
    }
    const content3 = (rand) => {
        return (
            <p className={rand % 2 ? 'jotleft fast' : 'jotright fast'} style={style}>Jot</p>
        )
    }
    const content4 = (rand) => {
        return (
            <p className={rand % 2 ? 'jotleft slow' : 'jotright slow'} style={style}>Jot</p>
        )
    }

    return (
        <div className='homepagemain'>
            <div className='sidebarblurleft'>
                <div className='sidebar'>
                    {logo1()}
                    {logo2()}
                    {logo3()}
                    {logo4()}
                    {divs.current.map(div => div)}
                </div>
            </div>
            <div className='frame'>
                <div className='buffer'></div>
                <div className='title'>
                    <h1>Welcome to PerpetualJot</h1>
                </div>
                <div className='whyus'>
                    <div className='contain_image'>
                        <img alt='logged in user page' src='https://bl3302files.storage.live.com/y4mEtgaObPylUspQEBIGZ3c46Mnt8FTSBz1mF4dPLYemI9UJu1pWSR5WYBbIu8sRg1AFH0n8bDYFV83LjsUkz_nW_ielaVAzxKJb7WigXOZeTR8UJ-vRne4jDw17fJceV7RcaVW6a76d3oMdq8mvm81vVt1WKq8j47giOeu0PA-J4uGu_wm-JM23szK8acKdcO8?width=1902&height=1006&cropmode=none'></img>

                    </div>
                    <div className='contain_text'>
                        <h4>
                            WORK ANYWHERE
                        </h4>
                        <p>
                            Your notes are stored remotely to be accessed on whatever computer you need them.
                        </p>
                        <h4>
                            REMEMBER EVERYTHING
                        </h4>
                        <p>
                            With quickly made notes you will be able to jot down your ideas as they occur.
                        </p>
                        <h4>
                            FIND THINGS FAST
                        </h4>
                        <p>
                            Get what you need, when you need it with powerful search capabilities.
                        </p>

                    </div>
                </div>
                <div className='seepossibilities'>
                        <h2>
                            Easy work flow
                        </h2>
                    <div className='containVideo'>
                        <video controls>

                            <source src='/video/exampleworkflow.mp4'
                                    type="video/mp4" />

                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

            

export default HomePage;