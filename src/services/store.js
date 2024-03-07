import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
import { textApi } from "./textExtractor";

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [textApi.reducerPath]: textApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware, textApi.middleware),
});
