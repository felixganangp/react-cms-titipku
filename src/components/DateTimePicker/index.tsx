/* eslint-disable no-plusplus */
import { useEffect, useMemo, useState } from 'react';
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

const Day = ({
  currentDate,
  date,
  selectedDate,
  curentSelectDate,
  onClick,
  dateHover,
  onHover,
}: {
  currentDate: Moment;
  date: Moment;
  selectedDate?: Moment | null;
  dateHover?: Moment | null;
  onClick: (date: Moment) => void;
  onHover?: (date: Moment) => void;
  curentSelectDate?: Moment | null;
}) => {
  const sx = useMemo(() => {
    let styleFont: SxProps<Theme> = {};
    let styleContainer: SxProps<Theme> = {};

    if (!date.isSame(currentDate, 'month')) {
      styleFont = {
        ...styleFont,
        color: (theme) => alpha(theme.palette.text.primary, 0.3),
      };
    }

    if (moment().isSame(date, 'date')) {
      styleFont = {
        ...styleFont,
        backgroundColor: (theme) => theme.palette.grey[300],
      };
    }

    if (
      startDate &&
      date.isAfter(startDate, 'date') &&
      !endDate &&
      (date.isBetween(startDate, dateHover, 'date') ||
        date.isSame(dateHover, 'date'))
    ) {
      styleContainer = {
        ...styleContainer,
        backgroundColor: (theme) =>
          dateHover ? alpha(theme.palette.primary.main, 0.3) : 'unset',
      };
    }

    if (date.isSame(startDate, 'date')) {
      styleFont = {
        ...styleFont,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.common.white,
      };
      styleContainer = {
        ...styleContainer,
        backgroundColor:
          endDate || startDate?.isBefore(dateHover)
            ? (theme) => alpha(theme.palette.primary.main, 0.3)
            : 'transparent',
        borderRadius: '50% 0 0 50%',
        ':hover': {
          backgroundColor: endDate
            ? (theme) => alpha(theme.palette.primary.main, 0.3)
            : 'transparent',
        },
      };
    }

    if (endDate && date.isSame(endDate, 'date')) {
      styleFont = {
        ...styleFont,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.common.white,
      };
      styleContainer = {
        ...styleContainer,
        backgroundColor: !startDate?.isSame(endDate, 'date')
          ? (theme) => alpha(theme.palette.primary.main, 0.3)
          : 'unset',
        borderRadius: '0 50% 50% 0',
      };
    }
    if (date.isBetween(startDate, endDate, 'date')) {
      styleContainer = {
        ...styleContainer,
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.3),
      };
    }

    if (
      (endSelectDate && date.isAfter(endSelectDate, 'date')) ||
      (startSelectDate && date.isBefore(startSelectDate, 'date'))
    ) {
      styleFont = {
        ...styleFont,
        cursor: 'not-allowed',
        color: (theme) => alpha(theme.palette.text.primary, 0.3),
      };

      styleContainer = {
        ':hover': {
          backgroundColor: 'unset',
        },
        cursor: 'not-allowed',
      };
    }
    return {
      styleContainer,
      styleFont,
    };
  }, [currentDate, date, selectedDate, dateHover]);
  return (
    <Stack
      sx={{
        padding: '3px',
        cursor: 'pointer',
        aspectRatio: '1',
        ...sx.styleContainer,
      }}
      onClick={() => {
        onClick(date);
      }}
      justifyContent="center"
      alignItems="center"
      onMouseEnter={() => {
        if (onHover) {
          onHover(date);
        }
      }}
    >
      <Stack
        sx={{
          ...sx.styleFont,
        }}
        // onClick={() => onClick(date)}
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        width="100%"
        height="100%"
      >
        <ButtonBase sx={{ width: '100%', height: '100%' }}>
          <Typography textAlign="center" fontSize="14px">
            {date.date()}
          </Typography>
        </ButtonBase>
      </Stack>
    </Stack>
  );
};

export default function DateRangePicker({
  onChange,
  date,
  randerInput,
  curentSelectDate,
}: {
  onChange?: (date: Moment | null | undefined) => void;
  date?: [Moment | null | undefined, Moment | null | undefined];
  randerInput?: (params: any) => JSX.Element;
  curentSelectDate?: Moment | null;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [dateHover, setDateHover] = useState<Moment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Moment | null | undefined>(
    null,
  );

  const { dateValue } = useMemo(() => {
    return {
      dateValue: `${
        selectedDate?.format('DD/MM/yy hh:mm:ss') || 'dd/mm/yy hh:mm:ss'
      }`,
    };
  }, [selectedDate, date]);

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

    return caledar.map((day, i) => (
      <Grid item key={i} xs={1.7}>
        <Day
          currentDate={currentDate}
          selectedDate={selectedDate}
          date={day}
          dateHover={dateHover}
          curentSelectDate={curentSelectDate}
          onHover={(value) => {
            setDateHover(value);
          }}
          onClick={(value) => {
            onChange?.(value || null);

            setSelectedDate(value || null);
          }}
        />
      </Grid>
    ));
  }, [currentDate, selectedDate, dateHover]);

  useEffect(() => {
    if (anchorEl) {
      return setCurrentDate(moment());
    }
  }, [anchorEl]);

  return (
    <Box>
      {randerInput ? (
        // @ts-ignore
        <Box onClick={(e) => setAnchorEl(e.currentTarget)}>
          {randerInput({
            value: dateValue,
          })}
        </Box>
      ) : (
        <TextField
          name="date"
          placeholder="Select date"
          variant="outlined"
          fullWidth
          value={dateValue}
          // @ts-ignore
          onClick={(e) => setAnchorEl(e.currentTarget)}
          InputProps={{
            style: {
              color: !currentDate ? 'rgba(0, 0, 0, 0.3)' : 'unset',
            },
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
        <Box width="300px" p={2}>
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
          <Grid
            container
            onMouseLeave={() => setDateHover(null)}
            rowSpacing="5px"
          >
            {LabelDays}
            {Days}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
}
