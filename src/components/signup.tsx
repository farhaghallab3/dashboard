import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import image from '../assets/login.jpeg';

interface SignupProps {
  toast: React.RefObject<Toast | null>;
}

const Signup = ({ toast }: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
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

    // Check if the user already exists
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      toast.current?.show({
        severity: 'warn',
        summary: 'User Exists',
        detail: 'This email is already registered.',
        life: 3000,
      });
      return;
    }

    // Save new user data in localStorage
    const newUser = { email, password };
    localStorage.setItem('user', JSON.stringify(newUser));

    toast.current?.show({
      severity: 'success',
      summary: 'Signup Successful',
      detail: `Welcome ${email}`,
      life: 2000,
    });

    setTimeout(() => navigate('/login'), 1000); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex">
      {/* Left image */}
      <div className="hidden md:flex w-1/2 bg-browen-100 justify-center items-center">
        <img
          src={image}
          alt="Login Visual"
          className="w-3/4 h-3/4 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-orange-800">Sign Up!</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-orange-800 text-white py-2 rounded hover:bg-orange-900 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
