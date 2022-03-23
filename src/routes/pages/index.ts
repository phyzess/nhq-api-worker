import { E_REQUEST_METHOD } from '../../types'
import { PAGES_ROUTE } from './constants'

import { handleCreate } from './create'
import { handleRetrieve } from './retrieve'

const registers = [
  {
    url: PAGES_ROUTE.RETRIEVE,
    type: E_REQUEST_METHOD.GET,
    handle: [handleRetrieve],
  },
  {
    url: PAGES_ROUTE.CREATE,
    type: E_REQUEST_METHOD.POST,
    handle: [handleCreate],
  },
]

export { registers }
