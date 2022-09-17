import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = () => {
    return (
        <div className='logoContainerWrapper'>
            <div className='logoContainer'>
                <Link to='/'>
                    <span className="logo">Chat Away...</span>
                </Link>
            </div>
        </div>

    )
}

export default Logo;