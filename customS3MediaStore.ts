import type {
  Media,
  MediaList,
  MediaListOptions,
  MediaStore,
  MediaUploadOptions,
} from '@tinacms/toolkit'
import { S3Client, ListObjectsCommand, DeleteObjectCommandInput, DeleteObjectCommand, PutObjectCommandInput, PutObjectCommand } from "@aws-sdk/client-s3";


export class CustomS3MediaStore implements MediaStore {
  accept = '*'
  private bucket = 'kingdom-tinacms-store';
  private baseUrl = `https://${this.bucket}.s3.us-east-1.amazonaws.com`
  private region = 'us-east-1'
  // private lastKey = undefined;

  // TODO:
  async persist(media: MediaUploadOptions[]): Promise<Media[]> {
    // this.lastKey = undefined;
    const newFiles: Media[] = []

    const client = new S3Client({
      region: this.region,
      signer: { sign: async (request) => request } // authentication workaround
    });

    for (const item of media) {
      const { file, directory } = item
      const formData = new FormData()
      formData.append('file', file)
      formData.append('directory', directory)
      formData.append('filename', file.name)


      let prefix = directory.replace(/^\//, '').replace(/\/$/, '')
      if (prefix) prefix = prefix + '/'

      const blob = file
      const filename = file.name
      const params: PutObjectCommandInput = {
        Bucket: this.bucket,
        Key: prefix + filename,
        Body: blob,
        ACL: 'public-read',
      }
      const command = new PutObjectCommand(params)
      try {
        const fileRes = await client.send(command)
        const src = this.baseUrl + prefix + filename
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
  
        newFiles.push({
          id: prefix + filename,
          type: 'file',
          directory,
          filename,
          src : src,
          thumbnails: {
            ['small']: src,
            ['75x75']: src,
            ['400x400']: src,
            ['1000x1000']: src,
          }
        })
      } catch (e) {
        console.error('error uploading file', e);
      }


      // const res = await this.fetchFunction(`${this.baseUrl}`, {
      //   method: 'POST',
      //   body: formData,
      // })

      // if (res.status != 200) {
      //   const responseData = await res.json()
      //   throw new Error(responseData.message)
      // }
      // const fileRes = await res.json()
      // /**
      //  * Images uploaded to S3 aren't instantly available via the API;
      //  * waiting a couple seconds here seems to ensure they show up in the next fetch.
      //  */
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 2000)
      // })
      // /**
      //  * Format the response from S3 to match Media interface
      //  * Valid S3 `resource_type` values: `image`, `video`, `raw` and `auto`
      //  * uploading a directory is not supported as such, type is defaulted to `file`
      //  */

      // newFiles.push(fileRes)
    }
    return newFiles
  }
  async delete(media: Media) {
    // throw new Error('Not implemented');  

    console.log('delete', media)
    const client = new S3Client({
      region: this.region,
       signer: { sign: async (request) => request } // authentication workaround
    });

    const params: DeleteObjectCommandInput = {
       Bucket: this.bucket,
       Key: media.id,
     }
     const command = new DeleteObjectCommand(params)
     try {
       const data = await client.send(command)
    } catch (e) {
       console.error(e)
      throw e
    }
  }
  // WIP:
  async list(options: MediaListOptions): Promise<MediaList> {
    const directory = options?.directory ?? ''
    let offset = options?.offset
    const limit = options?.limit ?? 50

    const client = new S3Client({
      region: this.region,
      signer: { sign: async (request) => request } // authentication workaround
    });
    const command = new ListObjectsCommand({
      Bucket: 'kingdom-tinacms-store',
      Prefix: directory || undefined,
      MaxKeys: limit,
      Marker: offset as string || undefined,
    })

    try {
      const data = await client.send(command);
      const items = (data.Contents || []).map((file) => {
        
        const filename = this.getBaseName(file.Key)
        const directory = this.getDirname(file.Key) + '/'
        
        const src = this.baseUrl + '/' + file.Key

        return {
          id: file.Key,
          type: this.getFileType(file.Key),
          directory,
          filename,
          src : src,
          thumbnails: {
            ['small']: src,
            ['75x75']: src,
            ['400x400']: src,
            ['1000x1000']: src,
          },
      } as Media});

      if (items?.length) {
        offset = items[items.length - 1].id
      }
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

  getBaseName(file) {
    if (!file) {
      return file
    }
    return file.split('/').reverse()[0];
  }

  getDirname(file) {
    if (!file) {
      return file
    }
    const parts = file.split('/');
    parts.pop();
    return parts.join('/');
  }

  
  getFileType(key: string) {
    if (key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.png') || key.endsWith('.gif') || key.endsWith('.webp')) {
      return 'image'
    } else if (key.endsWith('.mp4') || key.endsWith('.avi') || key.endsWith('.webm')) {
      return 'video'
    }
    return 'file';
  }

}