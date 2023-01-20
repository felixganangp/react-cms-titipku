export const greating = () => {
  const time = new Date().getHours();
  let greeting;
  if (time < 4) {
    greeting = 'Selamat Malam';
  } else if (time < 10) {
    greeting = 'Selamat Pagi';
  } else if (time < 14) {
    greeting = 'Selamat Pagi';
  } else if (time < 19) {
    greeting = 'Selamat Sore';
  } else {
    greeting = 'Selamat Malam';
  }

  return greeting;
};
