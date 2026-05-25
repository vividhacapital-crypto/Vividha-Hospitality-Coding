import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const success = await register(
      formData.email,
      formData.fullName,
      formData.password
    );
    if (success) {
      toast.success('Registration successful!');
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🏨 HotelHub</h1>
          <p>Guest Experience Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Create Your Account</h2>

          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <FiUser size={18} />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <FiMail size={18} />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FiLock size={18} />
              <input
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <FiLock size={18} />
              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            <FiUserPlus size={20} />
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <button
            className="link-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
