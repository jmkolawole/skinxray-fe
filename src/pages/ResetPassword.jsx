import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPassword } from '../api/mutations/auth.mutation';
import { toast } from 'react-toastify';
import { Button, Text } from '../ds/components';
import PasswordField from '../components/PasswordField/PasswordField';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    token: '',
  });

  const resetPasswordMutation = useResetPassword();

  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      toast.error('Invalid reset link');
      navigate('/login');
      return;
    }

    setFormData(prev => ({
      ...prev,
      email: decodeURIComponent(email),
      token,
    }));
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPasswordMutation.mutateAsync(formData);
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Text type="h2" weight={500} className="text-center">
            Reset Your Password
          </Text>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <PasswordField
              label="New Password"
              placeholder="••••••••"
              size="sm"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
            <PasswordField
              label="Confirm Password"
              placeholder="••••••••"
              size="sm"
              autoComplete="new-password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              name="password_confirmation"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            width="100%"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 