import {  Media, MediaListOptions, MediaList, MediaStore, MediaUploadOptions } from "tinacms";

export class MyCustomMediaStore implements MediaStore {
  accept = '*'

  private baseUrl = 'https://github.com/RPGLabsG/rpglabsg.github.io/tree/master/public/uploads'

  constructor() {
    //
  }

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const uploaded: Media[] = []

    for (const { file, directory } of files) {
      const response: Response = await this.writeMediaToDisk({
        directory,
        content: file,
      })

      const { filename }: { filename: string } = await response.json()

      uploaded.push({
        // TODO: Implement correctly
        id: filename,
        type: 'file',
        directory,
        filename,
      })
    }

    return uploaded
  }
  async list(options?: MediaListOptions): Promise<MediaList> {
    const directory = options?.directory ?? ''
    const offset = (options?.offset as number) ?? 0
    const limit = options?.limit ?? 50
    const { file } = await this.getFile(directory)

    return {
      items: file.content.slice(offset, offset + limit),
      nextOffset: nextOffset(offset, limit, file.content.length),
    } as unknown as MediaList
  }
  async delete(media: Media): Promise<void> {
    return this.deleteFromDisk({
      relPath: media.id,
    })
  }

  async writeMediaToDisk(data: { directory: string; content: File }): Promise<any> {
    const formData = new FormData()
    formData.append('file', data.content)
    formData.append('directory', data.directory)
    return fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    }).catch((e) => {
      console.error(e)
    })
  }

  getFile(fileRelativePath: string) {
    console.log('getFile:', `${this.baseUrl}/${encodeURIComponent(fileRelativePath)}`);
    return fetch(`${this.baseUrl}/${encodeURIComponent(fileRelativePath)}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }).then((response) => {
      return response.json()
    })
  }
  deleteFromDisk(data: { relPath: string }): Promise<any> {
    return fetch(`${this.baseUrl}/${encodeURIComponent(data.relPath)}`, {
      method: 'DELETE',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    }).catch((e) => {
      console.error(e)
    })
  }
}

export const nextOffset = (offset: number, limit: number, count: number) => {
  if (offset + limit < count) return offset + limit
  return undefined
}



