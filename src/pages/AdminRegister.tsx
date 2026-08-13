import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingInput from '../components/FloatingInput';
import RippleButton from '../components/RippleButton';
import CanvasBackground from '../components/CanvasBackground';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Mail, Lock, User, ShieldCheck } from 'lucide-react';

export default function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    try {
      const adminEmail = email.trim().toLowerCase();
      await registerUser(adminEmail, name, password, true);
      addToast(`Admin Overseer account activated for ${name}!`, 'success');
      navigate('/admin');
    } catch (err: any) {
      addToast('Registration error: ' + (err.message || 'Failed to create admin account'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative px-4">
      <CanvasBackground dense={true} />

      <div className="w-full max-w-md relative z-10 bg-[#0b1311]/90 border border-[#f59e0b]/40 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl animate-flyInBottom space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] text-xs font-bold text-[#f59e0b]">
            <ShieldCheck className="w-4 h-4 text-[#f59e0b]" /> Admin Registration
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create Admin Account</h2>
          <p className="text-xs text-gray-400">
            Register as a System Overseer to manage students, curriculum tracks, and grant XP.
          </p>
        </div>

        <form onSubmit={handleAdminRegister} className="space-y-4">
          <FloatingInput
            id="admin-reg-name"
            label="Admin Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            icon={User}
          />

          <FloatingInput
            id="admin-reg-email"
            label="Admin Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={Mail}
          />

          <FloatingInput
            id="admin-reg-password"
            label="Admin Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={Lock}
          />

          <RippleButton type="submit" disabled={isSubmitting} variant="gold" className="w-full py-3.5 text-sm font-bold">
            {isSubmitting ? 'Creating Admin...' : 'Create Admin Overseer Account'}
          </RippleButton>
        </form>

        <div className="text-center text-xs text-gray-400">
          Already an admin?{' '}
          <Link to="/login" className="text-[#f59e0b] hover:underline font-semibold">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
