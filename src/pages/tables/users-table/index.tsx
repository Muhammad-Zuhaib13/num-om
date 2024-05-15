import { ReactElement, useEffect } from 'react';
import Layout from 'layout';
import Page from 'components/Page';
import CommonTable from 'pages/tables/common-table';
import { Typography, Chip, Menu, Switch, Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import IconButton from 'components/@extended/IconButton';
import { MoreOutlined } from '@ant-design/icons';
import { Modals } from 'components/modals';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';
import { HeaderProps } from 'react-table';
import { useDispatch, useSelector } from 'store';
import { getAllUsersData, getUserDetails, toggleUserStatus, deleteUser, getUsersRecord } from 'store/reducers/users';
const UsersTable = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.usersSlice.count);
  const userRecords = useSelector((state) => state.usersSlice.totalUserRecord);
  useEffect(() => {
    dispatch(getAllUsersData());
  }, []);
  const isLoading = useSelector((state) => state?.common?.loading?.usersTable);
  useEffect(() => {
    dispatch(getUsersRecord(count));
  }, [count]);
  const ConfirmToggleStatus = ({ id, is_active }: any) => {
    const [selectedStatus, setSelectedStatus] = useState();
    const dispatch = useDispatch();
    const [modalFlagConfirm, setModalFlagConfirm] = useState({
      userConfirmModal: false
    });
    const updateModalFlagConfirm = (key: string, value: boolean) => {
      setModalFlagConfirm((prevFlags) => ({
        ...prevFlags,
        [key]: value
      }));
    };

    const handleChangeOpen = async () => {
      await dispatch(getUserDetails(id));
      handleOpenConfirmationModal();
    };
    const handleOpenConfirmationModal = () => {
      updateModalFlagConfirm('userConfirmModal', true);
    };
    return (
      <>
        <Box>
          <Switch onChange={handleChangeOpen} checked={is_active} color="success" sx={{ margin: '0px !important' }} />
          <Modals.UserComfirmModal
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            modalFlagConfirm={modalFlagConfirm}
            updateModalFlagConfirm={updateModalFlagConfirm}
            id={id}
          />
        </Box>
      </>
    );
  };
  const MenuItems = (id: number) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const [modalFlags, setModalFlag] = useState({
      userDetailsModal: false,
      userDelete: false
    });
    const updateModalFlag = (key: string, value: boolean) => {
      setModalFlag((prevFlags) => ({
        ...prevFlags,
        [key]: value
      }));
    };
    const viewFun = async (id: any) => {
      await dispatch(getUserDetails(id));
      handleClose();
      updateModalFlag('userDetailsModal', true);
    };
    const deleteFunc = async (id: number) => {
      handleClose();
      updateModalFlag('userDeleteModal', true);
    };
    const deleteUserFunc = async () => {
      try {
        handleClose();
        const result = await dispatch(deleteUser(id));
        await dispatch(getUsersRecord(count));
      } catch (error) {}
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    //   const dispatch = useDispatch();
    return (
      <>
        <IconButton edge="end" aria-label="menu" onClick={handleClick}>
          <MoreOutlined />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              viewFun(id);
            }}
          >
            View
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteFunc(id);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
        <Modals.UserDeleteModal modalFlags={modalFlags} updateModalFlag={updateModalFlag} deleteDataFunc={deleteUserFunc} />
        <Modals.UserDetailsModal modalFlags={modalFlags} updateModalFlag={updateModalFlag} id={id} />
      </>
    );
  };
  const columns = useMemo(
    () => [
      // {
      //   title: 'Row Selection',
      //   Header: ({ getToggleAllPageRowsSelectedProps }: HeaderProps<{}>) => (
      //     <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
      //   ),
      //   accessor: 'selection',
      //   Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
      //   disableSortBy: true
      // },
      {
        Header: <Stack className="sn-users-header">S No</Stack>,
        className: 's-no-users',
        accessor: 'id',
        Cell: ({ row }: any) => <Typography sx={{ width: '73px' }}>{row.index + 1}</Typography>
      },
      {
        Header: <Stack className="user-name-users-header">User Name</Stack>,
        accessor: 'full_name',
        className: 'user-name-users',
        Cell: ({ value }: { value: string }) => {
          return (
            <Typography sx={{ width: '178px', wordWrap: 'break-word', textAlign: 'center' }}>{value !== null ? value : 'N/A'}</Typography>
          );
        }
      },
      {
        Header: <Stack className="contact-no-users-header">Contact No</Stack>,
        accessor: 'phone',
        className: 'contact-no-users',
        Cell: ({ value }: { value: string }) => {
          return <Typography sx={{ width: '178px', wordWrap: 'break-word' }}>{value !== null ? value : 'N/A'}</Typography>;
        }
      },
      ,
      {
        Header: <Stack className="address-users-header">Address</Stack>,
        accessor: 'location.name',
        className: 'location-users',
        Cell: ({ row }: { row: any }) => {
          const { values } = row;
          const is_active: any = values?.is_active;
          const id: number = row?.original?.id;
          const location: any = values?.location;
          return <Typography sx={{ width: '178px' }}>{location !== undefined ? values?.location?.name : '-'}</Typography>;
        }
      },
      {
        Header: <Stack className="no-of-ads-users-header">No of Ads</Stack>,
        accessor: 'number_ads_count',
        className: 'no-of-ads-users',
        Cell: ({ value }: { value: number }) => {
          return <Typography sx={{ width: '183px' }}>{value}</Typography>;
        }
      },
      // ,
      // {
      //   Header: 'Role',
      //   accessor: 'status',
      //   Cell: ({ value }: { value: string }) => {
      //     switch (value) {
      //       case 'Active':
      //         return <Chip sx={{ color: `${theme.palette.success.main}`, bgcolor: `${theme.palette.success.light + 10}` }} label={value} />;
      //       case 'Inactive':
      //       default:
      //         return <Chip sx={{ color: `${theme.palette.error.main}`, bgcolor: `${theme.palette.error.light + 10}` }} label={value} />;
      //     }
      //   }
      // }
      {
        Header: <Stack className="active-users-header">Active</Stack>,
        accessor: 'is_active',
        className: 'active-users',
        Cell: ({ row }: { row: any }) => {
          const { values } = row;
          const is_active: any = values?.is_active;
          const id: number = row?.original?.id;
          // const handleSwitchChange = async () => {
          //   await toggleUserStatusUser(id, !is_active);
          // };
          return <ConfirmToggleStatus id={id} is_active={is_active} />;
        },
        // Cell: ({ row }: { row: any }) => {
        //   const { values } = row;
        //   const isActive = values?.isActive;
        //   const id = row?.original?.id;
        //   return ConfirmToggleStatus(id, isActive);
        // },
        disableSortBy: true
      },
      {
        Header: <Stack className="actions-user-header">Actions</Stack>,
        accessor: 'actions',
        className: 'actions-user',
        Cell: ({ row }: { row: any }) => {
          // @ts-ignore
          const userId = row?.original?.id;
          if (!userId) {
            return null;
          }
          return MenuItems(userId);
        },
        disableSortBy: true
      }
    ],
    []
  );

  return (
    <Page title="Users" sx={{ px: 0 }}>
      <Typography variant="h3" sx={{ mb: 1.5 }}>
        User List
      </Typography>
      <CommonTable data={userRecords ? userRecords : []} columns={columns ? columns : []} tableName="Users" isLoading={isLoading} />
    </Page>
  );
};

UsersTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout paddingX={false}>{page}</Layout>;
};

export default UsersTable;
