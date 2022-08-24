let DOMAIN = 'https://cdn-api.co-vin.in/api';
const GENERATE_OTP = `${DOMAIN}/v2/auth/public/generateOTP`;
const CONFIRM_OTP = `${DOMAIN}/v2/auth/public/confirmOTP`;
const DOWNLOAD_CERTIFICATE = `${DOMAIN}/v2/registration/certificate/public/download`;

export {
  DOMAIN,
  GENERATE_OTP,
  CONFIRM_OTP,
  DOWNLOAD_CERTIFICATE,
};
