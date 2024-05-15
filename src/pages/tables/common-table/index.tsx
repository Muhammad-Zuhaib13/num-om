import { useMemo, ReactElement, useState } from 'react';
// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  useMediaQuery,
  Menu,
  Grid,
  CircularProgress
} from '@mui/material';
// third-party
import { useFilters, useRowSelect, useTable, usePagination, useSortBy, Column, Row, HeaderGroup, Cell } from 'react-table';
import { useGlobalFilter, HeaderProps } from 'react-table';
import IconButton from 'components/@extended/IconButton';
import { MoreOutlined } from '@ant-design/icons';
import MenuItem from '@mui/material/MenuItem';
// project import
import Layout from 'layout';
import Page from 'components/Page';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, IndeterminateCheckbox, TablePagination, TableRowSelection, HeaderSort } from 'components/third-party/ReactTable';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';
import MainCard from 'components/MainCard';
// types
import { ThemeDirection } from 'types/config';
import { useSelector } from 'store';
import NotFound from 'components/NotFound';
// ==============================|| REACT TABLE ||============================== //
function ReactTable({ columns, data, isLoading }: { columns: Column[]; data: []; isLoading: boolean }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const dataLength = data.length;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, selectedRowIds: {} }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const handleDeleteSelectedRows = () => {
    console.log('Deleting selected rows');
    console.log(selectedRowIds);
  };
  return (
    <>
      <MainCard content={false}>
        <Box>
          <ScrollX>
            <Stack rowGap={3}>
              <Stack direction="row" justifyContent="space-between" sx={{ p: 3, pb: 0 }}>
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                  size="small"
                />
                <Stack direction="row" spacing={2}>
                  {selectedRowIds && Object.keys(selectedRowIds).length > 0 ? (
                    <TableRowSelection selected={Object.keys(selectedRowIds).length} onDelete={handleDeleteSelectedRows} />
                  ) : (
                    <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                  )}
                </Stack>
              </Stack>
              <Stack
                spacing={3}
                sx={{
                  ...(theme.direction === ThemeDirection.RTL && {
                    '.MuiTable-root': { width: { xs: '930px', sm: 'inherit' } },
                    pre: { width: { xs: '930px', sm: 'inherit' }, overflowX: 'unset' }
                  })
                }}
              >
                {isLoading ? (
                  <Table {...getTableProps()} sx={{ boxShadow: 'none !important' }}>
                    <TableHead>
                      {headerGroups.map((headerGroup: HeaderGroup<{}>, index: number) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} key={index} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                          {headerGroup.headers.map((column: HeaderGroup, i: number) => (
                            <TableCell
                              {...column.getHeaderProps([{ className: column.className }])}
                              key={i}
                              sx={{
                                fontSize: '13px',
                                fontWeight: 400,
                                color: '#4A4A4A',
                                lineHeight: '15.73px',
                                textTransform: 'capitalize',
                                height: '67px'
                              }}
                            >
                              <HeaderSort column={column} sort />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                      <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                        <TableCell colSpan={42}>
                          <Grid minHeight="40vh" justifyContent="center" alignItems="center" container>
                            <CircularProgress size={50} thickness={3.5} color="primary" />
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : dataLength === 0 || !data ? (
                  <Table {...getTableProps()} sx={{ boxShadow: 'none !important' }}>
                    <TableHead>
                      {headerGroups.map((headerGroup: HeaderGroup<{}>, index: number) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} key={index} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                          {headerGroup.headers.map((column: HeaderGroup, i: number) => (
                            <TableCell
                              {...column.getHeaderProps([{ className: column.className }])}
                              key={i}
                              sx={{
                                fontSize: '13px',
                                fontWeight: 400,
                                color: '#4A4A4A',
                                lineHeight: '15.73px',
                                textTransform: 'capitalize',
                                height: '67px'
                              }}
                            >
                              <HeaderSort column={column} sort />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                      <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                        <TableCell colSpan={42}>
                          <Grid minHeight="40vh" justifyContent="center" alignItems="center" container>
                            <NotFound />
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <Table {...getTableProps()}>
                    <TableHead>
                      {headerGroups.map((headerGroup: HeaderGroup<{}>, index: number) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} key={index} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                          {headerGroup.headers.map((column: HeaderGroup, i: number) => (
                            <TableCell
                              {...column.getHeaderProps([{ className: column.className }])}
                              key={i}
                              sx={{
                                fontSize: '13px',
                                fontWeight: 400,
                                color: '#4A4A4A',
                                lineHeight: '15.73px',
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                height: '67px'
                              }}
                            >
                              <HeaderSort column={column} sort />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                      {page.map((row: Row, i: number) => {
                        prepareRow(row);
                        return (
                          <TableRow
                            {...row.getRowProps()}
                            key={i}
                            // onClick={() => {
                            //   row.toggleRowSelected();
                            // }}
                            sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                          >
                            {row.cells.map((cell: Cell, index) => (
                              <TableCell
                                {...cell.getCellProps([{ className: cell.column.className }])}
                                key={index}
                                sx={{
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  color: '#313131',
                                  lineHeight: '16.94px'
                                }}
                              >
                                {cell.render('Cell')}
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </Stack>
            </Stack>
          </ScrollX>
        </Box>
      </MainCard>
      <Stack direction="row" justifyContent="flex-end" sx={{ pb: 0, paddingRight: '12px' }}>
        <Stack direction="row" spacing={2}>
          {selectedRowIds && Object.keys(selectedRowIds).length > 0 ? (
            <TableRowSelection selected={Object.keys(selectedRowIds).length} onDelete={handleDeleteSelectedRows} />
          ) : (
            <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
          )}
        </Stack>
      </Stack>
    </>
  );
}

// ==============================|| REACT TABLE - ROW SELECTION ||============================== //

const CommonTable = ({ data, columns, tableName, isLoading }: any) => {
  return (
    <Page title={tableName} sx={{ px: 0 }}>
      <ReactTable columns={columns ? columns : []} data={data ? data : []} isLoading={isLoading} />
    </Page>
  );
};

CommonTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CommonTable;
