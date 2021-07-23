import { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)
