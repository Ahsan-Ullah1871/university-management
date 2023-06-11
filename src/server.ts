import config from './config/index'
import app from './app'

// getting-started.js
import mongoose from 'mongoose'
import { error_logger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  error_logger.error(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      logger.info('Connected')

      logger.info(`Application  listening on port ${config.port}`)
    })
  } catch (error) {
    error_logger.error('Failed to connect database', error)
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        error_logger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM recieved')
//   if (server) {
//     server.close()
//   }
// })
