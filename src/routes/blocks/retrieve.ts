import { json } from 'itty-router-extras'
import { nhq } from '../../nhq'
import { IRequest, IRouteHandle } from '../../types'

const handleRetrieve: IRouteHandle<IRequest> = async (request) => {
  const { notionToken, blockId } = request as any

  const result = await nhq.getClient(notionToken).blocks.retrieve({
    block_id: blockId,
  })
  return json(result)
}

export { handleRetrieve }
