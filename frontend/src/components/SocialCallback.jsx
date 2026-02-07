import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SocialCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { socialLogin } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const state = params.get('state'); // Contains provider info
      
      // Determine provider from state or URL path
      const provider = location.pathname.includes('google') ? 'google' : 'facebook';

      if (code) {
        try {
          // Exchange code for access token
          // In production, this should be done securely through your backend
          const tokenResponse = await fetch(`http://localhost:8000/api/auth/${provider}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });
          
          const { access_token } = await tokenResponse.json();
          
          // Login with access token
          await socialLogin(provider, access_token);
          navigate('/');
        } catch (error) {
          console.error('Social login failed:', error);
          navigate('/login?error=social_login_failed');
        }
      } else {
        navigate('/login?error=no_code');
      }
    };

    handleCallback();
  }, [location, navigate, socialLogin]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-success mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Completing sign in...</h5>
      </div>
    </div>
  );
};

export default SocialCallback;