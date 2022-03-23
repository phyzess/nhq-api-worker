import { APIErrorCode } from '@notionhq/client'
import { IRequest } from '../types'

const withAuth = (request: IRequest) => {
  const token =
    (request.headers.get('Authorization') || '').split('Bearer ')[1] ||
    undefined

  if (!token) {
    return new Response(
      `notion api error: ${APIErrorCode.Unauthorized}, please pass your integration token in request.`,
      { status: 401, statusText: APIErrorCode.Unauthorized },
    )
  }

  request.notionToken = token
}

export { withAuth }
