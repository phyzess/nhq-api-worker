import { E_REQUEST_METHOD } from '../../types'
import { DATABASES_ROUTE } from './constants'
import { handleCreate } from './create'
import { handleQuery } from './query'

const registers = [
  {
    url: DATABASES_ROUTE.QUERY,
    type: E_REQUEST_METHOD.POST,
    handle: [handleQuery],
  },
  {
    url: DATABASES_ROUTE.CREATE,
    type: E_REQUEST_METHOD.POST,
    handle: [handleCreate],
  },
]

export { registers }
