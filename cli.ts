#!/usr/bin/env bun

import { Command } from 'commander'
import { setupServer } from './index.ts'

const program = new Command()

const config = {
  har: '',
  port: 1565,
  debug: true,
  apiUrl: '',
}

const startup = () => {
  if (!config.har || !config.apiUrl) {
    console.error('❌ You must specify a HAR file and an API URL')
    program.help()
    return
  }

  if (config.apiUrl && !config.apiUrl.endsWith('/')) {
    config.apiUrl += '/'
  }

  setupServer(config)
}

program
  .name('har-api')
  .description('A simple HTTP server that serves a HAR file as an API')
  .version('0.0.1')

program
  .argument('<API URL>', 'The API URL you want to mock responses from')
  .argument('<HAR file>', 'The file path to your .har file')
  .option('-p, --port', 'Port to run the server on', '1565')
  .action((apiUrl, harDir) => {
    config.har = harDir
    config.apiUrl = apiUrl
    startup()
  })

program.parse()
