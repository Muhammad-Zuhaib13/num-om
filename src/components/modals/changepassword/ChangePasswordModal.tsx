import React, { useState } from 'react';
import { ThemeMode } from 'types/config';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Radio,
  RadioGroup,
  Slide,
  Stack,
  Switch,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  OutlinedInput,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { CameraOutlined, EditFilled, CloseOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { minPhoneLimit } from '../../../data/data';
import IconButton from 'components/@extended/IconButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'store';
import { updateAdminPassword, clearUser } from 'store/reducers/auth';
import { Modals } from '..';
import { useRouter } from 'next/router';
export default function ChangePasswordModal({ modalFlags, updateModalFlag, handleToggle }: any) {
  const theme = useTheme();
  const isLoading = useSelector((state) => state?.common?.loading?.updateAdminPassword);
  interface UpdatePassword {
    current_password: string;
    password: string;
  }
  const [formValues, setFormValues] = useState<UpdatePassword>();
  const [confirmModalOpen, setConfirmModalOpen] = useState({
    confirmModal: false
  });
  const updateModalFlagConfirm = (key: string, value: boolean) => {
    setConfirmModalOpen((prevFlags) => ({
      ...prevFlags,
      [key]: value
    }));
  };
  const handleOpenConfirmationModal = () => {
    updateModalFlagConfirm('confirmModal', true);
  };
  const router = useRouter();
  const handleSubmitonConfirm = async (updatePassword: UpdatePassword) => {
    try {
      const res = await dispatch(updateAdminPassword(updatePassword));
      updateModalFlag('changePasswordModal', false);
      handleToggle();
    } catch (error) {
      console.log(error);
    }
  };
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfrimPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleShowConfrimPassword = () => {
    setShowConfirmPassword(!showConfrimPassword);
  };
  // const porfileData = {
  //   currentPassword: 'Pass@2024'
  // };
  const message = 'Are sure you want to change your password?';
  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <Dialog
        open={modalFlags?.changePasswordModal}
        onClose={() => {
          handleToggle();
          updateModalFlag('changePasswordModal', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }}
          validationSchema={yup.object().shape({
            currentPassword: yup.string().required('Current password is required'),
            newPassword: yup
              .string()
              .required('New password is required')
              .min(8, 'Password must be at least 8 characters')
              .max(30, 'Password must be at most 30 characters')
              .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
              ),
            confirmPassword: yup
              .string()
              .required('Confirm password is required')
              // @ts-ignore
              .oneOf([yup.ref('newPassword'), null], { message: 'Passwords must match' })
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            const updatePassword = {
              current_password: values.currentPassword,
              password: values.newPassword
            };
            setFormValues(updatePassword);
            handleOpenConfirmationModal();
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box sx={{ p: 1, py: 1.5, pt: 2, minWidth: '600px !important' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <DialogTitle
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    padding={'3px 24px!important'}
                    alignItems={'center'}
                  >
                    <Typography variant="h5" sx={{ height: 'auto !important' }}>
                      Change Password
                    </Typography>
                    <IconButton
                      onClick={() => {
                        //   setModalFlag({ ...modalFlags, viewCrew: { open: false, crewData: {} as CrewData } });
                        updateModalFlag('changePasswordModal', false);
                        handleToggle();
                      }}
                      size="medium"
                    >
                      <CloseOutlined />
                    </IconButton>
                  </DialogTitle>
                </Stack>
                <Divider />

                <DialogContent>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                      <MainCard>
                        <Grid item sm={12} sx={{ mb: 2 }}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="password-login">Current Password</InputLabel>
                            <OutlinedInput
                              fullWidth
                              // color={capsWarning ? 'warning' : 'primary'}
                              error={Boolean(touched.currentPassword && errors.currentPassword)}
                              id="currentPassword"
                              type={showCurrentPassword ? 'text' : 'password'}
                              value={values.currentPassword}
                              name="currentPassword"
                              onBlur={(event: React.FocusEvent<any, Element>) => {
                                handleBlur(event);
                              }}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowCurrentPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color="secondary"
                                  >
                                    {showCurrentPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              placeholder="Enter current password"
                            />
                            {touched.currentPassword && errors.currentPassword && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.currentPassword}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item sm={12} sx={{ mb: 2 }}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">New Password</InputLabel>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(touched.newPassword && errors.newPassword)}
                              id="newPassword"
                              type={showNewPassword ? 'text' : 'password'}
                              value={values.newPassword}
                              name="newPassword"
                              onBlur={(event: React.FocusEvent<any, Element>) => {
                                handleBlur(event);
                              }}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color="secondary"
                                  >
                                    {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              placeholder="Enter new password"
                            />
                            {touched.newPassword && errors.newPassword && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.newPassword}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item sm={12} sx={{ mb: 2 }}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="phone">Confirm Password</InputLabel>
                            <OutlinedInput
                              fullWidth
                              // color={capsWarning ? 'warning' : 'primary'}
                              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                              id="confirmPassword"
                              type={showConfrimPassword ? 'text' : 'password'}
                              value={values.confirmPassword}
                              name="confirmPassword"
                              onBlur={(event: React.FocusEvent<any, Element>) => {
                                handleBlur(event);
                              }}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowConfrimPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    color="secondary"
                                  >
                                    {showConfrimPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              placeholder="Enter confirm password"
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {/* @ts-ignore */}
                                {errors.confirmPassword.message}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                      </MainCard>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Box>

              <Divider />
              <DialogActions sx={{ p: 2.5 }}>
                <Button
                  color="error"
                  onClick={() => {
                    handleToggle();
                    updateModalFlag('changePasswordModal', false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Update
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <Modals.ConfirmModal
        modalFlagConfirm={confirmModalOpen}
        updateModalFlagConfirm={updateModalFlagConfirm}
        formValues={formValues}
        handleSubmitonConfirm={handleSubmitonConfirm}
        message={message}
        isLoading={isLoading}
      />
    </>
  );
}
