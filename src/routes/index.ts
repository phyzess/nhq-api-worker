import { ThrowableRouter, withParams, withContent } from 'itty-router-extras'
import { registers as databasesRegisters } from './databases'
import { registers as pagesRegisters } from './pages'
import { registers as blocksRegisters } from './blocks'
import { withAuth } from '../middleware/withAuth'
import { IRequest, IRouteHandle } from '../types'

const middleware = [withAuth, withParams, withContent]

const registers = [...databasesRegisters, ...pagesRegisters, ...blocksRegisters]

const router = ThrowableRouter()

for (const { type, url, handle } of registers) {
  router[type.toLowerCase()](
    url,
    ...[...middleware, ...(handle as IRouteHandle<IRequest>[])],
  )
}

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

export { router }
