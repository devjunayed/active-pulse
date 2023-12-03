import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import routes from './routes/Routes.jsx';
import 'react-toastify/dist/ReactToastify.css';
import AuthProviders from './providers/AuthProviders.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <HelmetProvider>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={routes} />
          </div>
        </HelmetProvider>
      </AuthProviders>
    </QueryClientProvider>

  </React.StrictMode>,
)
