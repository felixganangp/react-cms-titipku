/* eslint-disable no-plusplus */
import { useMemo, useState } from 'react';
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
  startDate,
  endDate,
  onClick,
  dateHover,
  onHover,
  onLeave,
}: {
  currentDate: Moment;
  date: Moment;
  startDate?: Moment | null;
  endDate?: Moment | null;
  dateHover?: Moment | null;
  onClick: (date: Moment) => void;
  onHover?: (date: Moment) => void;
  onLeave?: (date: Moment) => void;
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

    return {
      styleContainer,
      styleFont,
    };
  }, [currentDate, date, startDate, endDate]);
  return (
    <Stack
      sx={{
        padding: '3px',
        cursor: 'pointer',
        aspectRatio: '1',
        ...sx.styleContainer,
      }}
      onClick={() => onClick(date)}
      justifyContent="center"
      alignItems="center"
      onMouseEnter={() => onHover && onHover(date)}
    >
      <Stack
        sx={{
          ...sx.styleFont,
        }}
        onClick={() => onClick(date)}
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
}: {
  onChange?: (
    date: [Moment | null | undefined, Moment | null | undefined],
  ) => void;
  date?: [Moment | null | undefined, Moment | null | undefined];
  randerInput?: (params: any) => JSX.Element;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [dateHover, setDateHover] = useState<Moment | null>(null);
  const [selectedDate, setSelectedDate] = useState<
    [Moment | null, Moment | null]
  >([null, null]);

  const { startDate, endDate, dateValue } = useMemo(() => {
    const start = date ? date?.[0] : selectedDate[0];
    const end = date ? date?.[1] : selectedDate[1];
    return {
      startDate: start,
      endDate: end,
      dateValue: `${start?.format('DD/MM/yy') || 'dd/mm/yy'} - ${
        end?.format('DD/MM/yy') || 'dd/mm/yy'
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
          startDate={startDate}
          endDate={endDate}
          date={day}
          dateHover={dateHover}
          onHover={(value) => {
            if (startDate && !endDate) {
              setDateHover(value);
            }
          }}
          onLeave={() => setDateHover(null)}
          onClick={(value) => {
            if (!startDate) {
              setSelectedDate([value, null]);
              onChange?.([value, null]);
            } else if (startDate && !endDate) {
              if (value.isBefore(startDate)) {
                setSelectedDate([value, null]);
                onChange?.([value, null]);
              } else {
                setDateHover(null);
                setSelectedDate([startDate, value]);
                onChange?.([startDate, value]);
                setAnchorEl(null);
              }
            } else {
              setSelectedDate([value, null]);
              onChange?.([value, null]);
            }
          }}
        />
      </Grid>
    ));
  }, [currentDate, selectedDate, dateHover]);

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
              color: !startDate && !endDate ? 'rgba(0, 0, 0, 0.3)' : 'unset',
            },
            endAdornment: (
              <InputAdornment position="start">
                <Event />
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
