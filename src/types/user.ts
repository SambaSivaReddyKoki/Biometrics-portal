export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  hasBiometric: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}
