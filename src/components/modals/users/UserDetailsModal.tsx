import React, { useState, useRef } from 'react';
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
import { Modals } from '..';
import { useDispatch, useSelector } from 'store';
import { getAllUsersData, toggleUserStatus } from 'store/reducers/users';
import { UserDetails } from 'types/users';
export default function UserDetailsModal({ modalFlags, updateModalFlag, id }: any) {
  const userDetails = useSelector((state) => state.usersSlice.userDetails) as UserDetails | null;
  const [flag, setFlag] = useState<any>(false);
  const [selectedStatus, setSelectedStatus] = useState(userDetails?.is_active);
  const [modalFlagConfirm, setModalFlagConfirm] = useState({
    userConfirmStatusModal: false
  });
  const theme = useTheme();
  const titleTextStyle = {
    fontSize: '16px',
    fontWeight: 700,
    color: '#262626',
    lineHeight: '24px',
    height: 'auto !important'
  };
  const labelTextStyle = {
    fontSize: '14px',
    fontWeight: 400,
    color: '#8C8C8C',
    lineHeight: '22px'
  };
  const detailsTextStyle = {
    fontSize: '14px',
    fontWeight: 400,
    color: '#262626',
    lineHeight: '22px'
  };

  const updateModalFlagConfirm = (key: string, value: boolean) => {
    setModalFlagConfirm((prevFlags) => ({
      ...prevFlags,
      [key]: value
    }));
  };
  const handleOpenConfirmationModal = () => {
    updateModalFlagConfirm('userConfirmStatusModal', true);
  };
  const handleChange = (event: any) => {
    setSelectedStatus(event.target.value);
    handleOpenConfirmationModal();
  };

  return (
    <>
      <Dialog
        open={modalFlags?.userDetailsModal}
        onClose={() => {
          //   handleToggle();
          updateModalFlag('userDetailsModal', false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ p: 1, py: 1.5, pt: 2, minWidth: '750px !important' }}>
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
                User Detial
              </Typography>
              <IconButton
                onClick={() => {
                  updateModalFlag('userDetailsModal', false);
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
                          User Name
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                          {userDetails?.full_name !== null ? userDetails?.full_name : 'N/A'}
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
                                userDetails?.is_active === 1
                                  ? `${theme.palette.success.light + 10}`
                                  : userDetails?.is_active === 0
                                  ? `${theme.palette.error.light + 10}`
                                  : undefined,
                              color:
                                userDetails?.is_active === 1
                                  ? `${theme.palette.success.main}`
                                  : userDetails?.is_active === 0
                                  ? `${theme.palette.error.main}`
                                  : undefined
                            }}
                            id="editable-select-status"
                            value={userDetails?.is_active}
                            // defaultValue={userData?.status || ''}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          >
                            <MenuItem value={1}>
                              <Chip
                                icon={<CheckCircleOutlined style={{ color: `${theme.palette.success.main}` }} />}
                                label="Active"
                                sx={{ bgcolor: 'transparent', cursor: 'pointer' }}
                              />
                            </MenuItem>
                            <MenuItem value={0}>
                              <Chip
                                icon={<CloseCircleOutlined style={{ color: `${theme.palette.error.main}` }} />}
                                label="Inactive"
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
                          Contact No
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle, wordWrap: 'break-word', paddingRight: '4px' }} component="div">
                          {userDetails?.phone}
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="userID" sx={{ labelTextStyle }}>
                          No of Ads
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                          {userDetails?.number_ads_count}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Grid container>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="noOfAds" sx={{ labelTextStyle }}>
                          Location
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                          {userDetails?.location !== null ? userDetails?.location?.name : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="userID" sx={{ labelTextStyle }}>
                          Gender
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                          {userDetails?.gender !== null ? userDetails?.gender : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={12} sx={{ mb: 2 }} xs={12} md={12}>
                    <Grid container>
                      <Grid item sm={6} xs={6} md={6}>
                        <InputLabel htmlFor="noOfAds" sx={{ labelTextStyle }}>
                          DOB
                        </InputLabel>
                        <Typography variant="h6" sx={{ detailsTextStyle }} component="div">
                          {userDetails?.dob !== null ? userDetails?.dob : 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6}></Grid>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
      <Modals.UserConfirmStatusModal
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        modalFlagConfirm={modalFlagConfirm}
        updateModalFlagConfirm={updateModalFlagConfirm}
        id={id}
      />
    </>
  );
}
