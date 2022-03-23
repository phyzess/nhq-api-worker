import { Request as IttyRequest } from 'itty-router'

enum E_REQUEST_METHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface IRouteHandle<T extends IRequest> {
  (request: T): Promise<Response>
}

interface IRequest extends Omit<Request, keyof IttyRequest>, IttyRequest {
  notionToken: string
  content: Record<string, any>
}

interface IRegister<T extends IRequest> {
  url: string
  type: E_REQUEST_METHOD
  handle: IRouteHandle<T>[]
}

export { E_REQUEST_METHOD, IRequest, IRouteHandle, IRegister }
