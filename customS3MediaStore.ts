import type {
  Media,
  MediaList,
  MediaListOptions,
  MediaStore,
  MediaUploadOptions,
} from '@tinacms/toolkit'
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";


export class CustomS3MediaStore implements MediaStore {
  fetchFunction = (input: RequestInfo, init?: RequestInit) => {
    return fetch(input, init)
  }
  accept = '*'
  private baseUrl = 'https://kingdom-tinacms-store.s3.us-east-1.amazonaws.com'
  private region = 'us-east-1'

  // TODO:
  async persist(media: MediaUploadOptions[]): Promise<Media[]> {
    const newFiles: Media[] = []

    for (const item of media) {
      const { file, directory } = item
      const formData = new FormData()
      formData.append('file', file)
      formData.append('directory', directory)
      formData.append('filename', file.name)

      const res = await this.fetchFunction(`${this.baseUrl}`, {
        method: 'POST',
        body: formData,
      })

      if (res.status != 200) {
        const responseData = await res.json()
        throw new Error(responseData.message)
      }
      const fileRes = await res.json()
      /**
       * Images uploaded to S3 aren't instantly available via the API;
       * waiting a couple seconds here seems to ensure they show up in the next fetch.
       */
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
      /**
       * Format the response from S3 to match Media interface
       * Valid S3 `resource_type` values: `image`, `video`, `raw` and `auto`
       * uploading a directory is not supported as such, type is defaulted to `file`
       */

      newFiles.push(fileRes)
    }
    return newFiles
  }
  // TODO:
  async delete(media: Media) {
    await this.fetchFunction(`${this.baseUrl}/${encodeURIComponent(media.id)}`, {
      method: 'DELETE',
    })
  }
  // WIP:
  async list(options: MediaListOptions): Promise<MediaList> {
    // const s3Options = {
    //   'list-type': 2,
    //   prefix: options.directory || '',
    //   'start-after': options.offset,
    //   'max-keys': options.limit,
    // }
    // const query = this.buildQuery(s3Options)
    // const response = await this.fetchFunction(this.baseUrl + query)
    // console.log('S3 response!', response);
    // const textRes = await response.text();
    // console.log('parsed string', textRes);
    // const xmlDoc = new DOMParser().parseFromString(textRes, "text/xml")
    // console.log('xml doc', xmlDoc);
    
    const directory = options?.directory ?? ''
    const offset = (options?.offset as number) ?? 0
    const limit = options?.limit ?? 50

    const client = new S3Client({
      region: this.region,
      signer: { sign: async (request) => request } // authentication workaround
    });
    const command = new ListObjectsCommand({
      Bucket: 'kingdom-tinacms-store',
      Prefix: directory || undefined,
      // StartAfter: options.offset,
      MaxKeys: limit,
      // Marker
      
    })

    try {
      const data = await client.send(command);
      const items = data.Contents?.map((file) => {
        return {
          id: file.Key,
          type: this.getFileType(file.Key),
          directory,
          filename: file.Key,
          src : `https://kingdom-tinacms-store.s3.us-east-1.amazonaws.com${directory ? '/' + directory : ''}/${file.Key}`,
          thumbnails: {
            ['small']: `https://kingdom-tinacms-store.s3.us-east-1.amazonaws.com${directory ? '/' + directory : ''}/${file.Key}`,
            ['75x75']: `https://kingdom-tinacms-store.s3.us-east-1.amazonaws.com${directory ? '/' + directory : ''}/${file.Key}`,
            ['400x400']: `https://kingdom-tinacms-store.s3.us-east-1.amazonaws.com${directory ? '/' + directory : ''}/${file.Key}`,
          },
      } as Media});
      return {
        items,
        nextOffset: offset,
      }

    } catch (err) {
      console.error(err);
      throw err
    }
  }

  parse = (img) => {
    return img.src
  }

  getFileType(key: string) {
    if (key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.png') || key.endsWith('.gif')) {
      return 'image'
    } else if (key.endsWith('.mp4') || key.endsWith('.avi')) {
      return 'video'
    }
    return 'file';
  }

}