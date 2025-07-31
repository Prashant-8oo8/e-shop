import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LoginCard.css';



const LoginCard = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in both fields.');
      return;
    }

    try {
      const res = await fetch('https://e-shop-96gh.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);

      alert('Login successful!');

      // Correct navigation:
      navigate('/shop'); 
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Server error');
    }
  };

  return (
    <div className="login__card__container">
      <div className="login__card">
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <form className="login__inputs" onSubmit={handleLogin}>
          <div className="email__input__container input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              className="email__input login__input"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password__input__container input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && <p className="error__text">{errorMsg}</p>}

          <div className="login__button__container">
            <button type="submit" className="login__button">
              LOGIN
            </button>
          </div>
        </form>
        <div className="login__other__actions">
          <div className="login__forgot__password">Forgot password?</div>
          <div className="login__new__account">
            Don't have account? <Link to="/account/register">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
