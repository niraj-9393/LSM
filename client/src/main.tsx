
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>,
)
