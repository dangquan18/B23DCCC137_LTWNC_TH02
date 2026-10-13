import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './app/store'
import { ThemeProvider } from './theme/ThemeProvider'

// ThemeProvider bọc <App /> từ bên ngoài: khi theme đổi, phần tử <App /> (children) giữ nguyên
// tham chiếu nên React bỏ qua nó, chỉ những component gọi useTheme() mới re-render.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
