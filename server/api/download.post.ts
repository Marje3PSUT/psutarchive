import JSZip from "jszip"
import { fileTypeFromBuffer } from 'file-type'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const apiUrl  = config.apiParty.endpoints.baseApi.url

  const files: {
    url: string
    source: string
  }[] = body.files;

  const zip = new JSZip()
  let fileType
  const responseHeaders = {
    'Content-Disposition': '',
    'Content-Type': '',
    'File-Extension': ''
  }

  let isText = false
  // TODO: Error handling with h3 errors
  // Add each file to the zip file
  for (const file of files) {
    // check if the file is uploaded on the API locally or a separate storage provider
    const fileUrl = file.source === 'local' ?
        apiUrl.substring(0, apiUrl.lastIndexOf('/api')) + file.url : file.url

    const fileData = await $fetch(fileUrl, {
        cache: "default",
        responseType: 'blob',
        onResponse(context) {
            if (context.response.headers.get('content-type') === 'text/plain') {
              isText = true
            }
        },
      }).then(res => (res as Response).arrayBuffer())
    const fileBuffer = Buffer.from(fileData)

    const fileName = file.url.substring(file.url.lastIndexOf('/') + 1, file.url.lastIndexOf('_'))
    if (files.length === 1) {
      // Return the file without zipping if it's a single file
      fileType = await fileTypeFromBuffer(fileBuffer)
      responseHeaders['Content-Disposition'] = `attachment; filename="${fileName}.${fileType?.ext}"`
      responseHeaders['Content-Type'] =
        isText ? 'text/plain'
        : fileType?.mime ? fileType.mime
        : 'application/octet-stream' // fallback type
      responseHeaders['File-Extension'] = fileUrl.substring(fileUrl.lastIndexOf('.') + 1)
      setResponseHeaders(event, responseHeaders)
      try {
        return fileBuffer
      } catch(err) {
        console.error(err)
        return
      }
    }
    zip.file(`${fileName}.${file.url.substring(file.url.lastIndexOf('.') + 1)}`, fileBuffer)
  }
  
  const zipFile = await zip.generateAsync({type: 'uint8array'})
  fileType = await fileTypeFromBuffer(Buffer.from(zipFile))

  responseHeaders['Content-Disposition'] = 'attachment; filename="files.zip"'
  responseHeaders['Content-Type'] = fileType?.mime as string
  responseHeaders['File-Extension'] = fileType?.ext as string
  setResponseHeaders(event, responseHeaders)
  
  try {
    return zipFile
  } catch (err) {
    console.error(err)
  }
})
