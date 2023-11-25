import { FC } from 'react'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

const LessonsAddButton: FC<{ date: Date }> = ({ date }) => {
  const id = `${new Date().getTime()}_${nanoid(28)}`

  return (
    <li className='transition-[background,_border-color]'>
      <Link
        to={`lesson/${id}?date=${date.getTime()}`}
        className='block px-6 py-2'
      >
        <div className='flex items-center gap-4'>
          <MdAdd size={20} />
          <span>Добавить</span>
        </div>
      </Link>
    </li>
  )
}

export default LessonsAddButton
