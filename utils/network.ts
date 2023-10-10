import { IHarApiConfig } from '../interfaces.ts'
import { Server } from 'bun'

export const forwardRequest = async (
  originalRequest: Request,
  config: IHarApiConfig,
  server: Server
): Promise<Response | null> => {
  // console.log(originalRequest)

  const originalRequestUrl = originalRequest.url.replace(
    `http://${server.hostname}:${server.port}`,
    config.apiUrl
  )

  console.log('originalRequestUrl', originalRequestUrl)

  const forwardResponseHeaders = new Headers()

  Array.from(originalRequest.headers).forEach(([name, value]) => {
    if (name.toLowerCase() === 'host') return
    forwardResponseHeaders.set(name, value)
  })

  try {
    const thing = await fetch(originalRequestUrl, {
      headers: forwardResponseHeaders,
      method: originalRequest.method,
    })
    console.log('forwardResponseHeaders', forwardResponseHeaders)
    console.log(thing)
    return thing
  } catch (e) {
    console.error('❌ Failed to forward request', e)
    return null
  }

  // const responseOptions = {
  //     status: entryResponse.status,
  //     headers: responseHeaders,
  //     type: entryResponse.content.mimeType,
  // }
}
