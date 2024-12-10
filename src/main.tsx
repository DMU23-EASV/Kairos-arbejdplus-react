import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TaskListProvider } from './TaskListContext.tsx';

import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
                <TaskListProvider>
    <App />
    </TaskListProvider>

  </StrictMode>,
)
