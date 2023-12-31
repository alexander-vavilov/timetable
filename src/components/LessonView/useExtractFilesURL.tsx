import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '../../../firebase'
import { useParams } from 'react-router-dom'

const useExtractFilesURL = () => {
  const { scheduleId, lessonId } = useParams()

  const extractFilesURL = async () => {
    const filesURLArr: string[] = []

    const listRef = ref(storage, `schedules/${scheduleId}/${lessonId}`)
    const listResult = await listAll(listRef)

    const downloadURLPromises = listResult.items.map((file) => {
      return getDownloadURL(ref(storage, file.fullPath))
    })

    await Promise.all(downloadURLPromises).then((downloadURLs) =>
      filesURLArr.push(...downloadURLs)
    )

    return filesURLArr
  }

  return extractFilesURL
}

export default useExtractFilesURL
