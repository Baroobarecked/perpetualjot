
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import './loggedout.css';

function LoggedOut() {
    
    return (
        <div className='loggedoutmain'>
            <div className='logo'>
            </div>
           
            <div className='links'>
                <LoginFormModal />
                <SignupFormModal />
            </div>
        </div>
    );
};

export default LoggedOut;