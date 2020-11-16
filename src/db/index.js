/* eslint-disable no-console */
import { connect } from "mongoose";

const connectDatabase = (dbUrl) => {
  console.log("dbUrl ", dbUrl);
  connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
    .then(() => console.log("Connected to database"))
    .catch(
      /* istanbul ignore next */
      (err) => {
        /* istanbul ignore next */
        return err;
      }
    );
};

export default connectDatabase;
