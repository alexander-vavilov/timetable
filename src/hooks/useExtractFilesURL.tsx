import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference
} from 'firebase/storage'

import { storage } from '../../firebase'

const useExtractFilesURL = () => {
  const extractFilesURL = async (listRef: StorageReference) => {
    const filesURLArr: string[] = []
    const listResult = await listAll(listRef)

    const downloadURLs = await Promise.all(
      listResult.items.map((file) => {
        return getDownloadURL(ref(storage, file.fullPath))
      })
    )
    filesURLArr.push(...downloadURLs)

    return filesURLArr
  }

  return extractFilesURL
}

export default useExtractFilesURL
