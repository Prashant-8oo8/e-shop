import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './RegisterCard.css';


const RegisterCard = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.fname.trim()) newErrors.fname = 'First name is required';
    if (!formData.lname.trim()) newErrors.lname = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch('https://e-shop-96gh.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Registration failed');
      } else {
        alert('Registration successful!');
        // Optionally: redirect to login
        Navigate('../LoginCard/LoginCard');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="register__card__container">
      <form className="register__card" onSubmit={handleSubmit}>
        <div className="register__header">
          <h1>Create Account</h1>
        </div>
        <div className="register__inputs">
          <div className="fname__input__container reg__input__container">
            <label className="fname__label input__label">First name</label>
            <input
              type="text"
              name="fname"
              className="fname__input register__input"
              value={formData.fname}
              onChange={handleChange}
            />
            {errors.fname && <p className="error__text">{errors.fname}</p>}
          </div>

          <div className="lname__input__container reg__input__container">
            <label className="lname__label input__label">Last name</label>
            <input
              type="text"
              name="lname"
              className="lname__input register__input"
              value={formData.lname}
              onChange={handleChange}
            />
            {errors.lname && <p className="error__text">{errors.lname}</p>}
          </div>

          <div className="email__input__container reg__input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              name="email"
              className="email__input register__input"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error__text">{errors.email}</p>}
          </div>

          <div className="password__input__container reg__input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              name="password"
              className="password__input register__input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error__text">{errors.password}</p>}
          </div>

          <div className="register__button__container">
            <button className="register__button" type="submit">
              Create Account
            </button>
          </div>
        </div>
        <div className="register__other__actions">
          <div className="register__login__account">
            Already have account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
