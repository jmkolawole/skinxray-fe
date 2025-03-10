import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AccountContext} from '../../../contexts';
import {useLogin, useRegister} from '../../../api/mutations/auth.mutation';
import {handleError} from '../../../utils/functions';
import * as S from './Login.style';
import {Button, Text, TextInput, Icon} from '../../../ds/components';
import Loader from '../../../components/Loader/Loader';
import PropTypes from 'prop-types';
import PasswordField from '../../../components/PasswordField/PasswordField';

const Login = ({ isSignUp = false }) => {
  const navigate = useNavigate();

  // Form states
  const [fieldErrors, setFieldErrors] = useState({
    email: [], 
    password: [],
    password_confirmation: []
  });
  
  const [fieldValues, setFieldValues] = useState({
    email: '', 
    password: '',
    password_confirmation: ''
  });

  // Account context
  const {setAccount} = useContext(AccountContext);

  // Login and Register mutations
  const {mutate: loginMutate, isPending: isLoginPending} = useLogin();
  const {mutate: registerMutate, isPending: isRegisterPending} = useRegister();

  const isPending = isSignUp ? isRegisterPending : isLoginPending;

  // Set form field value
  const setValue = (e, field) => {
    setFieldValues({...fieldValues, [field]: e.currentTarget.value});
  };

  // Reset form field error
  const resetErrors = (field) => setFieldErrors({...fieldErrors, [field]: []});

  // Validate form for sign up
  const validateSignUpForm = () => {
    let isValid = true;
    const errors = { ...fieldErrors };
    
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (!validateSignUpForm()) return;
      
      const registerData = {
        email: fieldValues.email,
        password: fieldValues.password,
        password_confirmation: fieldValues.password_confirmation
      };
      
      registerMutate(registerData, {
        onSuccess: (res) => {
          setAccount({
            user: res.data.user,
            token: res.data.token,
          });
          navigate('/home');
        },
        onError: (err) => handleError(err, setFieldErrors),
      });
    } else {
      const loginData = {
        email: fieldValues.email,
        password: fieldValues.password
      };
      
      loginMutate(loginData, {
        onSuccess: (res) => {
          setAccount({
            user: res.data.user,
            token: res.data.token,
          });
          navigate('/home');
        },
        onError: (err) => handleError(err, setFieldErrors),
      });
    }
  };

  return (
    <div>
      <>
        <S.BackToHomeContainer>
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
            size="sm"
            title="Return to Home"
            aria-label="Return to Home"
          >
            <Icon name={'home'} color='shades.0'/> 
          </Button>
        </S.BackToHomeContainer>
        
        <S.Header>
          <Text type="h2" weight={500}>
            {isSignUp ? 'Create an Account' : 'Log in to Skinxray AI'}
          </Text>

          <Text color="neutral.600">
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

          <Button type="submit" width="100%" disabled={isPending}>
            {isPending ? <Loader /> : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
          
          <S.SocialLoginSection>
            <S.SocialDivider>
              <S.DividerLine />
              <Text size="sm" color="neutral.600">or continue with</Text>
              <S.DividerLine />
            </S.SocialDivider>
            
            <S.SocialButtonsContainer>
              <S.SocialButton
                type="button"
                onClick={() => {/* TODO: Implement Google login */}}
                aria-label="Sign in with Google"
              >
                <Icon name="google" size={20} />
                <Text>Continue with Google</Text>
              </S.SocialButton>
              
              <S.SocialButton
                type="button"
                onClick={() => {/* TODO: Implement Apple login */}}
                aria-label="Sign in with Apple"
              >
                <Icon name="apple" size={20} />
                <Text>Continue with Apple</Text>
              </S.SocialButton>
            </S.SocialButtonsContainer>
          </S.SocialLoginSection>
          
          <S.SwitchAuthMode>
            <Text size="sm" color="neutral.600">
              {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            </Text>
            <S.AuthLink onClick={() => navigate(isSignUp ? '/login' : '/signup')}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </S.AuthLink>
          </S.SwitchAuthMode>
        </S.LoginForm>
      </>
    </div>
  );
};

Login.propTypes = {
  isSignUp: PropTypes.bool
};

export default Login;
