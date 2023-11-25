import { twMerge } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'
import Compressor from 'compressorjs'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      success: (result) => resolve(result),
      error: (error) => reject(error)
    })
  })
}

export const filesToURLs = (files: File[] | FileList) => {
  return [...files].map((file) => URL.createObjectURL(file))
}
