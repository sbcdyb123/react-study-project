import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './AuthContext'

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
)
