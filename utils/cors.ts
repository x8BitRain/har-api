export const handleCors = (request: Request): Response => {
    const corsResponse = new Response('ok')
    corsResponse.headers.set('Access-Control-Allow-Origin', '*')
    corsResponse.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    )
    const requestHeaders = request.headers.get('access-control-request-headers')
    corsResponse.headers.set(
        'Access-Control-Allow-Headers',
        requestHeaders ||
            'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    )
    return corsResponse
}
