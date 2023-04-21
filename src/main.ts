import useReflare from 'reflare'
import { Route } from 'reflare/dist/types'

const handleRequest = async (request: Request): Promise<Response> => {
  const u = new URL(request.url)
  const url = u.searchParams.get('url')
  if (!url) {
    return new Response('Missing url', {
      status: 400,
      statusText: 'Missing url',
    })
  }
  const reflare = await useReflare()
  const route: Route = {
    path: new URL(url).pathname,
    upstream: {
      domain: new URL(url).host,
      protocol: new URL(url).protocol as any,
    },
  }
  console.log(route)
  reflare.push(route)
  return reflare.handle(new Request(url, request))
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
