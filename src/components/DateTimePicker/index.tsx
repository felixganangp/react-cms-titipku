/* eslint-disable react-hooks/rules-of-hooks */
import { Event, KeyboardArrowLeft } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
  alpha,
} from '@mui/material';
import moment, { Moment } from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function DateTimePicker({
  randerInput,
  onChange,
  value,
}: {
  randerInput?: (params: any) => JSX.Element;
  onChange?: (params: Moment | null) => void;
  value?: Moment | null;
}) {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [time, setTime] = useState<[number, number, number]>([0, 0, 0]);

  const hourRefs = Array.from({ length: 24 }, () => useRef(null));
  const minuteRefs = Array.from({ length: 60 }, () => useRef(null));
  const secondRefs = Array.from({ length: 60 }, () => useRef(null));

  useEffect(() => {
    if (hourRefs?.[time[0]]?.current) {
      // @ts-ignore
      hourRefs?.[time[0]]?.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [time[0]]);

  useEffect(() => {
    if (minuteRefs?.[time[1]]?.current) {
      // @ts-ignore
      minuteRefs?.[time[1]]?.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [time[1]]);

  useEffect(() => {
    if (secondRefs?.[time[2]]?.current) {
      // @ts-ignore
      secondRefs?.[time[2]]?.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [time[2]]);

  const LabelDays = useMemo(() => {
    return Array(7)
      .fill('')
      .map((_, i) => (
        <Grid item key={i} xs={1.7}>
          <Typography key={i} textAlign="center">
            {moment().day(i).format('dd')}
          </Typography>
        </Grid>
      ));
  }, [currentDate]);

  const Days = useMemo(() => {
    let caledar: Moment[] = [];
    const startDay = currentDate.clone().startOf('month').startOf('week');
    const endDay = currentDate.clone().endOf('month').endOf('week');
    const dateNow = startDay.clone().subtract(1, 'day');

    while (dateNow.isBefore(endDay, 'day')) {
      caledar = [
        ...caledar,
        ...Array(7)
          .fill(0)
          .map(() => dateNow.add(1, 'day').clone()),
      ];
    }

    return caledar.map((day, i) => {
      let styleFont: SxProps<Theme> = {};
      const styleContainer: SxProps<Theme> = {};

      if (!day.isSame(currentDate, 'month')) {
        styleFont = {
          ...styleFont,
          color: (theme) => alpha(theme.palette.text.primary, 0.3),
        };
      }
      if (moment().isSame(day, 'date')) {
        styleFont = {
          ...styleFont,
          backgroundColor: (theme) => theme.palette.grey[300],
        };
      }
      if (selectedDate?.isSame(day, 'date')) {
        styleFont = {
          ...styleFont,
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        };
      }
      return (
        <Grid item key={i} xs={1.7}>
          <Stack
            sx={{
              aspectRatio: '1',
              ...styleFont,
            }}
            // onClick={() => onClick(date)}
            justifyContent="center"
            onClick={() => setSelectedDate(day)}
            alignItems="center"
            borderRadius="50%"
            width="100%"
            height="100%"
          >
            <ButtonBase sx={{ width: '100%', height: '100%' }}>
              <Typography textAlign="center" fontSize="14px">
                {day.date()}
              </Typography>
            </ButtonBase>
          </Stack>
        </Grid>
      );
    });
  }, [currentDate, selectedDate]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleSubmit = () => {
    const result = moment(selectedDate || moment()).set({
      hour: time[0],
      minute: time[1],
      second: time[2],
    });
    if (onChange) {
      onChange(result);
    }
    setSelectedDate(result);

    setAnchorEl(null);
  };

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setTime([value.hour(), value.minute(), value.second()]);
    }
  }, [value]);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
    if (anchorEl) {
      const hourHeight = 31; // replace with your actual hour element height

      setTimeout(() => {
        const elementHours = document.querySelector('#hours-date-time-picker');
        const elementMinutes = document.querySelector(
          '#minutes-date-time-picker',
        );
        const elementSeconds = document.querySelector(
          '#seconds-date-time-picker',
        );

        if (elementHours) {
          elementHours.scrollTop = time[0] * hourHeight;
        }
        if (elementMinutes) {
          elementMinutes.scrollTop = time[1] * hourHeight;
        }
        if (elementSeconds) {
          elementSeconds.scrollTop = time[2] * hourHeight;
        }
      }, 100);
    }
  }, [anchorEl]);

  const valueDate = useMemo(() => {
    return selectedDate
      ? moment(selectedDate).format('YYYY-MM-DD HH:mm:ss')
      : null;
  }, [selectedDate]);

  return (
    <Box width="100%">
      {randerInput ? (
        // @ts-ignore
        <Box onClick={(e) => setAnchorEl(e.currentTarget)}>
          {randerInput({
            value: valueDate,
          })}
        </Box>
      ) : (
        <TextField
          name="date"
          placeholder="Select date"
          variant="outlined"
          fullWidth
          value={valueDate}
          // @ts-ignore
          onClick={(e) => setAnchorEl(e.currentTarget)}
          InputProps={{
            // style: {
            //   color: !startDate && !endDate ? 'rgba(0, 0, 0, 0.3)' : 'unset',
            // },
            endAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <Event />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack direction="row">
          <Box p={2} width="300px" height="350px">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={1}
              pb={1}
            >
              <Typography fontWeight="500" flex={1}>
                {currentDate.format('MMMM')} {currentDate.format('YYYY')}
              </Typography>
              <IconButton
                onClick={() =>
                  setCurrentDate(moment(currentDate).subtract(1, 'month'))
                }
              >
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                onClick={() =>
                  setCurrentDate(moment(currentDate).add(1, 'month'))
                }
              >
                <KeyboardArrowLeft sx={{ transform: 'rotate(180deg)' }} />
              </IconButton>
            </Stack>
            <Stack direction="row">
              <Grid container rowSpacing="5px">
                {LabelDays}
                {Days}
              </Grid>
            </Stack>
          </Box>
          <Stack direction="row" maxHeight="350px">
            <Stack
              sx={{
                overflowY: 'scroll',
                borderLeft: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.1)',
              }}
              id="hours-date-time-picker"
            >
              {hours.map((hour) => (
                <Box
                  key={hour}
                  p="5px 15px"
                  sx={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor:
                      time[0] === hour
                        ? (theme) => theme.palette.primary.main
                        : 'unset',
                    color:
                      time[0] === hour
                        ? (theme) => theme.palette.primary.contrastText
                        : 'unset',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={() => setTime([hour, time[1], time[2]])}
                  ref={hourRefs[hour]}
                >
                  {hour >= 0 && hour <= 9 ? `0${hour}` : hour}
                </Box>
              ))}
              <Box minHeight="319px" />
            </Stack>
            <Stack
              sx={{
                overflowY: 'auto',
                borderLeft: '1px solid',
                borderRight: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.1)',
              }}
              id="minutes-date-time-picker"
            >
              {minutes.map((minute) => (
                <Box
                  key={minute}
                  p="5px 15px"
                  sx={{
                    cursor: 'pointer',
                    fontSize: '14px',
                    backgroundColor:
                      time[1] === minute
                        ? (theme) => theme.palette.primary.main
                        : 'unset',
                    color:
                      time[1] === minute
                        ? (theme) => theme.palette.primary.contrastText
                        : 'unset',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={() => setTime([time[0], minute, time[2]])}
                  ref={minuteRefs[minute]}
                >
                  {minute >= 0 && minute <= 9 ? `0${minute}` : minute}
                </Box>
              ))}
              <Box minHeight="319px" />
            </Stack>
            <Stack
              sx={{
                overflowY: 'auto',
              }}
              id="seconds-date-time-picker"
            >
              {minutes.map((second) => (
                <Box
                  key={second}
                  p="5px 15px"
                  sx={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor:
                      time[2] === second
                        ? (theme) => theme.palette.primary.main
                        : 'unset',

                    color: time[2] === second ? 'white' : 'unset',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={() => setTime([time[0], time[1], second])}
                  ref={secondRefs[second]}
                >
                  {second >= 0 && second <= 9 ? `0${second}` : second}
                </Box>
              ))}
              <Box minHeight="319px" />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          p={1}
          borderTop="1px solid rgba(0, 0, 0, 0.1)"
        >
          <Button variant="text" size="small" onClick={handleSubmit}>
            Ok
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
}
