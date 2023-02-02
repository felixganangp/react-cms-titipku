export const greating = (timeDate: Date) => {
  const time = timeDate.getHours();
  let day;
  let greeting;

  if (time >= 7 && time <= 10) {
    day = 'morning';
    greeting = 'Good Morning';
  } else if (time <= 15 && time >= 11) {
    day = 'day';
    greeting = 'Good Day';
  } else if (time < 19 && time >= 16) {
    day = 'afternoon';
    greeting = 'Selamat Sore';
  } else {
    day = 'night';
    greeting = 'Good Evening';
  }

  return { day, greeting };
};
