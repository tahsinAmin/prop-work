import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { eventsUserApi } from "../services/dashboard-service"

export const store = configureStore({
  reducer: {
    [eventsUserApi.reducerPath]: eventsUserApi.reducer,
  },

  // this will only help you with caching
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsUserApi.middleware),  
});

setupListeners(store.dispatch);

