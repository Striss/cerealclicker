import './Game.css';
import React, { useEffect, useState } from 'react';
import oatButtonImage from './oat_button.png';
import fallingOatImage from './falling-oat.png';
import fallingFlavorImage from './flavor-drop.png';
import cerealOatsImage from './cerealOatyOats.png';
import cerealFruityOats from './cerealFruityOats.png'
import flavorMakerImage from './flavormaker.png';
import makeFlavor from './makeFlavor.png';

function Game({ money, setMoney }) {
    // State to keep track of number of clicks
    const [oats, setOats] = useState(0);
    const [oatMultiplier, setOatMultiplier] = useState(1);
    const [flavor, setFlavor] = useState(0);
    const [autoOats, setAutoOats] = useState(0);
    const [oatyOatsSold, setOatyOatsSold] = useState(0);
    const [fruityOatsSold, setFruityOatsSold] = useState(0);

    const [showOatsBoxButton, setShowOatsBoxButton] = useState(false);
    const [showOatsBoxImage, setShowOatsBoxImage] = useState(true);

    const [showFruityOatsButton, setShowFruityOatsButton] = useState(false);
    const [showFruityOatsImage, setShowFruityOatsImage] = useState(true);

    const [oatsBoxButtonDisabled, setOatsBoxButtonDisabled] = useState(false);
    const [flavBoxButtonDisabled, setFlavBoxButtonDisabled] = useState(false);
    
    const [buyFlavorMakerButton, setBuyFlavorMakerButton] = useState(false);
    const [flavorMaker, setFlavorMaker] = useState(false)
    const [autoHarvester, setAutoHarvester] = useState(false)


    useEffect(() => {
        const interval = setInterval(() => {
            setOats(prevOats => prevOats + autoOats);
        }, 1000);

        return () => clearInterval(interval);
    }, [autoOats]);


    // Function to handle click events
    const handleOatsClick = () => {
        setOats(oats + oatMultiplier);
        if (oats + oatMultiplier >= 20 && oatsBoxButtonDisabled == false) {
            setShowOatsBoxButton(true);
            setShowOatsBoxImage(true)
        } else if (oats + oatMultiplier >= 20 && oatsBoxButtonDisabled == true) {
            setOatsBoxButtonDisabled(false);
            setShowOatsBoxImage(true)
        }

        if (oats >= 5 && flavor >= 10) {
            setFlavBoxButtonDisabled(false)
            setShowFruityOatsButton(true);
        }

        // Generate random starting positions within the viewport
        const randomTop = Math.floor(Math.random() * window.innerHeight);
        const randomLeft = Math.floor(Math.random() * window.innerWidth);

        const oatImage = new Image();
        oatImage.src = fallingOatImage;
        oatImage.className = "falling-oat";

          // Apply inline styles to adjust the image size
        oatImage.style.width = "50px"; // Adjust the width as needed
        oatImage.style.height = "auto"; // Maintain aspect ratio

        // Apply inline styles to setm,m,mm,m,m,mmmm,m,m,mm the initial position of the image
        // oatImage.style.top = `${randomTop}px`;
        oatImage.style.left = `${randomLeft}px`;
        oatImage.style.zIndex = 0;

        // Append the image element to the document body
        document.querySelector('.falling-oats-container').appendChild(oatImage);

        // Set a timeout to remove the image after a certain duration
        setTimeout(() => {
            oatImage.remove();
        }, 2000); // Adjust the duration as needed
    };


    const handleBuyFlavorMakerClick = () => {
        setMoney(prevMoney => {
            const curMoney = prevMoney - 15;
            checkMoney(curMoney)
            return curMoney;
        })
        setBuyFlavorMakerButton(false);
        setFlavorMaker(true);
    }


    const handleFlavorClick = () => {
        setFlavor(flavor + 1);

        if (oats >= 5 && flavor >= 10) {
            setFlavBoxButtonDisabled(false)
            setShowFruityOatsButton(true);
            setShowFruityOatsImage(true);
        }

        // Generate random starting positions within the viewport
        const randomTop = Math.floor(Math.random() * window.innerHeight);
        const randomLeft = Math.floor(Math.random() * window.innerWidth);

        const flavImage = new Image();
        flavImage.src = fallingFlavorImage;
        flavImage.className = "falling-oat";

          // Apply inline styles to adjust the image size
        flavImage.style.width = "50px"; // Adjust the width as needed
        flavImage.style.height = "auto"; // Maintain aspect ratio

        // Apply inline styles to setm,m,mm,m,m,mmmm,m,m,mm the initial position of the image
        // oatImage.style.top = `${randomTop}px`;
        flavImage.style.left = `${randomLeft}px`;
        flavImage.style.zIndex = 0;

        // Append the image element to the document body
        document.querySelector('.falling-oats-container').appendChild(flavImage);

        // Set a timeout to remove the image after a certain duration
        setTimeout(() => {
            flavImage.remove();
        }, 1600); // Adjust the duration as needed
    }


    const handleOatsBoxButtonClick = () => {
        setOats(prevOats => {
            const updatedOats = prevOats - 20;
            if (updatedOats < 20) {
                //setShowOatsBoxButton(false);
                setOatsBoxButtonDisabled(true);
                setShowOatsBoxImage(false)
            }

            if (updatedOats < 10) {
                setFlavBoxButtonDisabled(true);
            }
            return updatedOats;
        });

        setOatyOatsSold(prevSold => {
            const updatedSold = prevSold + 1;
            return updatedSold
        });

        setMoney(prevMoney => {
            const curMoney = prevMoney + 5;
            checkMoney(curMoney)
            return curMoney;
        })

    }


    const checkMoney = (curMoney) => {
        // Auto-Harvester Prompt
        if (curMoney >= (50 * (autoOats+1))) {
            setAutoHarvester(true);
        } else {
            setAutoHarvester(false);
        }

        if (curMoney >= 15 && flavorMaker == false) {
            // Buy flavor maker
            setBuyFlavorMakerButton(true);
        }
    }


    const handleFruityOatsBoxClick = () => {
        setOats(prevOats => {
            const updatedOats = prevOats - 5;
            if (updatedOats < 5) {
                setFlavBoxButtonDisabled(true);
                setShowFruityOatsImage(false)
            }
            return updatedOats;
        });

        setFlavor(prevFlav => {
            const updatedFlav = prevFlav - 10;
            if (updatedFlav < 10) {
                setFlavBoxButtonDisabled(true);
                setShowFruityOatsImage(false)
            }
            return updatedFlav;
        });

        setFruityOatsSold(prevSold => {
            const updatedSold = prevSold + 1;
            return updatedSold
        });

        setMoney(prevMoney => {
            const curMoney = prevMoney + 8;
            checkMoney(curMoney)
            return curMoney;
        })
    }


    const handleBuyAutoHarvester = () => {
        setAutoOats(prevAuto => {
            const curAuto = prevAuto + 1;
            return curAuto;
        });


        setMoney(prevMoney => {
            const curMoney = prevMoney - 50;
            checkMoney(curMoney)
            return curMoney;
        })
    }


    return (
        <div className='game-container'>
            <p></p>
            {autoHarvester && (
                <div className='card-container'>
                    <button onClick={handleBuyAutoHarvester}>Buy Auto Harvester</button>
                </div>
            )}
            <p></p>
            <div className="card-container">
                <div className="left-content">
                    <div className="counter-box">
                        {oats}
                    </div>
                    <div className="counter-label">
                        Oats
                    </div>
                    {autoOats > 0 && (
                        <div className='counter-label'>Auto Harvest x{autoOats}</div>
                    )}
                </div>
                <div className="right-content">
                    <div className="button-container" onClick={handleOatsClick}>
                        <img src={oatButtonImage} alt="Harvest Oats"></img>
                    </div>
                </div>
            </div>

            <p></p>
            {flavorMaker && (
                <div className='card-container'>
                    <div className='left-content'>
                        <div className="counter-box">
                            {flavor}
                        </div>
                        <div className="counter-label">
                            Fruity Flavors
                        </div>
                    </div>

                    <div className='right-content'>
                        <div className='button-container' onClick={handleFlavorClick}>
                            <img src={makeFlavor} alt="Mix Flavors"></img>
                        </div>
                    </div>
                </div>
            )}
            <p></p>
            {showFruityOatsButton && (
                <div className="card-container">
                    <div className="left-content">
                        <div className='counter-box'>
                            {fruityOatsSold}
                        </div>
                        <div className='counter-label'>
                            Fruity Oats Sold
                        </div>
                    </div>
                    <div className="right-content">
                        <div className={`button-container ${showFruityOatsImage ? '' : 'hidden'}`} onClick={handleFruityOatsBoxClick}>
                            <img src={cerealFruityOats} alt="Sell Fruity Oats Cereal"></img>
                        </div>
                    </div>
                </div>
         
            )}
            <p></p>
            {showOatsBoxButton && (
                <div className="card-container">
                    <div className="left-content">
                        <div className='counter-box'>
                            {oatyOatsSold}
                        </div>
                        <div className='counter-label'>
                            Oaty Oats Sold
                        </div>
                    </div>
                    <div className="right-content">
                    <div className={`button-container ${showOatsBoxImage ? '' : 'hidden'}`} onClick={handleOatsBoxButtonClick}>
                            <img src={cerealOatsImage} alt="Sell Oaty Oats Cereal"></img>
                        </div>
                    </div>
                </div>
            )}

            <p></p>
            {buyFlavorMakerButton && (
                <div className="card-container">
                    <div className="left-content">
                        <h3>Buy Fruity Flavor Maker</h3>
                    </div>
                    <div className="right-content">
                        <div className="button-container" onClick={handleBuyFlavorMakerClick}>
                            <img src={flavorMakerImage} alt="Buy Flavor Maker"></img>
                        </div>
                    </div>

                </div>
            )}
            <p></p>

            <div className='falling-oats-container'></div>
        </div>
    );
}

export default Game;