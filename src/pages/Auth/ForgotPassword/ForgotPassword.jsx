import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../../api/mutations/auth.mutation';
import { toast } from 'react-toastify';
import { Button, Text, TextInput, Icon } from '../../../ds/components';
import * as S from '../Login/Login.style';
import { handleError } from '../../../utils/functions';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const [fieldErrors, setFieldErrors] = useState({
    email: [],
  });

  const resetErrors = (field) => setFieldErrors({...fieldErrors, [field]: []});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPasswordMutation.mutateAsync({ email });
      toast.success('Password reset link sent to your email');
      navigate('/login');
    } catch (error) {
      handleError(error, setFieldErrors);
    } finally {
      setIsLoading(false);
    }    
  };

  return (
    <div>
      <S.BackToHomeContainer>
        <Button
          variant="primary"
          onClick={() => navigate('/login')}
          size="sm"
          title="Return to Login"
          aria-label="Return to Login"
        >
          <Icon name="arrow-left" color="shades.0" />
        </Button>
      </S.BackToHomeContainer>

      <S.Header>
        <Text type="h2" weight={500}>
          Forgot Password
        </Text>
        <Text color="neutral.600">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </Text>
      </S.Header>

      <S.LoginForm onSubmit={handleSubmit} method="post" autoComplete="off">
        <TextInput
          type="email"
          placeholder="Enter your email"
          label="Email Address"
          size="sm"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          error={fieldErrors.email}
          onKeyDown={() => resetErrors('email')}
        />

        <Button type="submit" width="100%" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <S.SwitchAuthMode>
          <Text size="sm" color="neutral.600">
            Remember your password?
          </Text>
          <S.AuthLink onClick={() => navigate('/login')}>
            Back to Login
          </S.AuthLink>
        </S.SwitchAuthMode>
      </S.LoginForm>
    </div>
  );
};

export default ForgotPassword; 