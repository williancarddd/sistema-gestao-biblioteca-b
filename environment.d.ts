declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIROMENT: 'development' | 'production'
      JWT_SECRET: string
      PORT?: string
    }
  }
}