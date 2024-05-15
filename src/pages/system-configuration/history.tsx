import {useState, ReactElement } from 'react';

// material-ui
import {Button, Grid, Typography, InputAdornment, InputLabel, TextField, FormControl, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';

// assets
import { LockOutlined } from '@ant-design/icons';

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const SysConfigHistory = () => {

    const [sysLogs, setLogs] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setLogs(event.target.value as string);
    };


  return (
    <Page title="History List">
        <Grid container justifyContent="space-between" rowSpacing={4.5} columnSpacing={3} sx={{ mt: 0 }}>
            <Grid item>
                <Typography variant="h3">History List</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained">Add New</Button>
            </Grid>

            <Grid item xs={12}>
                <MainCard>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} lg={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>From</InputLabel>
                                <TextField 
                                    fullWidth 
                                    placeholder="Enter full name" 
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined />
                                            </InputAdornment>
                                        )
                                    }}
                                    />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>Entry</InputLabel>
                                <FormControl fullWidth>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sysLogs} placeholder="Logs" onChange={handleChange}>
                                        <MenuItem value={1}>info</MenuItem>
                                        <MenuItem value={2}>Log type 2</MenuItem>
                                        <MenuItem value={3}>Log type 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>Entity Group</InputLabel>
                                <FormControl fullWidth>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sysLogs} placeholder="Logs" onChange={handleChange}>
                                        <MenuItem value={1}>info</MenuItem>
                                        <MenuItem value={2}>Log type 2</MenuItem>
                                        <MenuItem value={3}>Log type 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>History Of</InputLabel>
                                <FormControl fullWidth>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sysLogs} placeholder="Logs" onChange={handleChange}>
                                        <MenuItem value={1}>info</MenuItem>
                                        <MenuItem value={2}>Log type 2</MenuItem>
                                        <MenuItem value={3}>Log type 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Stack spacing={0.5}>
                                <InputLabel>History DB</InputLabel>
                                <FormControl fullWidth>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sysLogs} placeholder="Logs" onChange={handleChange}>
                                        <MenuItem value={1}>info</MenuItem>
                                        <MenuItem value={2}>Log type 2</MenuItem>
                                        <MenuItem value={3}>Log type 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        
                    </Grid>
                    <Grid container justifyContent="end">
                        <Grid item sx={{ my: 2 }}>
                            <Button variant="contained">Search</Button>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    </Page>
  );
};

SysConfigHistory.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SysConfigHistory;
