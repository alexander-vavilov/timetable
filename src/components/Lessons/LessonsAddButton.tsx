import { nanoid } from 'nanoid'
import { FC } from 'react'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const LessonsAddButton: FC<{ date: Date }> = ({ date }) => {
  return (
    <li className="transition-[background,_border-color]">
      <Link
        to={`lesson/${nanoid(28)}?date=${date.getTime()}`}
        className="block px-6 py-2"
      >
        <div className="flex items-center gap-4">
          <MdAdd size={20} />
          <span>Добавить</span>
        </div>
      </Link>
    </li>
  )
}

export default LessonsAddButton
