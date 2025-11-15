import 'dotenv/config'
import * as joi from 'joi'


interface EnvVars {
  PORT: number
  IBD_DB_NAME: string
  IBD_DB_HOST: string
  IBD_DB_PORT: number
  IBD_DB_USERNAME: string
  IBD_DB_PASSWORD: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  // SEGIP_URL: string
  MODE: string
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    IBD_DB_NAME: joi.string().required(),
    IBD_DB_HOST: joi.string().required(),
    IBD_DB_PORT: joi.number().required(),
    IBD_DB_USERNAME: joi.string().required(),
    IBD_DB_PASSWORD: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    // SEGIP_URL: joi.string().required(),
    MODE: joi.string()
  })
  .unknown(true)

const { error, value } = envsSchema.validate({
  ...process.env,
})

if(error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const DbEnvs = {
  dbName: envVars.IBD_DB_NAME,
  dbHost: envVars.IBD_DB_HOST,
  dbPort: envVars.IBD_DB_PORT,
  dbUser: envVars.IBD_DB_USERNAME,
  dbPass: envVars.IBD_DB_PASSWORD
}

export const envs = {
  jwtSecret: envVars.JWT_SECRET,
  expiresIn: envVars.JWT_EXPIRES_IN || '1h',
  mode: envVars.MODE
}

export const ownPort = {
  port: envVars.PORT
}

// export const segip = {
//   segipUrl: envVars.SEGIP_URL
// }