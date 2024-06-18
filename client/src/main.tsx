import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./router/index";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "setimmediate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {store,persistor} from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
// import {persistor, store} from '@/redux/store'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistGate>
    </Provider>
  </QueryClientProvider>
);
