interface ApiConfigProps {
  apiUrl: string
  httpTimeout: number
}

interface MongodbConfigProps {
  connectionString: string
  databaseName: string
}


export interface ConfigProps {
  port: number
  jwtKey: string
  api: ApiConfigProps
  mongodb: {
    database: MongodbConfigProps
  }
}
