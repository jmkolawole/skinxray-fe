import {useContext, useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {AccountContext} from '../../../contexts';
import {
  useLogin,
  useRegister,
  useGoogleRedirect,
} from '../../../api/mutations/auth.mutation';
import {handleError} from '../../../utils/functions';
import * as S from './Login.style';
import {Button, Text, TextInput, Icon} from '../../../ds/components';
import Loader from '../../../components/Loader/Loader';
import PropTypes from 'prop-types';
import PasswordField from '../../../components/PasswordField/PasswordField';
import GoogleLogo from '../../../assets/images/google-logo.svg';

const Login = ({isSignUp = false}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get params from URL
  const token = searchParams.get('token');
  const userData = searchParams.get('user');
  const error = searchParams.get('error');
  const selectedPlan = searchParams.get('plan');
  const selectedBilling = searchParams.get('billing') || 'monthly';

  // Form states
  const [fieldErrors, setFieldErrors] = useState({
    email: [],
    password: [],
    password_confirmation: [],
  });

  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Account context
  const {setAccount} = useContext(AccountContext);

  // Login and Register mutations
  const {mutate: loginMutate, isPending: isLoginPending} = useLogin();
  const {mutate: registerMutate, isPending: isRegisterPending} = useRegister();
  const {mutate: googleRedirect, isPending: isRedirectPending} =
    useGoogleRedirect();

  const isPending = isSignUp
    ? isRegisterPending
    : isLoginPending || isRedirectPending;

  // Set form field value
  const setValue = (e, field) => {
    setFieldValues({...fieldValues, [field]: e.currentTarget.value});
  };

  // Reset form field error
  const resetErrors = (field) => setFieldErrors({...fieldErrors, [field]: []});

  // Validate form for sign up
  const validateSignUpForm = () => {
    let isValid = true;
    const errors = {...fieldErrors};

    if (fieldValues.password !== fieldValues.password_confirmation) {
      errors.password_confirmation = ['Passwords do not match'];
      isValid = false;
    }

    if (fieldValues.password.length < 8) {
      errors.password = ['Password must be at least 8 characters'];
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  // Handle redirect with token and user data (for social login)
  useEffect(() => {
    if (token && userData) {
      try {
        let user;

        // Try to detect if it's base64 encoded or already JSON
        if (userData.startsWith('{') || userData.startsWith('[')) {
          // It's already JSON (fallback case)
          user = JSON.parse(userData);
        } else {
          // Try to decode as URL-safe base64
          try {
            // Convert URL-safe base64 back to standard base64
            const standardBase64 = userData
              .replace(/-/g, '+')
              .replace(/_/g, '/');
            // Add padding if needed
            const paddedBase64 =
              standardBase64 +
              '='.repeat((4 - (standardBase64.length % 4)) % 4);

            const decodedUserData = atob(paddedBase64);
            user = JSON.parse(decodedUserData);
          } catch (base64Error) {
            console.error(
              'Base64 decode failed, trying as direct JSON:',
              base64Error
            );
            // If base64 fails, try parsing as JSON directly
            user = JSON.parse(userData);
          }
        }

        // Get social avatar from social accounts if available
        const socialAvatar = user.social_accounts?.[0]?.avatar;

        console.log('Social avatar', socialAvatar);

        // Create new user object without the avatar property
        const userWithoutAvatar = {...user};
        delete userWithoutAvatar.avatar;

        setAccount({
          user: {
            ...userWithoutAvatar,
            avatar: null, // Ensure local avatar starts as null
            socialAvatar: socialAvatar, // Set social avatar from Google
          },
          token,
        });

        // If coming from premium plan selection, redirect to pricing
        if (selectedPlan === 'premium' || selectedPlan === 'expert-care') {
          navigate(`/plans?from=signup&plan=expert-care&billing=${selectedBilling}`);
        } else {
          navigate('/home');
        }
      } catch (err) {
        console.error('Error processing login data:', err);
      }
    } else if (error) {
      console.error('Login error:', error);
      // Optionally show error to user
    }
  }, [token, userData, error, setAccount, navigate, selectedPlan]);
  // Handle Google login click
  const handleGoogleLogin = () => {
    googleRedirect(null, {
      onSuccess: (response) => {
        console.log('Redirect success:', response);
      },
      onError: (error) => {
        console.error('Failed to get Google redirect URL:', error);
        // Optionally show error to user
        setFieldErrors((prev) => ({
          ...prev,
          email: ['Failed to connect to Google. Please try again.'],
        }));
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (!validateSignUpForm()) return;

      const registerData = {
        email: fieldValues.email,
        password: fieldValues.password,
        password_confirmation: fieldValues.password_confirmation,
      };

      registerMutate(registerData, {
        onSuccess: (res) => {
          setAccount({
            user: res.data.user,
            token: res.data.token,
          });
          // If signing up with premium plan selected, redirect to pricing
          if (selectedPlan === 'premium' || selectedPlan === 'expert-care') {
            navigate(`/plans?from=signup&plan=expert-care&billing=${selectedBilling}`);
          } else {
            navigate('/home');
          }
        },
        onError: (err) => handleError(err, setFieldErrors),
      });
    } else {
      const loginData = {
        email: fieldValues.email,
        password: fieldValues.password,
      };

      loginMutate(loginData, {
        onSuccess: (res) => {
          if (res.data?.user && res.data?.token) {
            setAccount({
              user: res.data.user,
              token: res.data.token,
            });
            navigate('/home');
          } else {
            setFieldErrors({
              email: ['Invalid login response. Please try again.'],
            });
          }
        },
        onError: (err) => {
          handleError(err, setFieldErrors, true, true);
          // Do not navigate on error
        },
      });
    }
  };

  return (
    <div>
      <>
        <S.BackToHomeContainer>
          <S.BackToHomeButton
            type="button"
            onClick={() => navigate('/')}
            title="Return to Home"
            aria-label="Return to Home"
          >
            <Icon name="home" color="primary" bg="inherit" size={18} weight={0} />
          </S.BackToHomeButton>
        </S.BackToHomeContainer>

        <S.Header>
          <Text type="h2" weight={600}>
            {isSignUp ? 'Create an Account' : 'Log in to SkinXray'}
          </Text>

          <Text color="text.secondary">
            {isSignUp
              ? 'Sign up to get started with skin health analysis'
              : 'Welcome! Proceed with your credentials'}
          </Text>
        </S.Header>
        <S.LoginForm onSubmit={handleSubmit} method="post" autoComplete="off">
          <TextInput
            type="email"
            placeholder="Enter your email"
            label="Email"
            size="sm"
            autoComplete="email"
            required
            value={fieldValues.email}
            error={fieldErrors.email}
            onChange={(e) => setValue(e, 'email')}
            onKeyDown={() => resetErrors('email')}
            name="email"
          />

          <PasswordField
            label="Password (8+ Characters)"
            placeholder="••••••••"
            size="sm"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            required
            value={fieldValues.password}
            error={fieldErrors.password}
            onChange={(e) => setValue(e, 'password')}
            onKeyDown={() => resetErrors('password')}
            name="password"
          />

          {isSignUp && (
            <PasswordField
              label="Confirm Password"
              placeholder="••••••••"
              size="sm"
              autoComplete="new-password"
              required
              value={fieldValues.password_confirmation}
              error={fieldErrors.password_confirmation}
              onChange={(e) => setValue(e, 'password_confirmation')}
              onKeyDown={() => resetErrors('password_confirmation')}
              name="password_confirmation"
            />
          )}

          {!isSignUp && (
            <div className="text-right">
              <S.AuthLink onClick={() => navigate('/forgot-password')}>
                Forgot Password?
              </S.AuthLink>
            </div>
          )}

          <Button type="submit" width="100%" disabled={isPending}>
            {isPending ? <Loader /> : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <S.SocialLoginSection>
            <S.SocialDivider>
              <S.DividerLine />
              <Text size="sm" color="text.secondary">
                or continue with
              </Text>
              <S.DividerLine />
            </S.SocialDivider>

            <S.SocialButtonsContainer>
              <S.SocialButton
                type="button"
                onClick={handleGoogleLogin}
                aria-label="Sign in with Google"
              >
                <img src={GoogleLogo} alt="Google" />
                <Text color="text.primary">Google</Text>
              </S.SocialButton>

              {/* <S.SocialButton type="button" aria-label="Sign in with Apple">
                <Icon name="apple" size={20} />
                <Text>Continue with Apple</Text>
              </S.SocialButton> */}
            </S.SocialButtonsContainer>
          </S.SocialLoginSection>

          <S.SwitchAuthMode>
            <Text size="sm" color="text.secondary">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            <S.AuthLink
              onClick={() => navigate(isSignUp ? '/login' : '/signup')}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </S.AuthLink>
          </S.SwitchAuthMode>
        </S.LoginForm>
      </>
    </div>
  );
};

Login.propTypes = {
  isSignUp: PropTypes.bool,
};

export default Login;
