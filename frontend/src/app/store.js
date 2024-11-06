import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userslice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});