import Compressor from 'compressorjs'
import { CollectionReference, deleteDoc, getDocs } from 'firebase/firestore'
import { getDownloadURL, StorageReference, uploadBytes } from 'firebase/storage'

import { FirebaseFile } from '../types/storage'

const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      success: (result) => resolve(result),
      error: (error) => reject(error)
    })
  })
}

export const useFirebase = () => {
  // firestore

  const deleteCollection = async (ref: CollectionReference) => {
    const collectionSnap = await getDocs(ref)
    collectionSnap.docs.forEach(async (doc) => await deleteDoc(doc.ref))
  }

  // storage

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

  return { deleteCollection, uploadFile }
}
