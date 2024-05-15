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
import DialogContentText from '@mui/material/DialogContentText';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { CameraOutlined, EditFilled, CloseOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const AvatarImg = '/assets/images/users/avatar-10.png';
export default function DeleteModal({ modalFlags, updateModalFlag }: any) {
  const theme = useTheme();
  const porfileData = {
    firstName: 'Aqib',
    lastName: 'Jawed',
    phoneNumber: '968-80000000',
    image: AvatarImg
  };
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  return (
    <Dialog
      open={modalFlags?.userDelete}
      onClose={() => {
        // handleToggle();
        updateModalFlag('userDelete', false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ p: 1, py: 1.5, minWidth: '416px', width: '100%', height: '200' }}>
        <Stack direction="row" rowGap={2} sx={{px:2}}>
          <Box sx={{position: 'absolute', top:'1.8rem'}}>
            <ExclamationCircleOutlined style={{color:'#FAAD14', fontSize:'22px'}}/>
          </Box>
          <Box sx={{marginLeft:1}}>
            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 700, fontSize: '16px', color: '#262626' }}>
              Delete Alert
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{ fontWeight: 400, fontSize: '14px', color: '#262626' }}>
                Are you sure you want to delete this user?
              </DialogContentText>
            </DialogContent>
          </Box>
        </Stack>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              //   handleToggle();
              updateModalFlag('userDelete', false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              //   handleToggle();
              updateModalFlag('userDelete', false);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Box>
      {/* <Formik
        initialValues={{
          firstName: porfileData.firstName,
          lastName: porfileData.firstName,
          phoneNumber: porfileData.phoneNumber,
          image: porfileData.image
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string().max(50, 'Name should be less than 50 characters').required('Name is required.'),
          lastName: yup.string().max(50, 'Name should be less than 50 characters').required('Name is required.'),
          phoneNumber: yup.string().required('Phone is required'),
          image: yup.mixed().required('Image is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {}}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 1, py: 1.5, pt: 2 }}>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <DialogTitle
                  width={'100%'}
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  padding={'3px 24px!important'}
                  sx={{ minWidth: '600px !important' }}
                >
                  <Typography variant="h5">Account Settigns</Typography>
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
                    {editMode && (
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
                    )}
                  </Grid>

                  <Grid item xs={12} md={9}>
                    <MainCard>
                      <Grid item sm={12} sx={{ mb: 2 }}>
                        <InputLabel htmlFor="name">First Name</InputLabel>
                        <TextField
                          id="firstName"
                          name="firstName"
                          placeholder="Enter First Name"
                          fullWidth
                          value={values?.firstName}
                          onChange={(e) => handleChange(e)}
                          InputProps={{
                            readOnly: editMode ? false : true
                          }}
                        />
                        {touched.firstName && errors.firstName && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.firstName}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item sm={12} sx={{ mb: 2 }}>
                        <InputLabel htmlFor="name">Last Name</InputLabel>
                        <TextField
                          id="lastName"
                          name="lastName"
                          placeholder="Enter Last Name"
                          fullWidth
                          value={values?.lastName}
                          onChange={(e) => handleChange(e)}
                          InputProps={{
                            readOnly: editMode ? false : true
                          }}
                        />
                        {touched.lastName && errors.lastName && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.lastName}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item sm={12} sx={{ mb: 2 }}>
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
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </DialogContent>
            </Box>

            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Button
                onClick={() => {
                  handleToggle();
                  updateModalFlag('viewAccountDetails', false);
                }}
                sx={{ color: '#FF4D4F', border: 'transparent !important', '&:hover': { color: '#FF4D4F' } }}
                variant="outlined"
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
                <Button
                  //   type="submit"
                  onClick={() => {
                    setEditMode(false);
                    handleToggle();
                  }}
                  color="primary"
                  variant="contained"
                >
                  Update
                </Button>
              )}
            </DialogActions>
          </form>
        )}
      </Formik> */}
    </Dialog>
  );
}
