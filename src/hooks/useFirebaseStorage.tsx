import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
  uploadBytes
} from 'firebase/storage'
import { toast } from 'sonner'

import { storage } from '../../firebase'
import { toastError } from '../toast'
import { compressImage } from '../utils'

const useFirebaseStorage = () => {
  const uploadFile = async (
    file: File,
    fileRef: StorageReference,
    maxFileSize: number = 15
  ) => {
    try {
      if (file.size / 1024 / 1024 > maxFileSize) {
        throw new Error(`Максимальный размер одного файла — ${maxFileSize}мб.`)
      }

      const compressedImage = await compressImage(file)
      await uploadBytes(fileRef, compressedImage)
    } catch (error) {
      toastError(error)
    }
  }

  const deleteFile = async (fileRef: StorageReference) => {
    try {
      await deleteObject(fileRef)
      toast.success('Изображение успешно удалено!')
    } catch (error) {
      toastError(error)
    }
  }

  const getFilesURLs = async (listRef: StorageReference) => {
    const listResult = await listAll(listRef)

    const filesPromises = listResult.items.map(async ({ name, fullPath }) => {
      return {
        url: await getDownloadURL(ref(storage, fullPath)),
        fullPath: fullPath,
        name: name
      }
    })

    return await Promise.all(filesPromises)
  }

  return { uploadFile, deleteFile, getFilesURLs }
}

export default useFirebaseStorage
