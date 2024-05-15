import React, { useEffect, useState } from 'react';
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
  Select,
  MenuItem,
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
  CircularProgress,
  Chip
} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { CameraOutlined, EditFilled, CloseOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Modals } from '../index';
import { useSelector } from 'store';
export default function AdDetailsModal({ modalFlags, updateModalFlag, id }: any) {
  const theme = useTheme();
  interface AdDetails {
    id: number;
    ad_type: string;
    userId: number;
    locationId: number;
    plate_number: number;
    plate_code: string;
    price: number;
    description: string;
    contact_name: string;
    contact_number: string;
    show_number: number;
    status: string;
    isBanner: boolean;
    createdAt: string;
    updatedAt: string;
    location: {
      id: number;
      name: string;
      stateId: number;
      countryId: number;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      id: number;
      email: string | null;
      phone: string;
      full_name: string | null;
      verification_code: string;
      is_verified: number;
      dob: string | null;
      gender: string | null;
      locationId: number | null;
      username: string;
      userId: string;
      authToken: string;
      rc_name: string;
      device_token: string;
      language: string;
      role: string;
      deletedAt: string | null;
      is_active: number;
      createdAt: string;
      updatedAt: string;
    };
  }
  interface AdsDetailsState {
    data: AdDetails;
  }

  // @ts-ignore
  const adsDetails: any = useSelector((state) => state.adsSlice.adsDetails);
  const [ads, setAds] = useState<any>(adsDetails);
  const [selectedStatus, setSelectedStatus] = useState<any>(adsDetails?.status);
  const [modalFlagConfirm, setModalFlagConfirm] = useState({
    adsStatusConfirmToggleModal: false
  });
  const [modalFlagConfirmStatus, setModalFlagConfirmStatus] = useState({
    adsBannerDetailsConfirmModal: false
  });
  const updateModalFlagConfirm = (key: string, value: boolean) => {
    setModalFlagConfirm((prevFlags) => ({
      ...prevFlags,
      [key]: value
    }));
  };
  const updateModalFlagConfirmStatus = (key: string, value: boolean) => {
    setModalFlagConfirmStatus((prevFlags) => ({
      ...prevFlags,
      [key]: value
    }));
  };
  const handleOpenConfirmationModalStatus = () => {
    updateModalFlagConfirmStatus('adsBannerDetailsConfirmModal', true);
  };
  const handleOpenConfirmationModal = () => {
    updateModalFlagConfirm('adsStatusConfirmToggleModal', true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedStatus(value);
    handleOpenConfirmationModal();
  };

  const toggleSwitch = () => {
    handleOpenConfirmationModalStatus();
  };
  const titleTextStyle = {
    fontSize: '16px',
    fontWeight: 700,
    color: '#262626',
    lineHeight: '24px',
    textTransform: 'capitalize',
    height: 'auto !important'
  };
  const labelTextStyle = {
    fontSize: '14px',
    fontWeight: 400,
    color: '#8C8C8C',
    lineHeight: '22px',
    textTransform: 'capitalize'
  };
  const detailsTextStyle = {
    fontSize: '14px',
    fontWeight: 400,
    color: '#262626',
    lineHeight: '22px'
  };
  return (
    <>
      <Dialog
        open={modalFlags?.adDetailsModal}
        onClose={() => {
          //   handleToggle();
          updateModalFlag('adDetailsModal', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ p: 1, py: 1.5, pt: 2, minWidth: '640px !important' }}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <DialogTitle
              width={'100%'}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              padding={'3px 24px!important'}
              alignItems={'center'}
            >
              <Typography variant="h5" sx={titleTextStyle}>
                Ads Detial
              </Typography>
              <IconButton
                onClick={() => {
                  updateModalFlag('adDetailsModal', false);
                  //   setEditMode(false);
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
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Grid container>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="userName" sx={{ labelTextStyle }}>
                          Posted By
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                          {adsDetails?.contact_name}
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="status" sx={{ labelTextStyle }}>
                          Status
                        </InputLabel>
                        <FormControl>
                          <Select
                            labelId="editable-select-status-label"
                            sx={{
                              boxShadow: 'none',
                              '.MuiOutlinedInput-notchedOutline': { border: 0 },
                              p: 0,
                              height: 30,
                              bgcolor:
                                adsDetails?.status === 'Accepted'
                                  ? `${theme.palette.success.light + 10}`
                                  : adsDetails?.status === 'Pending'
                                  ? `${theme.palette.warning.light + 10}`
                                  : adsDetails?.status === 'Rejected'
                                  ? `${theme.palette.error.light + 10}`
                                  : undefined,
                              color:
                                adsDetails?.status === 'Accepted'
                                  ? `${theme.palette.success.main}`
                                  : adsDetails?.status === 'Pending'
                                  ? `${theme.palette.warning.main}`
                                  : adsDetails?.status === 'Rejected'
                                  ? `${theme.palette.error.main}`
                                  : undefined
                            }}
                            id="editable-select-status"
                            value={adsDetails?.status}
                            // defaultValue={ads?.status || ''}
                            // @ts-ignore
                            onChange={(e)=>{handleChange(e)}}
                          >
                            <MenuItem value="Accepted">
                              <Chip
                                icon={<CheckCircleOutlined style={{ color: `${theme.palette.success.main}` }} />}
                                label="Approved"
                                sx={{ bgcolor: 'transparent', cursor: 'pointer' }}
                              />
                            </MenuItem>
                            <MenuItem value="Pending" disabled={true}>
                              <Chip
                                icon={<CloseCircleOutlined style={{ color: `${theme.palette.warning.main}` }} />}
                                label="Pending"
                                sx={{ bgcolor: 'transparent', cursor: 'pointer' }}
                              />
                            </MenuItem>
                            <MenuItem value="Rejected">
                              <Chip
                                icon={<CloseCircleOutlined style={{ color: `${theme.palette.error.main}` }} />}
                                label="Rejected"
                                sx={{ bgcolor: 'transparent', cursor: 'pointer' }}
                              />
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Grid container>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="userID" sx={{ labelTextStyle }}>
                          User ID
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                          {adsDetails?.contact_number}
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="userID" sx={{ labelTextStyle }}>
                          Banner
                        </InputLabel>
                        <Switch onChange={toggleSwitch} checked={adsDetails?.isBanner} color="success" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }}>
                    <InputLabel htmlFor="noOfAds" sx={{ labelTextStyle }}>
                      Category
                    </InputLabel>
                    <Typography variant="h6" sx={{ detailsTextStyle, textTransform: 'capitalize' }} component="div">
                      {adsDetails?.ad_type}
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }}>
                    <InputLabel htmlFor="noOfAds" sx={{ labelTextStyle }}>
                      Registration City
                    </InputLabel>
                    <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                      {adsDetails?.location?.name}
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }}>
                    <InputLabel htmlFor="noOfAds" sx={{ labelTextStyle }}>
                      Description
                    </InputLabel>
                    <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                      {adsDetails?.description}
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }}>
                    <InputLabel htmlFor="noOfAds" sx={{ labelTextStyle }}>
                      Number Plate
                    </InputLabel>
                    <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                      {adsDetails?.plate_number}
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }}>
                    <InputLabel htmlFor="noOfAds" sx={{ labelTextStyle }}>
                      Price
                    </InputLabel>
                    <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                      {adsDetails?.price}
                    </Typography>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  {/* <Grid item sm={12} sx={{ mb: 2, textAlign: 'right' }} xs={12} md={12}>
                        <Button variant="outlined" type="submit" autoFocus>
                          Save
                        </Button>
                      </Grid>
                      <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                        <Divider />
                      </Grid> */}
                </MainCard>
              </Grid>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
      <Modals.AdsStatusConfirmToggleModal
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        modalFlagConfirm={modalFlagConfirm}
        updateModalFlagConfirm={updateModalFlagConfirm}
        id={id}
      />
      <Modals.AdsBannerDetailsConfirmModal
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        modalFlagConfirm={modalFlagConfirmStatus}
        updateModalFlagConfirm={updateModalFlagConfirmStatus}
        id={id}
      />
    </>
  );
}
