const BLOCKS_BASE_ROUTE = '/blocks'

const BLOCKS_ROUTE = {
  RETRIEVE: `${BLOCKS_BASE_ROUTE}/retrieve/:blockId`,
  RETRIEVE_CHILDREN: `${BLOCKS_BASE_ROUTE}/retrieve/:blockId/children`,
}

export { BLOCKS_BASE_ROUTE, BLOCKS_ROUTE }
