import {
  GetBlockResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { Obj } from 'itty-router'
import { json } from 'itty-router-extras'
import { nhq } from '../../nhq'
import { IRequest, IRouteHandle } from '../../types'

type TRecursive = 'true' | 'false'

interface IQuery extends Obj {
  recursive: TRecursive
}

interface IBlockRetrieveRequest extends Omit<IRequest, 'query'> {
  blockId: string
  query: IQuery
}

interface IBlocksRetrieveResponse extends ListBlockChildrenResponse {
  results: Array<
    GetBlockResponse & {
      children?: IBlocksRetrieveResponse
    }
  >
}

const retrieveBlocksChildren = async (
  token: string,
  blockId: string,
  recursive: TRecursive,
) => {
  const block: IBlocksRetrieveResponse = await nhq
    .getClient(token)
    .blocks.children.list({
      block_id: blockId,
    })

  if (recursive === 'true') {
    block.results = await Promise.all(
      block.results.map(async (result) => {
        if ('has_children' in result && result.has_children) {
          const children = await retrieveBlocksChildren(
            token,
            result.id,
            recursive,
          )
          return {
            ...result,
            children,
          }
        }
        return result
      }),
    )
  }

  return block
}

const handleRetrieveChildren: IRouteHandle<IBlockRetrieveRequest> = async (
  request,
) => {
  const { notionToken, blockId, query } = request
  const { recursive } = query

  const result = await retrieveBlocksChildren(notionToken, blockId, recursive)
  return json(result)
}

export { handleRetrieveChildren, retrieveBlocksChildren }
export type { IBlocksRetrieveResponse }
