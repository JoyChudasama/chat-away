import React from 'react'
import { Link } from 'react-router-dom';
import './Landing.scss';
import img1 from '../../img/landing/img1.png';
import img2 from '../../img/landing/img2.png';
import img3 from '../../img/landing/img3.png';

function Landing() {
    return (
        <>
            <div className='containerWrapper'>


                <div className='container'>

                    <div className='left'>

                        <div className="logo chat">Chat</div>
                        <div className="logo away">Away...</div>

                        <div className="description">
                            Send texts and images in real time to your friends and family.
                        </div>

                        <div className='navLinkContainer'>
                            <Link className='loginLink' to='login'>Login</Link>
                            <Link className='signUpLink' to='sign-up'>Sign Up</Link>
                        </div>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>



                    <div className='right'>
                        <div className='imagesContainer'>
                            <div className='imagesContainer'>

                                <img className='img1' src={img1} />
                                <img className='img2' src={img2} />
                                <img className='img3' src={img3} />
                                {/* <img src={landing}  /> */}

                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </>
    )
}

export default Landing;