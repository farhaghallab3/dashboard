import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import image from '../assets/login.jpeg';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  toast: React.RefObject<Toast | null>;
}

const Login = ({ toast }: LoginProps) => {
  const [email, setEmailLocal] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setEmail } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Missing Fields',
        detail: 'Please enter both email and password.',
        life: 3000,
      });
      return;
    }

    // Save email in context and localStorage
    localStorage.setItem('userEmail', email);
    setEmail(email);

    toast.current?.show({
      severity: 'success',
      summary: 'Login Successful',
      detail: `Welcome ${email}`,
      life: 2000,
      className: 'bg-orange-800 text-white',
    });

    setTimeout(() => navigate('/courses'), 500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left image */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-browen-100">
  <img
    src={image}
    alt="Login Visual"
    className="w-full max-w-md object-cover rounded-lg shadow-lg"
  />
</div>


      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-orange-800">Sign In!</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmailLocal(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-orange-800 text-white py-2 rounded hover:bg-orange-900 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
