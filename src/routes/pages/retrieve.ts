import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { Obj } from 'itty-router'
import { json } from 'itty-router-extras'
import { nhq } from '../../nhq'
import { IRequest, IRouteHandle } from '../../types'
import { retrieveBlocksChildren } from '../blocks'
import type { IBlocksRetrieveResponse } from '../blocks'

interface IQuery extends Obj {
  content: 'true' | 'false'
}

interface IPageRetrieveRequest extends Omit<IRequest, 'query'> {
  pageId: string
  query: IQuery
}

interface IPageRetrieveResponse {
  basicInfo: GetPageResponse
  content?: IBlocksRetrieveResponse
}

const retrieveContent = async (token: string, pageId: string) => {
  const content = await retrieveBlocksChildren(token, pageId, 'true')
  return content
}

const handleRetrieve: IRouteHandle<IPageRetrieveRequest> = async (
  request: IPageRetrieveRequest,
) => {
  const page: IPageRetrieveResponse = {} as IPageRetrieveResponse
  const { notionToken, pageId, query } = request
  const { content } = query

  const pageInfo = await nhq
    .getClient(notionToken)
    .pages.retrieve({ page_id: pageId })

  page.basicInfo = pageInfo

  if (content === 'true') {
    const pageContent = await retrieveContent(notionToken, pageId)
    page.content = pageContent
  }
  return json(page)
}

export { handleRetrieve, IPageRetrieveRequest }
