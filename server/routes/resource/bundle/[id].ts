import JSZip from 'jszip';
import { fileTypeFromBuffer } from 'file-type';

export default defineEventHandler(async (event) => {
  const resourceId = getRouterParam(event, 'id');
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  const resourceEntity = (
    await (await fetch(`${apiUrl}/items/resource/${resourceId}?fields=files.directus_files_id.*`)).json()
  ).data;

  if (!resourceEntity?.files || resourceEntity.files?.length <= 1) {
    return 'Nope :)';
  }

  const zip = new JSZip();

  const responseHeaders = {
    'Content-Disposition': '',
    'Content-Type': '',
    'File-Extension': '',
  };

  for (const file of resourceEntity.files) {
    const fileData = await fetch(`${apiUrl}/assets/${file.directus_files_id.id}`, { cache: 'force-cache' });
    const fileBlob = await fileData.blob();
    const fileBuffer = Buffer.from(await fileBlob.arrayBuffer());
    zip.file(file.directus_files_id.filename_download, fileBuffer);
  }

  const zipFile = await zip.generateAsync({ type: 'uint8array' });
  const fileType = await fileTypeFromBuffer(Buffer.from(zipFile));

  responseHeaders['Content-Disposition'] = 'attachment; filename="files.zip"';
  responseHeaders['Content-Type'] = fileType?.mime as string;
  responseHeaders['File-Extension'] = fileType?.ext as string;
  setResponseHeaders(event, responseHeaders);

  try {
    return zipFile;
  } catch (err) {
    console.error(err);
  }
});
