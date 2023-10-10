import { Server } from "bun";

const api = Bun.serve({
    port: 1565,
    // @ts-ignore
    async fetch(request: Request, server: Server): Response | Promise<Response> {
        console.log(request.url, await request.text() || '{}');
        return new Response('Hello from Bun server.');
    }
});

console.log(`Listening ${api.port} port.`);
