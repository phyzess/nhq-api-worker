import { json } from 'itty-router-extras'
import { nhq } from '../../nhq'
import { IRequest, IRouteHandle } from '../../types'

const handleCreate: IRouteHandle<IRequest> = async (request) => {
  const { notionToken, content } = request

  const result = await nhq
    .getClient(notionToken)
    .databases.create(content as any)

  return json(result)
}

export { handleCreate }
