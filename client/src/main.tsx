import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './router/index'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'setimmediate';
import {
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
//   import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
// import {persistor, store} from '@/redux/store'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
)
