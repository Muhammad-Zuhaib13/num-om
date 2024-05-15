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
import { useSelector } from 'store';

export default function LogoutModal({ modalFlags, updateModalFlag, handleLogout, handleToggle, logutAdmin }: any) {
  const theme = useTheme();
  const isLoading = useSelector((state) => state.common.loading.admin);
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
      open={modalFlags?.logoutBox}
      onClose={() => {
        // handleToggle();
        updateModalFlag('logoutBox', false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ p: 1, py: 1.5, minWidth: '416px', width: '100%', height: '200' }}>
        <Stack direction="row" rowGap={2} sx={{ px: 2 }}>
          <Box sx={{ position: 'absolute', top: '1.8rem' }}>
            <ExclamationCircleOutlined style={{ color: '#FAAD14', fontSize: '22px' }} />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 700, fontSize: '16px', color: '#262626' }}>
              Logout Alert
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{ fontWeight: 400, fontSize: '14px', color: '#262626' }}>
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
          </Box>
        </Stack>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleToggle();
              updateModalFlag('logoutBox', false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              //   handleToggle();
              handleLogout();
              logutAdmin();
              // updateModalFlag('logoutBox', false);
            }}
            autoFocus
          >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Yes'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
