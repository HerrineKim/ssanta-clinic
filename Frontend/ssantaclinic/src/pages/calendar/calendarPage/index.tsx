import React from 'react';
import { CalendarPageContainer } from './styles';
import { CalendarPageTitle } from './styles';
import { AdventCalendarBox } from './styles';
import { CalendarDetail } from '../../../components/calendar/calendarDetail';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function CalendarPage() {
  // 모달창 노출 여부
  // const [calendarOpen, setCalendarOpen] = React.useState<boolean>(false);
  // // 모달창 노출
  // const showCalendar = () => {
  //   setCalendarOpen(true);
  // };
  return (
    // <CalendarPageContainer>
    //   <CalendarPageTitle>어드벤트 캘린더 페이지</CalendarPageTitle>
    //   <AdventCalendarBox onClick={showCalendar}>day n</AdventCalendarBox>
    //   {calendarOpen && <CalendarDetail setCalendarOpen={setCalendarOpen} />}
    // </CalendarPageContainer>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" spacing={3} columns={9}>
        <Grid direction="column" item xs={4}>
          <Grid item xs={2}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
        <Grid direction="column" item xs={1}>
          <Grid direction="column" container columns={8}>
            <Grid item xs={4}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid direction="column" item xs={4}>
          <Grid item xs={2}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=8</Item>
          </Grid>{' '}
        </Grid>
      </Grid>
    </Box>
  );
}
