'use client';
import {
  FsAccordion,
  FsBarChart,
  FsButton,
  FsChip,
  FsDescription,
  FsPagination,
  FsTable,
  FsToaster,
  FsToggleButtonGroup,
  FsTypography,
} from '@fs/core';
import {
  FsAutoComplete,
  FsCheckbox,
  FsDatePicker,
  FsDateTimePicker,
  FsFormProvider,
  FsInput,
  FsRadioGroup,
  FsRangeSlider,
  FsSelect,
  FsSmsVerification,
  FsSwitch,
  FsTimePicker,
  FsUploadFile,
} from '@fs/form';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { GridColDef } from '@mui/x-data-grid';
import { ClearIcon } from '@mui/x-date-pickers/icons';
import { type MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const UiComponents = () => {
  const [value, setValue] = useState('value2');
  const [flipCardActive, setFlipCardActive] = useState(false);
  const methods = useForm();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 20 },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setValue(newAlignment);
  };
  const onSubmit = () => {
    toast.warning('warning');
    setTimeout(() => {
      toast.error('error');
    }, 2000);
    setTimeout(() => {
      toast.info('info');
    }, 4000);
  };
  return (
    <>
      <Box
        p={4}
        sx={(theme) => ({
          minHeight: '100vh',
          background: theme.palette.grey[50],
          borderRadius: 3,
        })}
      >
        {/* Section for Description */}
        <FsTypography
          i18nKey={'Description'}
          variant="h4"
          gutterBottom
          sx={{ mb: 3, mt: 5 }}
        />
        {/* <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <FsDescription title="نام خانوادگی ">ربیعی</FsDescription>
          </Grid>
          {/* or */}
        <Grid size={{ xs: 6 }}>
          <FsDescription title="نام خانوادگی " text="ربیعی" />
        </Grid>
        {/* </Grid> */}
        {/* Section for Pagination */}
        <FsTypography
          i18nKey={'Pagination'}
          variant="h4"
          gutterBottom
          sx={{ mb: 3, mt: 5 }}
        />
        <Box>
          <FsPagination sx={{ mt: 2 }} count={10} />
          <FsPagination sx={{ mt: 2 }} disabled count={10} />
        </Box>
        {/* Section for Button */}
        <FsTypography
          i18nKey={'Buttons'}
          variant="h4"
          gutterBottom
          sx={{ mb: 3, mt: 5 }}
        />
        <Grid container spacing={2}>
          <Grid>
            <FsButton disabled size="large" variant="contained" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading size="large" variant="contained" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading variant="contained" color="secondary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading size="small" variant="contained" color="error">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton size="large" variant="contained" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="contained" color="secondary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton size="small" variant="contained" color="error">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton
              startIcon={<ClearIcon />}
              variant="contained"
              color="warning"
            >
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton endIcon={<ClearIcon />} variant="contained" color="info">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="contained" color="success">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="contained" color="inherit">
              کلیک
            </FsButton>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid>
            <FsButton disabled size="large" variant="outlined" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading size="large" variant="outlined" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading variant="outlined" color="secondary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading size="small" variant="outlined" color="error">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton size="large" variant="outlined" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="outlined" color="secondary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton size="small" variant="outlined" color="error">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton
              startIcon={<ClearIcon />}
              variant="outlined"
              color="warning"
            >
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton endIcon={<ClearIcon />} variant="outlined" color="info">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="outlined" color="success">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="outlined" color="inherit">
              کلیک
            </FsButton>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid>
            <FsButton disabled size="large" variant="text" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading size="large" variant="text" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading variant="text" color="secondary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton loading size="small" variant="text" color="error">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton size="large" variant="text" color="primary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="text" color="secondary">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton size="small" variant="text" color="error">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton startIcon={<ClearIcon />} variant="text" color="warning">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton endIcon={<ClearIcon />} variant="text" color="info">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="text" color="success">
              کلیک
            </FsButton>
          </Grid>
          <Grid>
            <FsButton variant="text" color="inherit">
              کلیک
            </FsButton>
          </Grid>
        </Grid>

        {/* Section for Animations */}
        <FsTypography
          i18nKey={'Animations Showcase'}
          variant="h4"
          gutterBottom
          sx={{ mb: 3, mt: 5 }}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Pulse Animation'} variant="h6" />
              <Box
                className="pulse"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'lightBlue',
                  mt: 2,
                }}
              >
                animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Typing Effect Animation'} variant="h6" />
              <Box
                className="typing-effect"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'lightBlue',
                  mt: 2,
                }}
              >
                Typing Effect Animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Heart Beat Animation'} variant="h6" />
              <Box
                className="heartbeat"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'lightBlue',
                  mt: 2,
                }}
              >
                animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Bounce In Animation'} variant="h6" />
              <Box
                className="bounce-in"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'lightBlue',
                  mt: 2,
                }}
              >
                animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Rotate Scale Animation'} variant="h6" />
              <Box
                className="rotate-scale"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'lightBlue',
                  mt: 2,
                }}
              >
                animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Wiggle Animation'} variant="h6" />
              <Box
                className="wiggle"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'lightBlue',
                  mt: 2,
                }}
              >
                animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Fade In Out Animation'} variant="h6" />
              <Box
                className="fade-in-out"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'lightBlue',
                  mt: 2,
                }}
              >
                animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography
                i18nKey={'Border On Hover Animation'}
                variant="h6"
              />
              <Box
                className="border-on-hover"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                animation
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography i18nKey={'Spinner Border Animation'} variant="h6" />
              <Box
                className="spinner-border"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <FsTypography
                  i18nKey="animation"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography
                i18nKey={'Gradient Border Animation'}
                variant="h6"
              />
              <Box
                className="gradient-border"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <FsTypography
                  i18nKey="animation"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FsTypography
                i18nKey={'Gradient Border Animation'}
                variant="h6"
              />
              <Box
                className="pulse-border"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <FsTypography
                  i18nKey="animation"
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Flip Card Section */}
        <FsTypography
          i18nKey={'Flip Card with Expand/Collapse'}
          variant="h4"
          gutterBottom
          sx={{ mt: 5, mb: 3 }}
        />
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box className="flip-card" sx={{ width: '18.75rem', margin: 'auto' }}>
            <Box className="flip-card-inner">
              <Box
                className="flip-card-front"
                sx={{ p: 2, textAlign: 'center' }}
              >
                <FsTypography i18nKey="Front Side" component={'h2'} />
              </Box>
              <Box
                className="flip-card-back"
                sx={{
                  p: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <FsTypography i18nKey="Back Side" component={'h2'} />
                <FsButton onClick={() => setFlipCardActive(true)}>
                  More Info
                </FsButton>
                <Box
                  className={`expand-collapse ${flipCardActive && 'active'}`}
                  sx={{ mt: 2 }}
                >
                  <FsTypography
                    i18nKey="This is additional information that expands and collapses when
                    you click the button."
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Form Components Section */}
        <FsTypography
          i18nKey={'Form Components'}
          variant="h4"
          gutterBottom
          sx={{ mt: 5, mb: 3 }}
        />
        <FsFormProvider
          name="form"
          methods={methods}
          formProps={{ onSubmit: methods.handleSubmit(onSubmit) }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FsToaster />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsChip i18nkey="Chip" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsRadioGroup
                  name="radio"
                  i18nKey="radiolabel"
                  list={[
                    { label: '11', value: '1' },
                    { label: '22', value: '2' },
                    { label: '33', value: '3' },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsSmsVerification
                  numInputs={6}
                  name="smsCode"
                  rules={{
                    required: 'پر کردن فیلد اجباری است.',
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsDatePicker
                  name="datePicker"
                  i18nKey="تقویم"
                  rules={{
                    required: 'پر کردن فیلد اجباری است.',
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsTimePicker
                  name="timePicker"
                  i18nKey="ساعت"
                  rules={{
                    required: 'پر کردن فیلد اجباری است.',
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsDateTimePicker
                  name="dateTimePicker"
                  i18nKey="تقویم - ساعت"
                  rules={{
                    required: 'پر کردن فیلد اجباری است.',
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsSwitch name="ssss" i18nKey="lable" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsSelect
                  name="select"
                  i18nKey="shayan"
                  items={[{ label: 'shine', value: 'asdjkaojd' }]}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsCheckbox name="checkbox" i18nKey="saasd" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsAutoComplete
                  name="autoComplete"
                  options={[
                    { value: '1', label: '11' },
                    { value: '2', label: '22' },
                    { value: '3', label: '33' },
                    { value: '4', label: '44' },
                  ]}
                  i18nKey="autoComplete"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsRangeSlider name="rangeSlider" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsInput name="sdsd" i18nKey="dsdsds" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FsUploadFile
                  name="uploadFile"
                  rules={{
                    required: 'پر کردن فیلد اجباری است.',
                  }}
                />
              </Grid>
              <Grid size={12}>
                <FsButton i18nKey="submit" type="submit" />
              </Grid>
            </Grid>
          </Paper>
        </FsFormProvider>

        {/* Data Visualization Section */}
        <FsTypography
          i18nKey={'Data Visualization'}
          variant="h4"
          gutterBottom
          sx={{ mt: 5, mb: 3 }}
        />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FsBarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['bar A', 'bar B', 'bar C'],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: [2, 5, 3],
                },
              ]}
              height={300}
            />
          </Grid>
        </Grid>
        {/* Table */}
        <FsTypography
          i18nKey={'Table'}
          variant="h4"
          gutterBottom
          sx={{ mt: 5, mb: 3 }}
        />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FsTable columns={columns} rows={rows} />
          </Grid>
        </Grid>

        {/* Miscellaneous Section */}
        <FsTypography
          i18nKey={'Miscellaneous Components'}
          variant="h4"
          gutterBottom
          sx={{ mt: 5, mb: 3 }}
        />
        <Grid container spacing={3} mt={1}>
          <Grid size={12}>
            <FsAccordion titleKey={'Accordion Title'}>
              <Box>Accordion detials</Box>
            </FsAccordion>
          </Grid>
          <Grid size={12}>
            <FsButton i18nKey="tooltipppp" tooltipProps={{ i18nKey: 'ssss' }} />
          </Grid>
          <Grid size={12}>
            <FsToggleButtonGroup
              color="primary"
              value={value}
              exclusive
              onChange={handleChange}
              items={[
                { label: 'label', value: 'value' },
                { label: 'label2', value: 'value2' },
              ]}
            />
          </Grid>
          <Grid size={12}>
            <FsTypography component="h3" i18nKey="header3" variant="h3" />
          </Grid>
          <Grid size={12}>
            <FsTypography component="p" i18nKey="paragraph1" variant="body1" />
          </Grid>
          <Grid size={12}>
            <FsTypography component="span" i18nKey="span1" variant="caption" />
          </Grid>
          <Grid size={12}>
            <Box>
              <a href="https://vitejs.dev" target="_blank">
                {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
              </a>
              <a href="https://react.dev" target="_blank">
                {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
              </a>
            </Box>
          </Grid>
          <Grid size={12}>
            <FsTypography
              i18nKey={'Click on the Vite and React logos to learn more'}
              className="read-the-docs"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default UiComponents;
