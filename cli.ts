#!/usr/bin/env bun

import { setupServer } from './index.ts'

const config = {
    har: '/Users/mint/Downloads/localhost.har',
    port: 1565,
    debug: true,
    apiUrl: 'https://api.roomle.com/v2/'
}

// serverReplay(har, {
//     config: config,
//     resolvePath: null, //PATH.dirname(configPath),
//     port: 1565,
//     debug: true,
// })

setupServer(config)
