import { IHarApiConfig } from '../interfaces.ts'
import { Server } from 'bun'

export const forwardRequest = async (
  originalRequest: Request,
  config: IHarApiConfig,
  server: Server
): Promise<Response | null> => {
  const originalRequestUrl = originalRequest.url.replace(
    `http://${server.hostname}:${server.port}`,
    config.apiUrl
  )

  const forwardResponseHeaders = new Headers()

  Array.from(originalRequest.headers).forEach(([name, value]) => {
    // Having the host in place seems to cause issues with some APIs, safer to leave it out...
    if (name.toLowerCase() === 'host') return
    forwardResponseHeaders.set(name, value)
  })

  try {
    return await fetch(originalRequestUrl, {
      headers: forwardResponseHeaders,
      method: originalRequest.method,
    })
  } catch (e) {
    console.error('❌ Failed to forward request', e)
    return null
  }
}
