import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'

import { ScheduleContext } from '../../contexts/ScheduleContext'
import { UserContext } from '../../contexts/UserContext'
import { IScheduleContext, IUserContext } from '../../types/contexts'
import Button from '../Button'

const ScheduleCreateButton: FC = () => {
  const { currentUser } = useContext(UserContext) as IUserContext
  const { isOwner, setIsEditMode } = useContext(
    ScheduleContext
  ) as IScheduleContext

  return isOwner ? (
    <Button onClick={() => setIsEditMode(true)}>Создать</Button>
  ) : (
    <Link to={`/schedule/${currentUser?.uid}`} className="button">
      Создать свое расписание
    </Link>
  )
}

export default ScheduleCreateButton
