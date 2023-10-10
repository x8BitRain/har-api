import { IHarApiConfig, IHarContents } from './interfaces.ts'
import { Server } from 'bun'
import { getHarEntries, getHarRequests } from './utils/har.ts'
import { handleCors } from './utils/cors.ts'

export const setupServer = async (config: IHarApiConfig) => {
  const harEntries = await getHarEntries(config)

  const server = Bun.serve({
    port: config.port,
    async fetch(request, server) {
      if (request.method === 'OPTIONS') {
        return handleCors(request)
      }

      return await createResponse(harEntries, config, request, server)
    },
  })

  console.log(`🛜 HAR-api running at http://${server?.hostname}:${server?.port}/ (point your API requests here) ✅`)
}

const createResponse = async (
  entries: IHarContents[],
  options: IHarApiConfig,
  request: Request,
  server: Server
) => {
  const serverUrl = `http://${server.hostname}:${server.port}/`
  const requestUrlPath = request.url.replace(serverUrl, '')

  const matchingRequest = getHarRequests(entries, options, requestUrlPath)
  if (!matchingRequest) {
    console.error(`❌ Could not find ${requestUrlPath}`)
    return new Response('Not found', { status: 404 })
  }

  console.info(`✅ Found ${requestUrlPath}`)

  const entryResponse = matchingRequest.response

  const responseHeaders = new Headers()
  entryResponse.headers?.forEach((header) => {
    if (header.name.toLowerCase() === 'Content-Encoding'.toLowerCase()) {
      return
    }
    responseHeaders.set(header.name, header.value)
  })

  const responseOptions = {
    status: entryResponse.status,
    headers: responseHeaders,
    type: entryResponse.content.mimeType,
  }

  return new Response(entryResponse.content.text, responseOptions)
}
