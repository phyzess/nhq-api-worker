import { E_REQUEST_METHOD } from '../../types'
import { BLOCKS_ROUTE } from './constants'
import { handleRetrieve } from './retrieve'
import {
  handleRetrieveChildren,
  retrieveBlocksChildren,
  IBlocksRetrieveResponse,
} from './retrieveChildren'

const registers = [
  {
    url: BLOCKS_ROUTE.RETRIEVE,
    type: E_REQUEST_METHOD.GET,
    handle: [handleRetrieve],
  },
  {
    url: BLOCKS_ROUTE.RETRIEVE_CHILDREN,
    type: E_REQUEST_METHOD.GET,
    handle: [handleRetrieveChildren],
  },
]

export { registers, handleRetrieveChildren, retrieveBlocksChildren }
export type { IBlocksRetrieveResponse }
