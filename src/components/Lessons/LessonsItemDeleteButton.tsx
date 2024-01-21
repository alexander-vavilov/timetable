import { FC } from 'react'
import { MdOutlineDelete } from 'react-icons/md'

const LessonsItemDeleteButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="ml-4 rounded-full p-2 hover:bg-red-400/20"
    >
      <MdOutlineDelete size={22} className="text-red-500" />
    </button>
  )
}

export default LessonsItemDeleteButton
