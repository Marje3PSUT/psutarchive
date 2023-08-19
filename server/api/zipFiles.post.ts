import JSZip from "jszip"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const apiUrl  = config.apiParty.endpoints.baseApi.url

  const files: string[] = body.files;
  const zip = new JSZip();

  // TODO: Error handling with h3 errors
  // Add each file to the zip file
  for (const fileUrl of files) {
    const file = await fetch(apiUrl.substring(0, apiUrl.lastIndexOf('/api')) + fileUrl).then(res => res.arrayBuffer())
    zip.file(fileUrl.substring(fileUrl.lastIndexOf('/') + 1), Buffer.from(file))
  }


  const responseHeaders = {
    'Content-Disposition': 'attachment; filename="files.zip"',
    'Content-Type': 'application/zip'
  };
  setResponseHeaders(event, responseHeaders)
  try {
    return zip.generateAsync({type : "uint8array"})
  } catch (err) {
    console.error(err)
  }
})
