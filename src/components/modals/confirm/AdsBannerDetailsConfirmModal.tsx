import React, { useState } from 'react';
import { ThemeMode } from 'types/config';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, CircularProgress } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import { useTheme } from '@mui/material/styles';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'store';
import { toggleUserStatus, getAllUsersData } from 'store/reducers/users';
import { getAdsDetails, toggleAdsBannerStatus, getAllAdsData, getAdsRecord, toggleAdsDetailsBannerStatus } from 'store/reducers/ads';
export default function AdsBannerDetailsConfirmModal({
  modalFlagConfirm,
  updateModalFlagConfirm,
  handleConfirmation,
  selectedStatus,
  setSelectedStatus,
  id
}: any) {
  const count = useSelector((state) => state?.adsSlice?.count);
  const theme = useTheme();
  const dispatch = useDispatch();
  const adsDetails: any = useSelector((state) => state.adsSlice.adsDetails);
  const isLoading = useSelector((state) => state?.common?.loading?.toggleAdsDetailsBannerStatus);
  return (
    <Dialog
      open={modalFlagConfirm?.adsBannerDetailsConfirmModal}
      onClose={() => {
        // handleToggle();
        updateModalFlagConfirm('adsBannerDetailsConfirmModal', false);
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
                Are you sure you want to change the status of this banner?
              </DialogContentText>
            </DialogContent>
          </Box>
        </Stack>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              // handleConfirmation(false);
              updateModalFlagConfirm('adsBannerDetailsConfirmModal', false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (adsDetails?.isBanner === true) {
                await dispatch(toggleAdsDetailsBannerStatus({ id, banner: false }));
                // getAdsRecord(count);
                updateModalFlagConfirm('adsBannerDetailsConfirmModal', false);
              } else {
                await dispatch(toggleAdsDetailsBannerStatus({ id, banner: true }));
                // getAdsRecord(count);
                updateModalFlagConfirm('adsBannerDetailsConfirmModal', false);
              }
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
