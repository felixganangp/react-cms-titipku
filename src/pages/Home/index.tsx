import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { greating } from 'utils/greating';
import { useAppSelector } from 'store/hooks';
import moment from 'moment';

import morning from 'assets/home/morning.svg';
import day from 'assets/home/day.svg';
import afternoon from 'assets/home/afternoon.svg';
import night from 'assets/home/night.svg';
import { number } from 'yup';

interface Map {
  [key: string]: string | undefined;
}

// interface QuoteType: {
//   auth
// }
const image: Map = {
  morning,
  day,
  afternoon,
  night,
};

export default function Home() {
  const userDetails = useAppSelector((state) => state.userDetails.data);
  const [date, setDate] = useState(new Date());
  const [quote, setQuote] = useState<any>({
    content:
      'Anehnya, yang orang lihat dari foto kita berdua adalah aku dan kamu, namun yang kulihat adalah diriku dan seluruh sisa hidupku.',
    author: 'Prof. Dr. Hj. Megawati Soekarno Poetri',
  });

  const getData = async () => {
    const respon = await fetch(
      'https://api.quotable.io/random?tags=famous-quotes,future',
      {
        method: 'GET',
        redirect: 'follow',
      },
    );
    const { author, content } = await respon.json();
    setQuote({
      author,
      content,
    });
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 54px)',
        backgroundImage: `url(${image[greating(date).day]})`,
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
        p="50px"
      >
        <Box
          bgcolor="rgba(0,0,0,0.3)"
          p="15px 20px"
          borderRadius="10px"
          // minWidth="400px"
          maxWidth="500px"
        >
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'Montserrat',
            }}
          >
            {greating(date).greeting} {userDetails?.full_name}
          </Typography>
          <Typography color="#fff" my="20px" fontSize="15px">
            “{quote?.content}”
          </Typography>
          <Typography
            textAlign="end"
            color="#fff"
            sx={{
              position: 'relative',
              fontFamily: 'Montserrat',
              '&::before': {
                content: '" "',
                borderTop: '1.5px solid #fff',
                position: 'absolute',
                top: '50%',
                width: '100px',
              },
            }}
          >
            ---------------- {quote?.author}
          </Typography>
        </Box>

        <Typography
          color="#fff"
          variant="h1"
          sx={{
            fontFamily: 'Montserrat',
            fontSize: '70px',
            fontWeight: 700,
          }}
        >
          {moment(date).format('hh:mm A')}
        </Typography>
      </Box>
    </Box>
  );
}
