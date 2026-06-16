import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as S from './Settings.style';
import {
  Avatar,
  Button,
  Icon,
  PrimaryButton,
  SettingsGroup,
  GroupLabel,
  SettingsRow,
  RowIcon,
  RowContent,
  RowTitle,
  RowSubtitle,
  RowLeft,
  Text,
} from '../../ds';
import { AccountContext } from '../../contexts';
import { useUpdateUserMutation, useDeleteAccountMutation } from '../../api/mutations/users.mutation';
import { handleError } from '../../utils/functions';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import PasswordField from '../../components/PasswordField/PasswordField';
import Modal from '../../components/Modal/Modal';

const Settings = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const { account, setAccount, clearAccount } = useContext(AccountContext);
  const { mutate, isPending } = useUpdateUserMutation();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccountMutation();

  useEffect(() => {
    setPreviewImage(account.user.avatar || null);
  }, [account]);

  const handleInputChange = (e, field) => {
    setFieldValues({ ...fieldValues, [field]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetErrors = (field) => setFieldErrors({ ...fieldErrors, [field]: [] });

  const cleanPayload = (data) =>
    Object.fromEntries(Object.entries(data).filter(([, v]) => v !== '' && v != null));

  const validatePasswordChange = () => {
    let isValid = true;
    const errors = { ...fieldErrors };
    const hasAny = fieldValues.old_password || fieldValues.password || fieldValues.password_confirmation;

    if (hasAny) {
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
    e?.preventDefault();
    if (!validatePasswordChange()) return;

    const data = cleanPayload({ ...fieldValues, image: profileImage });
    if (Object.keys(data).length === 0) {
      toast.error('Please make at least one change before submitting');
      return;
    }

    mutate(data, {
      onSuccess: (res) => {
        setAccount((prev) => ({ ...prev, user: res.data }));
        toast.success('Settings updated successfully');
      },
      onError: (err) => handleError(err, setFieldErrors, false),
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount(null, {
      onSuccess: () => {
        clearAccount();
        toast.success('Your account has been deleted');
        navigate('/');
      },
      onError: (err) => toast.error(err.error || 'Failed to delete account'),
    });
  };

  const planLabel = account.user.subscription_plan
    ? account.user.subscription_plan.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Basic Scan';

  return (
    <>
      <Helmet>
        <title>Settings — SkinXray</title>
      </Helmet>

      <S.Page>
        <S.PageTitle>Settings</S.PageTitle>

        <S.ProfileCard>
          <Avatar
            radius={100}
            size={96}
            type={previewImage ? 'image' : 'text'}
            value={previewImage || account.user.email}
          />
          <S.FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} />
          <PrimaryButton size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
            Change Photo
          </PrimaryButton>
        </S.ProfileCard>

        <SettingsGroup>
          <GroupLabel>Account</GroupLabel>
          <SettingsRow>
            <RowLeft>
              <RowIcon>
                <Icon name="dollar" size={18} bg="inherit" color="primary" weight={0} />
              </RowIcon>
              <RowContent>
                <RowTitle>Subscription</RowTitle>
                <RowSubtitle>{planLabel} — view plan details and activity</RowSubtitle>
              </RowContent>
            </RowLeft>
            <PrimaryButton size="sm" variant="outline" onClick={() => navigate('/subscription')}>
              Manage
            </PrimaryButton>
          </SettingsRow>
          <SettingsRow>
            <RowLeft>
              <RowIcon>
                <Icon name="star" size={18} bg="inherit" color="primary" weight={0} />
              </RowIcon>
              <RowContent>
                <RowTitle>Plans</RowTitle>
                <RowSubtitle>Compare plans and upgrade on the web</RowSubtitle>
              </RowContent>
            </RowLeft>
            <PrimaryButton size="sm" variant="outline" onClick={() => navigate('/plans')}>
              View
            </PrimaryButton>
          </SettingsRow>
        </SettingsGroup>

        <SettingsGroup>
          <GroupLabel>Security</GroupLabel>
          <form ref={formRef} onSubmit={handleSubmit} style={{ padding: '0 20px 20px' }}>
            <S.FormSection>
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
              <S.SaveButton type="submit" variant="primary" disabled={isPending}>
                {isPending ? <Loader /> : 'Update Password'}
              </S.SaveButton>
            </S.FormSection>
          </form>
        </SettingsGroup>

        <S.DangerZone>
          <S.DangerCard>
            <S.DangerHeader>
              <Icon name="warning" size={20} color="destructive.500" bg="inherit" weight={0} />
              <Text weight={600} color="destructive.500">Delete Account</Text>
            </S.DangerHeader>
            <Text size="sm" color="text.secondary">
              Permanently delete your account and all associated scan history. This cannot be undone.
            </Text>
            <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)} disabled={isDeleting}>
              {isDeleting ? <Loader /> : 'Delete Account'}
            </Button>
          </S.DangerCard>
        </S.DangerZone>
      </S.Page>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
        content="Are you sure? All your scan history and preferences will be permanently deleted."
        confirmText="Yes, Delete My Account"
        cancelText="Cancel"
        onConfirm={handleDeleteAccount}
        isDanger
      />
    </>
  );
};

export default Settings;
