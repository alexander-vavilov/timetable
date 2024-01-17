import { useEffect, useState } from 'react'
import useExtractFilesURL from '../../hooks/useExtractFilesURL'
import useUploadFile from '../../hooks/useUploadFile'
import { useParams } from 'react-router-dom'
import { ref } from 'firebase/storage'
import { storage } from '../../../firebase'

const useFiles = () => {
	const [existingFilesURL, setExistingFilesURL] = useState<string[]>([])
	const [unprocessedFiles, setUnprocessedFiles] = useState<File[]>([])

	const { scheduleId, lessonId } = useParams()

	const extractFilesURL = useExtractFilesURL()

	const fetch = () => {
		const listRef = ref(storage, `schedules/${scheduleId}/${lessonId}`)
		extractFilesURL(listRef).then(setExistingFilesURL)
	}

	const { handleUpload } = useUploadFile()

	const processFiles = async () => {
		const uploadedFilesURL: string[] = []

		for (const file of unprocessedFiles) {
			const downloadURL = await handleUpload(file)

			if (typeof downloadURL === 'string') {
				uploadedFilesURL.push(downloadURL)
			}
		}

		fetch()
		setUnprocessedFiles([])
	}

	useEffect(() => {
		fetch()
	}, [])

	return {
		existingFilesURL,
		unprocessedFiles,
		setUnprocessedFiles,
		processFiles,
	}
}

export default useFiles
