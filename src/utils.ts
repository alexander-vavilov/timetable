import { ClassValue, clsx } from 'clsx'
import Compressor from 'compressorjs'
import { twMerge } from 'tailwind-merge'

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
