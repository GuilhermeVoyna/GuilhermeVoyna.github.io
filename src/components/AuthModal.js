import { useState } from 'react';

const AuthModal = ({setShowModal,isSignUp}) => {

    const [email, SetEmail] = useState(null);
    const [password, SetPassword] = useState(null);
    const [confirmPassword, SetConfirmPassword] = useState(null);
    const [error, SetError] = useState(null);

    const handleClick = () => {
        setShowModal(false);
    }

    console.log(email, password, confirmPassword)

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (isSignUp && password !== confirmPassword) {
                SetError('Passwords do not match');
            }
            console.log('post request to db')
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>x</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking texto grande de leis e talsssss</p>
            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required={true}
                onChange={(e) => SetEmail(e.target.value)}
            />
            <input 
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required={true}
                onChange={(e) => SetPassword(e.target.value)}
            />
            {isSignUp&&<input 
                type="password"
                id="password-check"
                name="password-check"
                placeholder="confirm password"
                required={true}
                onChange={(e) => SetConfirmPassword(e.target.value)}
            />}
            <input className='secondary-button' type='submit' value="submit"/>
            <p>{error}</p>

            </form>
            <hr/>
            <h2>GET THE APP</h2>
        </div>
    )

}
export default AuthModal;