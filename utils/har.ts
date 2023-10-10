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

// TODO: Ensure trailing or starting slashes are accounted for.
export const getHarRequests = (
    entries: any,
    config: IHarApiConfig,
    requestPath: string
): IHarContents | undefined => {
    // const reqPathCleaned = requestPath.replace(/\/$/, '')
    // const requestUrlCleaned = config.apiUrl.replace(/\/$/, '')
    return entries.find((entry: IHarContents) => {
        const urlPath = entry.request.url.replace(config.apiUrl, '')
        console.log(urlPath, requestPath)
        return urlPath === requestPath
    })
}
