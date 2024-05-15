import React, { useState } from 'react';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, CircularProgress } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { useTheme } from '@mui/material/styles';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'store';
import { toggleUserStatus, getUsersRecord, changeUserStatus, getAllUsersData } from 'store/reducers/users';
export default function UserConfirmStatusModal({
  modalFlagConfirm,
  updateModalFlagConfirm,
  handleConfirmation,
  selectedStatus,
  setSelectedStatus,
  id
}: any) {
  const count = useSelector((state) => state.usersSlice.count);
  const theme = useTheme();
  const dispatch = useDispatch();
  const userDetails: any = useSelector((state) => state.usersSlice.userDetails);
  const isLoading = useSelector((state) => state?.common?.loading?.toggleStatus);
  const handleStatusChange = async () => {
    try {
      // Dispatch the action to change the user's status
      await dispatch(changeUserStatus({ id, is_active: !!selectedStatus }));
      // dispatch(getUsersRecord(count));
      // Update the switch status in the table immediately
      updateModalFlagConfirm('userConfirmStatusModal', false);
    } catch (error) {
      // Handle any errors
      console.error('Error updating user status:', error);
    }
  };

  return (
    <Dialog
      open={modalFlagConfirm?.userConfirmStatusModal}
      onClose={() => {
        // handleToggle();
        updateModalFlagConfirm('userConfirmStatusModal', false);
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
          <Button
            variant="outlined"
            onClick={() => {
              // handleConfirmation(false);
              updateModalFlagConfirm('userConfirmStatusModal', false);
            }}
          >
            No
          </Button>
          <Button variant="contained" onClick={handleStatusChange} autoFocus>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Yes'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
