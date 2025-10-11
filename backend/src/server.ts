import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config";
import { seedAdmin } from "./app/utils/seedAdmin";
// import mongoose from "mongoose";

async function main() {
  try {
    // if you are using MongoDB, uncomment the following lines
    await mongoose.connect(envVars.MONGODB_URL as string);
    app.listen(envVars.PORT, async () => {
      await seedAdmin();
      console.log(`App running on port ${envVars.PORT}`);

    });
  } catch (error) {
    console.log(error);
  }
}

main();