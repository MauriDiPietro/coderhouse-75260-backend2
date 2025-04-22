import dotenv from "dotenv";

const ENV = process.argv[2];

dotenv.config({ path: ENV === "prd" ? "./.env.prd" : ENV === "qas" ? "./.env.qas" : "./.env.dev" });

export default {
    ENV,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
}