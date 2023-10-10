import { IHarApiConfig, IHarContents } from '../interfaces.ts'

export const filterHarEntries = (
  harEntries: any,
  config: IHarApiConfig
): IHarContents[] => {
  return harEntries.log.entries.filter((entry: any) => {
    return entry.request.url.startsWith(config.apiUrl)
  })
}

export const getHarEntries = async (
  config: IHarApiConfig
): Promise<IHarContents[]> => {
  const harText = await Bun.file(config.har).text()

  const logEntries = [config.har].reduce(
    function (mergedHar, harPath) {
      const har = JSON.parse(harText)
      const entries = mergedHar.log.entries.concat(har.log.entries)
      return {
        log: {
          entries,
        },
      }
    },
    {
      log: {
        entries: [],
      },
    }
  )
  return filterHarEntries(logEntries, config)
}

export const getHarRequests = (
  entries: any,
  config: IHarApiConfig,
  requestPath: string
): IHarContents | undefined => {
  return entries.find((entry: IHarContents) => {
    let urlPath = entry.request.url.replace(config.apiUrl, '')
    // Ensure leading slashes are accounted for.
    if (!requestPath.startsWith('/')) {
      requestPath = '/' + requestPath
    }
    if (!urlPath.startsWith('/')) {
      urlPath = '/' + urlPath
    }
    return urlPath === requestPath
  })
}
