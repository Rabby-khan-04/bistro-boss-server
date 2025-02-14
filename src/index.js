import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({ path: "../.env" });

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(`SERVER ERROR: ${err}`);
    });

    app.listen(port, () => {
      console.log(`Bistro boss server is running on PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log(`ERROR: ${err} !!`);
  });
