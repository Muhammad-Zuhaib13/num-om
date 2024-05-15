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
  IconButton,
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
const AvatarImg = '/assets/images/users/avatar-10.png';
import { useSelector, useDispatch } from 'store';
import { updateAdminProfile } from 'store/reducers/auth';
import { Modals } from '..';
export default function AccountSettingModal({ modalFlags, updateModalFlag, handleToggle }: any) {
  interface User {
    token: string;
    id: number;
    email: string | null;
    phone: string | null;
    full_name: string | null;
    verification_code: string | null;
    is_verified: number;
    dob: string | null;
    gender: string | null;
    locationId: number | null;
    username: string | null;
    userId: string | null;
    authToken: string | null;
    rc_name: string | null;
    device_token: string | null;
    language: string;
    role: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    location: any;
  }
  // @ts-ignore
  const user: User = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading.admin);
  // console.log("admin details: ", user?.full_name.split(' ')[0], user?.full_name.split(' ')[1] )
  const theme = useTheme();

  const porfileData = {
    phoneNumber: user?.phone ? user?.phone.substring(4) : '',
    fullName: user?.full_name ? user?.full_name : 'NA',
    image: AvatarImg
  };
  interface UpdateDetails {
    full_name: string;
    phone: string;
  }
  const [formValues, setFormValues] = useState<UpdateDetails>();
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

  const handleSubmitonConfirm = (updateDetails: UpdateDetails) => {
    try {
      dispatch(updateAdminProfile(updateDetails));
      updateModalFlag('viewAccountDetails', false);
      handleToggle();
    } catch (error) {
      console.log(error);
    }
  };
  const message = 'Are you sure you want to update your profile details?';
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <Dialog
        open={modalFlags?.viewAccountDetails}
        onClose={() => {
          handleToggle();
          updateModalFlag('viewAccountDetails', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
          initialValues={{
            fullName: porfileData.fullName,
            phoneNumber: porfileData.phoneNumber,
            image: porfileData.image
          }}
          validationSchema={yup.object().shape({
            fullName: yup.string().max(30, 'Name should be less than 30 characters').required('Full name is required.'),
            phoneNumber: yup.string().matches(minPhoneLimit, 'Phone number is not valid').required('Phone number is required'),
            image: yup.mixed().required('Image is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            const updateValues = {
              full_name: values?.fullName,
              phone: '+968' + values?.phoneNumber
              // Image: values.image
            };
            setFormValues(updateValues);
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
                      Account Settings
                    </Typography>
                    <IconButton
                      onClick={() => {
                        //   setModalFlag({ ...modalFlags, viewCrew: { open: false, crewData: {} as CrewData } });
                        updateModalFlag('viewAccountDetails', false);
                        setEditMode(false);
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
                    <Grid item xs={12} md={3}>
                      <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                        <FormLabel
                          htmlFor="change-avtar"
                          sx={{
                            position: 'relative',
                            borderRadius: '50%',
                            overflow: 'hidden'
                          }}
                        >
                          {/* <Avatar
                            alt="Avatar 1"
                            src={values.image !== null ? values.image : AvatarImg}
                            sx={{ width: 72, height: 72, border: '1px dashed' }}
                          /> */}
                          <Avatar alt={'admin'} src={''} sx={{ width: 72, height: 72 }} />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                              display: editMode ? 'flex' : 'none',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Stack spacing={0.5} alignItems="center">
                              <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                              <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                            </Stack>
                          </Box>
                        </FormLabel>

                        <TextField
                          type="file"
                          id="change-avtar"
                          placeholder="Outlined"
                          variant="outlined"
                          sx={{ display: 'none' }}
                          disabled={editMode ? false : true}
                        />
                      </Stack>
                      {/* {editMode && (
                      <Stack justifyContent="center" sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '16px', fontWeight: 500 }}>
                          Upload Photo
                        </Typography>
                      </Stack>
                    )}
                    {editMode === false ? (
                      <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                        <FormLabel
                          htmlFor="change-avtar"
                          sx={{
                            position: 'relative',
                            borderRadius: '50%',
                            overflow: 'hidden'
                          }}
                        >
                          <Avatar
                            alt="Avatar 1"
                            src={values.image !== null ? values.image : AvatarImg}
                            sx={{ width: 72, height: 72, border: '1px dashed' }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                              display: editMode ? 'flex' : 'none',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Stack spacing={0.5} alignItems="center">
                              <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                              <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                            </Stack>
                          </Box>
                        </FormLabel>

                        <TextField
                          type="file"
                          id="change-avtar"
                          placeholder="Outlined"
                          variant="outlined"
                          sx={{ display: 'none' }}
                          disabled={editMode ? false : true}
                        />
                      </Stack>
                    ) : (
                      <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                        <FormLabel
                          htmlFor="change-avtar"
                          sx={{
                            position: 'relative',
                            borderRadius: '50%',
                            overflow: 'visible',
                            '&:hover .MuiBox-root': { opacity: 1 },
                            cursor: 'pointer'
                          }}
                        >
                          <Avatar
                            alt="Avatar 1"
                            src={
                              values.image !== null
                                ? typeof values.image === 'string'
                                  ? values.image
                                  : URL.createObjectURL(values.image)
                                : AvatarImg
                            }
                            sx={{ width: 72, height: 72, border: '1px dashed' }}
                          />
                          <Box
                            sx={{
                              borderRadius: 50,
                              position: 'absolute',
                              right: 0,
                              bottom: 0,
                              backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                              width: '20px',
                              height: '20px',
                              opacity: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Stack spacing={0.5} alignItems="center">
                              <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '0.6rem' }} />
                            </Stack>
                          </Box>
                        </FormLabel>
                        <TextField
                          type="file"
                          id="change-avtar"
                          placeholder="Outlined"
                          variant="outlined"
                          sx={{ display: 'none' }}
                          name="file"
                          onChange={(event: any) => {
                            const newImage = event.target.files?.[0];
                            setSelectedImage(newImage);
                            setFieldValue('image', newImage);
                          }}
                        />
                        {touched.image && errors.image && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.image}
                          </FormHelperText>
                        )}
                      </Stack>
                    )} */}
                    </Grid>

                    <Grid item xs={12} md={9}>
                      <MainCard>
                        <Grid item sm={12} sx={{ mb: 3 }}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <TextField
                              id="fullName"
                              name="fullName"
                              placeholder="Enter Full Name"
                              fullWidth
                              value={values?.fullName}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
                                  handleChange(e);
                                }
                              }}
                              InputProps={{
                                readOnly: editMode ? false : true
                              }}
                            />
                            {touched.fullName && errors.fullName && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.fullName}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item sm={12} sx={{ mb: 3 }}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="phone">Phone Number</InputLabel>
                            <TextField
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Enter Phone"
                              InputProps={{
                                startAdornment: <InputAdornment position="start">+968</InputAdornment>,
                                readOnly: editMode ? false : true
                              }}
                              fullWidth
                              value={values?.phoneNumber}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value) && value.length <= 8) {
                                  setFieldValue('phoneNumber', value);
                                }
                              }}
                            />

                            {touched.phoneNumber && errors.phoneNumber && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.phoneNumber}
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
                    updateModalFlag('viewAccountDetails', false);
                  }}
                >
                  Cancel
                </Button>
                {editMode === false && (
                  <Button
                    onClick={() => {
                      setEditMode(true);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Edit
                  </Button>
                )}
                {editMode && (
                  <Button type="submit" color="primary" variant="contained">
                    Update
                  </Button>
                )}
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
