import { Client as NClient } from '@notionhq/client'

class NHQClient {
  private _clientMap = new Map<string, NClient>()

  private _getClient = (token: string) => this._clientMap.get(token)

  private _hasClient = (token: string) => this._clientMap.has(token)

  private _setClient = (token: string, client: NClient) =>
    this._clientMap.set(token, client)

  private _initNewClient = (token: string) => {
    const client = new NClient({
      auth: token,
    })
    this._setClient(token, client)
    return client
  }

  public getClient = (token: string) => {
    if (this._hasClient(token)) {
      return this._getClient(token) as NClient
    } else {
      return this._initNewClient(token)
    }
  }
}

const nhq = new NHQClient()

export { nhq }
