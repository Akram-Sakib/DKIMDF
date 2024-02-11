const config = {
  env: process.env.NODE_ENV,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  cloudinary: {
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  },
};

export default config;
