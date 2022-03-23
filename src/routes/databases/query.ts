import { error, json } from 'itty-router-extras'
import { nhq } from '../../nhq'
import { IRequest, IRouteHandle } from '../../types'

const handleQuery: IRouteHandle<IRequest> = async (request) => {
  const { notionToken, content } = request
  const { database_id, filter, sorts, start_cursor, page_size, archived } =
    content
  if (database_id) {
    const result = await nhq.getClient(notionToken).databases.query({
      database_id,
      filter,
      sorts,
      start_cursor,
      page_size,
      archived,
    })
    return json(result)
  }
  return error(400, 'Please pass "database_id" for database query')
}

export { handleQuery }
