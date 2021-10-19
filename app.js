require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

const app = express();

app.use(morgan('dev'))

const authMiddleware = require("./middlewares/auth.middleware");

// most importants middlewares
app.use(express.json());
app.use(cors());

//...import routes
const authRoutes = require('./routes/auth.routes');
const feedRoutes = require('./routes/feed.routes');
const postRoutes = require('./routes/post.routes');
const profileRoutes = require('./routes/profile.routes');
const gameRoutes = require('./routes/games.routes')

//authentication
app.use("/auth", authRoutes);

app.use(authMiddleware);
// games
app.use("/games", gameRoutes);


// games
app.use("/games", gameRoutes);

//feed interations
app.use("/feed", feedRoutes);

//posts interations
app.use("/post", postRoutes);

app.use("/profile", profileRoutes)


app.listen(process.env.PORT, () => {
  console.log(`server runing in port ${process.env.PORT}`);
});

process.once("SIGUSR2", function () {
  gracefulShutdown(function () {
    process.kill(process.pid, "SIGUSR2");
    process.exit(0);
  });
});
 
process.on("SIGINT", function () {
  process.kill(process.pid, "SIGINT");
  process.exit(0);
});
