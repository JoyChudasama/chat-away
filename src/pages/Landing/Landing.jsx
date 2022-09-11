import React from 'react'
import Logo from '../../components/Logo/Logo';
import { Link } from 'react-router-dom';


function Landing() {
    return (
        <>
            <Logo />
            <div>

                <Link to='login'>
                    LOGIN HERE
                </Link>


            </div>
        </>
    )
}

export default Landing;