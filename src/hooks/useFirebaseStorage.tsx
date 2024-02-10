import {
  deleteObject,
  getDownloadURL,
  StorageReference,
  uploadBytes
} from 'firebase/storage'
import { toast } from 'sonner'

import { toastError } from '../toast'
import { FirebaseFile } from '../types/storage'
import { compressImage } from '../utils'

export const useFirebaseStorage = () => {
  const uploadFile = async (
    file: File,
    fileRef: StorageReference,
    maxFileSize: number = 15
  ): Promise<FirebaseFile> => {
    if (file.size / 1024 / 1024 > maxFileSize) {
      throw new Error(`Максимальный размер одного файла — ${maxFileSize}мб.`)
    }

    const compressedImage = await compressImage(file)
    return new Promise((resolve, reject) => {
      uploadBytes(fileRef, compressedImage)
        .then(async ({ metadata: { name, fullPath }, ref }) => {
          const url = await getDownloadURL(ref)
          resolve({ name, fullPath, url })
        })
        .catch((error) => reject(error))
    })
  }

  const deleteFile = async (fileRef: StorageReference) => {
    try {
      await deleteObject(fileRef)
      toast.success('Изображение успешно удалено!')
    } catch (error) {
      toastError(error)
    }
  }

  return { uploadFile, deleteFile }
}
