import { ReactElement, useEffect, useState } from 'react';
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import CommonTable from 'pages/tables/common-table';
import { Typography, Chip, Menu, Switch, Stack } from '@mui/material';
import { useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import IconButton from 'components/@extended/IconButton';
import { MoreOutlined } from '@ant-design/icons';
import { Modals } from 'components/modals';
import { IndeterminateCheckbox } from 'components/third-party/ReactTable';
import { HeaderProps } from 'react-table';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'store';
import { AdsTableData } from 'types/ads';
import { getAllAdsData, getAdsDetails, deleteAds, getAdsRecord } from 'store/reducers/ads';
const AdsTable = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.common?.loading?.adsTable);
  const count = useSelector((state) => state?.adsSlice?.count);
  const adsRecords = useSelector((state) => state?.adsSlice?.totalAdsRecord);
  useEffect(() => {
    dispatch(getAllAdsData());
  }, []);
  useEffect(() => {
    dispatch(getAdsRecord(count));
  }, [count]);
  const ConfirmToggleStatus = ({ id, isBanner }: { id: number; isBanner: boolean }) => {
    const [selectedStatus, setSelectedStatus] = useState(isBanner);
    const [modalFlagConfirm, setModalFlagConfirm] = useState({
      adsBannerConfirmToggleModal: false
    });
    const updateModalFlagConfirm = (key: string, value: boolean) => {
      setModalFlagConfirm((prevFlags) => ({
        ...prevFlags,
        [key]: value
      }));
    };
    const dispatch = useDispatch();
    const handleChangeOpen = async () => {
      await dispatch(getAdsDetails(id));
      // console.log('ad id is: ', id);
      handleOpenConfirmationModal();
    };
    const handleOpenConfirmationModal = () => {
      updateModalFlagConfirm('adsBannerConfirmToggleModal', true);
    };
    return (
      <>
        <Switch onChange={handleChangeOpen} checked={isBanner} color="success" />
        <Modals.AdsBannerConfirmToggleModal
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          modalFlagConfirm={modalFlagConfirm}
          updateModalFlagConfirm={updateModalFlagConfirm}
          id={id}
        />
      </>
    );
  };
  const MenuItems = (id: number) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
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
    const viewFun = async (id: number) => {
      await dispatch(getAdsDetails(id));
      //@ts-ignore
      handleClose();
      updateModalFlag('adDetailsModal', true);
    };
    const deleteFunc = async (id: number) => {
      handleClose();
      updateModalFlag('adDeleteModal', true);
    };
    const deleteAdsFunc = async () => {
      try {
        handleClose();
        const result = await dispatch(deleteAds(id));
        await dispatch(getAdsRecord(count));
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
        <Modals.AdDeleteModal modalFlags={modalFlags} updateModalFlag={updateModalFlag} deleteDataFunc={deleteAdsFunc} />
        <Modals.AdDetailsModal modalFlags={modalFlags} updateModalFlag={updateModalFlag} id={id} />
      </>
    );
  };
  const theme = useTheme();
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
        Header: <Stack className="sno-ads-header">S No</Stack>,
        accessor: 'id',
        className: 's-no-ads',
        Cell: ({ row }: any) => <Typography sx={{ width: '50px' }}>{row.index + 1}</Typography>
      },
      {
        Header: <Stack className="category-ads-header">Category</Stack>,
        accessor: 'ad_type',
        className: 'category-ads',
        Cell: ({ value }: { value: string }) => {
          return <Typography sx={{ width: '122px', textTransform: 'capitalize' }}>{value}</Typography>;
        }
      },
      {
        Header: <Stack className="city-ads-header">City</Stack>,
        accessor: 'location.name',
        className: 'city-ads',
        Cell: ({ value }: { value: string }) => {
          return <Typography sx={{ width: '109px' }}>{value}</Typography>;
        }
      },
      {
        Header: <Stack className="contact-no-header">Description</Stack>,
        accessor: 'description',
        className: 'description-ads',
        Cell: ({ value }: { value: string }) => {
          return <Typography sx={{ width: '313px' }}>{value !== undefined ? value : 'N/A'}</Typography>;
        }
      },
      {
        Header: <Stack className="num-plate-ads-header">Num Plate</Stack>,
        accessor: 'plate_number',
        className: 'num-plate-ads',
        Cell: ({ value }: { value: number }) => {
          return <Typography sx={{ width: '119px' }}>{value}</Typography>;
        }
      },
      {
        Header: <Stack className="price-ads-header">Price</Stack>,
        accessor: 'price',
        className: 'price-ads',
        Cell: ({ value }: { value: number }) => {
          return <Typography sx={{ width: '91px' }}>{value}</Typography>;
        },
        sortType: 'alphanumeric'
        // className: 'cell-right'
      },
      {
        Header: <Stack className="status-ads-header">Status</Stack>,
        accessor: 'status',
        className: 'status-ads',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'Accepted':
              return (
                <Chip sx={{ color: `${theme.palette.success.main}`, bgcolor: `${theme.palette.success.light + 10}` }} label={'Approved'} />
              );
            case 'Pending':
              return <Chip sx={{ color: `${theme.palette.warning.main}`, bgcolor: `${theme.palette.warning.light + 10}` }} label={value} />;
            case 'Rejected':
            default:
              return <Chip sx={{ color: `${theme.palette.error.main}`, bgcolor: `${theme.palette.error.light + 10}` }} label={value} />;
          }
        },
        sortType: 'alphanumeric'
      },
      {
        Header:  <Stack className="banner-ads-header">Banner</Stack>,
        accessor: 'isBanner',
       className:'banner-ads',
        Cell: ({ row }: { row: any }) => {
          const { values } = row;
          const isBanner = values?.isBanner;
          const id = row?.original?.id;
          return <ConfirmToggleStatus id={id} isBanner={isBanner} />;
        },
        disableSortBy: true
      },
      {
        Header: <Stack className="actions-ads-header">Actions</Stack>,
        accessor: 'actions',
        className: 'actions-ads',
        Cell: ({ row }: { row: any }) => {
          // @ts-ignore
          const adsId = row?.original?.id;

          if (!adsId) {
            return null;
          }
          return MenuItems(adsId);
        },
        disableSortBy: true
      }
    ],
    []
  );
  return (
    <Page title="Users" sx={{ px: 0 }}>
      <Typography variant="h3" sx={{ mb: 1.5 }}>
        Ads List
      </Typography>
      <CommonTable data={adsRecords ? adsRecords : []} columns={columns ? columns : []} tableName="Ads" isLoading={isLoading} />
    </Page>
  );
};

AdsTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout paddingX={false}>{page}</Layout>;
};

export default AdsTable;
