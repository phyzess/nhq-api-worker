import { router } from './routes'

addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as FetchEvent
  fetchEvent.respondWith(router.handle(fetchEvent.request))
})
