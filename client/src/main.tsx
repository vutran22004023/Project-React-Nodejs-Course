import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './router/index'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'setimmediate';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
    <App />
    </>
)
