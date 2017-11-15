/** @flow */
export type Data = {
  connected: boolean,
  savedConnections: number,
  redisConnected: boolean,
  redisConnectionError:? Object // TODO: create separate type
}
