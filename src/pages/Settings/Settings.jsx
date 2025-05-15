import {useState, useRef, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import * as S from './Settings.style';
import {Button, Text, Avatar, Icon} from '../../ds';
import {AccountContext} from '../../contexts';
import {useUpdateUserMutation} from '../../api/mutations/users.mutation';
import {handleError} from '../../utils/functions';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import PasswordField from '../../components/PasswordField/PasswordField';

const Settings = () => {
  const navigate = useNavigate();
  const [fieldValues, setFieldValues] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    old_password: [],
    password: [],
    password_confirmation: [],
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const {account, setAccount} = useContext(AccountContext);

  const {mutate, isPending} = useUpdateUserMutation();

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    setPreviewImage(account.user.avatar ? account.user.avatar : null);
  }, [account]);

  const handleInputChange = (e, field) => {
    setFieldValues({...fieldValues, [field]: e.target.value});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetErrors = (field) => setFieldErrors({...fieldErrors, [field]: []});

  const cleanPayload = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== null && value !== undefined // eslint-disable-line no-unused-vars
      )
    );
  };

  const isPayloadEmpty = (data) => {
    // Check if the payload is empty or only contains empty values
    return Object.keys(data).length === 0;
  };

  const validatePasswordChange = () => {
    let isValid = true;
    const errors = { ...fieldErrors };
    
    // If any password field is filled, all password fields must be filled
    const hasAnyPasswordField = fieldValues.old_password || fieldValues.password || fieldValues.password_confirmation;
    
    if (hasAnyPasswordField) {
      if (!fieldValues.old_password) {
        errors.old_password = ['Current password is required'];
        isValid = false;
      }
      
      if (!fieldValues.password) {
        errors.password = ['New password is required'];
        isValid = false;
      }
      
      if (!fieldValues.password_confirmation) {
        errors.password_confirmation = ['Password confirmation is required'];
        isValid = false;
      } else if (fieldValues.password !== fieldValues.password_confirmation) {
        errors.password_confirmation = ['Passwords do not match'];
        isValid = false;
      }
    }
    
    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validate password fields if any are filled
    if (!validatePasswordChange()) {
      return;
    }
    
    const payload = {...fieldValues, image: profileImage};
    const data = cleanPayload(payload);
    
    // Check if the payload is empty
    if (isPayloadEmpty(data)) {
      toast.error('Please make at least one change before submitting');
      return;
    }

    mutate(data, {
      onSuccess: (res) => {
        setAccount((prev) => ({
          ...prev,
          user: res.data, 
        }));
        toast.success('Settings Updated Successfully');
      },
      onError: (err) => {
        handleError(err, setFieldErrors, false);
      },
    });
  };

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <Text weight={600} type="h6">
            Settings
          </Text>
        </S.Header>
        <S.ContentInner>
          {/* Profile Image Section */}
          <S.ImageSection>
            <Avatar
              radius={isMobile ? 80 : 100}
              size={isMobile ? 80 : 100}
              type={previewImage ? 'image' : 'text'}
              value={
                previewImage
                  ? previewImage
                  : account.user.email
              }
            />
            <S.FileInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button 
              onClick={handleChooseImageClick}
              width={isMobile ? '100%' : 'auto'}
            >
              Choose Image
            </Button>
          </S.ImageSection>
          
          {/* Subscription Section */}
          <S.SettingsSection>
            <S.SectionTitle>
              <S.SectionIcon>
                <Icon name="creditCard" size={18} />
              </S.SectionIcon>
              <Text weight={600} size="md">
                Subscription
              </Text>
            </S.SectionTitle>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text weight={500} style={{ marginBottom: '4px' }}>
                  {account.user.subscription_plan ? 
                    account.user.subscription_plan.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ') : 
                    'Basic Plan'
                  }
                </Text>
                <Text size="sm" color="neutral.600">
                  Manage your subscription and billing details
                </Text>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate('/subscription')}
                width={isMobile ? '100%' : 'auto'}
              >
                View Details
              </Button>
            </div>
          </S.SettingsSection>

          {/* Password Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            method="post"
            autoComplete="off"
          >
            <S.SettingsSection>
              <S.SectionTitle>
                <S.SectionIcon>
                  <i className="fas fa-lock"></i>
                </S.SectionIcon>
                <Text weight={600} size="md">
                  Change Password
                </Text>
              </S.SectionTitle>
              
              <PasswordField
                label="Current Password"
                placeholder="Enter your current password"
                value={fieldValues.old_password}
                onChange={(e) => handleInputChange(e, 'old_password')}
                error={fieldErrors?.old_password}
                onKeyDown={() => resetErrors('old_password')}
                autoComplete="current-password"
                name="old_password"
              />
              
              <PasswordField
                label="New Password"
                placeholder="Enter a new password"
                value={fieldValues.password}
                onChange={(e) => handleInputChange(e, 'password')}
                error={fieldErrors?.password}
                onKeyDown={() => resetErrors('password')}
                autoComplete="new-password"
                name="password"
              />
              
              <PasswordField
                label="Confirm New Password"
                placeholder="Re-enter your new password"
                value={fieldValues.password_confirmation}
                onChange={(e) => handleInputChange(e, 'password_confirmation')}
                error={fieldErrors?.password_confirmation}
                onKeyDown={() => resetErrors('password_confirmation')}
                autoComplete="new-password"
                name="password_confirmation"
              />
              
              <S.SaveButton
                type="submit"
                radius={8}
                size="md"
                variant="primary"
                width={isMobile ? '100%' : 'fit-content'}
                disabled={isPending}
              >
                {isPending ? <Loader /> : 'Update Information'}
              </S.SaveButton>
            </S.SettingsSection>
          </form>
        </S.ContentInner>
      </S.Content>
    </S.Container>
  );
};

export default Settings;
