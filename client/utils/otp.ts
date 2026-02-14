const OTP_LENGTH = 6;

function generateOtp(length = OTP_LENGTH) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

export { generateOtp };
