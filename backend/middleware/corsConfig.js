const allowedOrigins = [
  "http://localhost:3000",
  "https://rentify-major.vercel.app",
  "https://rentify-major-git-main-aryan-s-projects-323c3d5d.vercel.app",
  "https://rentify-major-z8a9.vercel.app"
];

export const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:", origin); // debug

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false); // ✅ FIXED
    }
  },
  credentials: true,
};