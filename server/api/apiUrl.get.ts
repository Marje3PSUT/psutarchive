export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiUrl  = config.apiParty.endpoints.baseApi.url
  
  // TODO: make this a proxy endpoint

  try {
    return apiUrl
  } catch (err) {
    console.error(err)
  }
})
