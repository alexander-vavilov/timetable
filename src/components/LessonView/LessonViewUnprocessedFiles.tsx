import { Dispatch, FC, SetStateAction } from 'react'
import LessonViewUnprocessedFile from './LessonViewUnprocessedFile'

interface LessonViewUnprocessedFilesProps {
	files: File[] | FileList
	setUnprocessedFiles: Dispatch<SetStateAction<File[]>>
}

const LessonViewUnprocessedFiles: FC<LessonViewUnprocessedFilesProps> = ({
	files,
	setUnprocessedFiles,
}) => {
	const handleDelete = (index: number) => {
		const filteredFiles = [...files].filter((_, idx) => index !== idx)
		setUnprocessedFiles(filteredFiles)
	}

	return (
		<div className='flex flex-wrap items-center gap-2 border-b border-neutral-700 pb-4'>
			{[...files].map((file, index) => {
				return (
					<LessonViewUnprocessedFile
						key={file.name}
						file={file}
						handleDelete={() => handleDelete(index)}
					/>
				)
			})}
		</div>
	)
}

export default LessonViewUnprocessedFiles
