export type RequestOptions = {
    url: string
    query?: Record<string, unknown>
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: Record<string, unknown>
    headers?: Record<string, string>
}

export const getUrl = (
    baseUrl: string,
    endpoint: string,
    params?: Record<string, any>
): string => {
    let queryString = ''
    if (params) {
        queryString = getQueryString(params)
    }
    const path: string = `${baseUrl}${endpoint}`
    return `${path}${queryString}`
}

const getQueryString = (params: Record<string, any>): string => {
    const qs: string[] = []
    const isDefined = <T>(
        value: T | null | undefined
    ): value is Exclude<T, null | undefined> => {
        return value !== undefined && value !== null
    }
    const append = (key: string, value: any) => {
        qs.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        )
    }
    const process = (key: string, value: any) => {
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    process(key, v)
                })
            } else if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    process(`${key}[${k}]`, v)
                })
            } else if (value instanceof Boolean) {
                append(key, value ? 'True' : 'False')
            } else {
                append(key, value)
            }
        }
    }
    Object.entries(params).forEach(([key, value]) => {
        process(key, value)
    })
    if (qs.length > 0) {
        return `?${qs.join('&')}`
    }
    return ''
}
