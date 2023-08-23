import JSZip from "jszip"
import { fileTypeFromBuffer } from 'file-type'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const apiUrl  = config.apiParty.endpoints.baseApi.url

  const files: string[] = body.files;

  // Return the file without zipping if it's a single file
  if (files.length === 1) {
    const file = Buffer.from(await fetch(
      apiUrl.substring(0, apiUrl.lastIndexOf('/api')) + files[0])
      .then(
        res => res.arrayBuffer()
      )
    )
    const fileType = await fileTypeFromBuffer(Buffer.from(file))
    const responseHeaders = {
      'Content-Disposition': `attachment; filename="${
        files[0].substring(
          files[0].lastIndexOf('/') + 1,
          files[0].lastIndexOf('_')
        )}.${fileType?.ext}"`,
      'Content-Type': fileType?.mime as string,
      'File-Extension': fileType?.ext as string
    };
    setResponseHeaders(event, responseHeaders)
    return file
  }

  const zip = new JSZip();

  // TODO: Error handling with h3 errors
  // Add each file to the zip file
  for (const fileUrl of files) {
    const file = await fetch(apiUrl.substring(0, apiUrl.lastIndexOf('/api')) + fileUrl).then(res => res.arrayBuffer())
    zip.file(fileUrl.substring(fileUrl.lastIndexOf('/') + 1), Buffer.from(file))
  }


  const responseHeaders = {
    'Content-Disposition': 'attachment; filename="files.zip"',
    'Content-Type': 'application/zip',
    'File-Extension': 'zip'
  };
  setResponseHeaders(event, responseHeaders)
  try {
    return zip.generateAsync({type : "uint8array"})
  } catch (err) {
    console.error(err)
  }
})
