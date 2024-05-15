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
export default function ToggleSwitchModal({ modalFlagConfirm, updateModalFlagConfirm, selectedStatus, setSelectedStatus }: any) {
  const theme = useTheme();
  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      if (selectedStatus == true) {
        setSelectedStatus(false);
      } else {
        setSelectedStatus(true);
      }
    }
    updateModalFlagConfirm('toggleSwitchModal', false);
  };

  return (
    <Dialog
      open={modalFlagConfirm?.toggleSwitchModal}
      onClose={() => {
        // handleToggle();
        updateModalFlagConfirm('toggleSwitchModal', false);
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
              Status Alert
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{ fontWeight: 400, fontSize: '14px', color: '#262626' }}>
                Are you sure you want to change the status?
              </DialogContentText>
            </DialogContent>
          </Box>
        </Stack>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleConfirmation(false)}>
            No
          </Button>
          <Button variant="contained" onClick={() => handleConfirmation(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
