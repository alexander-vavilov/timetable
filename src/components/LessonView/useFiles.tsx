import { useEffect, useState } from 'react'
import useExtractFilesURL from './useExtractFilesURL'
import useUploadFile from '../../hooks/useUploadFile'

const useFiles = () => {
	const [existingFilesURL, setExistingFilesURL] = useState<string[]>([])
	const [unprocessedFiles, setUnprocessedFiles] = useState<File[]>([])

	const extractFilesURL = useExtractFilesURL()
	const fetch = () => extractFilesURL().then(setExistingFilesURL)

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
