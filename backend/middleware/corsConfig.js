const allowedOrigins = [
  "http://localhost:3000",
  "https://rentify-major.vercel.app",
  "https://rentify-major-git-main-aryan-s-projects-323c3d5d.vercel.app"
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};