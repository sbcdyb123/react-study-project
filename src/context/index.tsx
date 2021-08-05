import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from 'store'
import { AuthProvider } from './AuthContext'

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  </Provider>
)
