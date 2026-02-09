const createEndpoint = (base: string) => (path: string = '') => path ? `/${base}/${path}` : `/${base}`

export default createEndpoint