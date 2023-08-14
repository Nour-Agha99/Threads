import mongoose from "mongoose";

let isConnect = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGOOSE)
    return console.log("your lose mind, URL not found");
  if (isConnect) return console.log("Funny, you already connected to mongoose");

  try {
    await mongoose.connect(process.env.MONGOOSE_URL || '');
    isConnect = true;
    console.log("Good work, you are connect to mongoose successfully");
  } catch (err) {
    console.log(err);
  }
};
