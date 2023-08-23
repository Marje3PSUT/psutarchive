import JSZip from "jszip"
import { fileTypeFromBuffer } from 'file-type'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const apiUrl  = config.apiParty.endpoints.baseApi.url

  const files: string[] = body.files;

  const zip = new JSZip()
  let fileType
  const responseHeaders = {
    'Content-Disposition': '',
    'Content-Type': '',
    'File-Extension': ''
  }

  // TODO: Error handling with h3 errors
  // Add each file to the zip file
  for (const fileUrl of files) {
    const file = Buffer.from(await $fetch(
        apiUrl.substring(0, apiUrl.lastIndexOf('/api')) + fileUrl
      , {cache: "default"}).then(res => res.arrayBuffer())
    )
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.lastIndexOf('_'))
    if (files.length === 1) {
      // Return the file without zipping if it's a single file
      fileType = await fileTypeFromBuffer(file)
      responseHeaders['Content-Disposition'] = `attachment; filename="${fileName}.${fileType?.ext}"`
      responseHeaders['Content-Type'] = fileType?.mime as string
      responseHeaders['File-Extension'] = fileType?.ext as string
      setResponseHeaders(event, responseHeaders)
      try {
        return file
      } catch(err) {
        console.error(err)
      }
    }
    zip.file(`${fileName}.${fileUrl.substring(fileUrl.lastIndexOf('.') + 1)}`, file)
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
