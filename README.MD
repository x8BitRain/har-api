# har-api

A CLI tool that serves captured network requests from a .har file, like if your API was running locally.

### Requirements

The Bun runtime is required to use this tool at the moment, you can download it here: 

https://bun.sh/docs/installation

### Installation

```git clone https://github.com/x8BitRain/har-api.git && cd har-api && bun install```

### Usage

```bun run har-api <api-url> <path-to-har-file>```
 
Example: 

```bun run har-api http://api.mywebsite.com ~/Downloads/example.har```

### How do I actually use this?

If for example you have an SPA that makes requests to an API, you can use this tool to serve the API locally from captured network requests, so you can develop the SPA without having to run your whole backend API locally.

1. Go to your website and open the developer tools and go to the network tab.
2. Hard reload the page (ctrl + shift + r) and wait for all the requests to finish loading.
   1. Some browsers have a "preserve log" option that you can enable to keep the requests after a hard reload. You can use this to click around the website a lot and capture the most amount of requests possible to reduce the likelihood of 404s when using this tool.
3. Click on the "Export HAR" button ([example how-to](https://help.okta.com/oag/en-us/content/topics/access-gateway/troubleshooting-with-har.htm)).
4. Run har-api with the URL of the API you want to mock and the path to the .har file you just downloaded.
5. The API is now running locally at http://localhost:1565 by default. You can change the port by passing the `--port` option to har-api.
6. Change your API URL in your SPA, website, app, etc. to point to http://localhost:1565 and you're done!

### Limitations

- Requests are matched by URL only, so if you have multiple requests to the same URL with different request bodies, they will all be served the same response. Requests with different query params on the URL will work through.
- Requests that return blobs, readable streams, form data, etc. are not supported very well.
- Only 1 .har file and 1 API URL can be used at a time at the moment.
- I haven't tested this very much so there are probably more limitations that I haven't found yet. Open an issue if you've found one!
