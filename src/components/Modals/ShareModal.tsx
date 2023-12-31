import { FC, useContext, useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import QRCode from 'qrcode'
import { MdOutlineCopyAll } from 'react-icons/md'
import { ThemeContext } from '../../contexts/ThemeContext'
import { IThemeContext } from '../../types/contexts'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'

const ShareModal: FC = () => {
  const { theme } = useContext(ThemeContext) as IThemeContext
  const { scheduleId } = useParams()

  const [source, setSource] = useState('')
  const scheduleURL = `${window.location.origin}/schedule/${scheduleId}`

  useEffect(() => {
    QRCode.toDataURL(scheduleURL, {
      color: { light: theme === 'dark' ? '#fff' : '#e5e7eb' },
      type: 'image/webp',
      width: 175
    }).then(setSource)
  }, [])

  const handleClick = () => {
    navigator.clipboard.writeText(scheduleURL)
    toast.success('Ссылка успешно скопирована.')
  }

  const navigate = useNavigate()
  const handleClose = () => navigate(`/schedule/${scheduleId}`)

  return (
    <Modal
      name='Поделиться расписанием'
      handleClose={handleClose}
      className='w-auto max-w-[300px] sm:max-w-xl'
      variant='mobileCompact'
    >
      <div className='flex flex-col items-center justify-center overflow-y-auto p-4'>
        <img src={source} className='mb-4 rounded-md' alt='qrcode' />
        <div
          onClick={handleClick}
          className='flex max-w-full cursor-pointer items-center gap-2 rounded-md bg-gray-200 p-2 text-black/60 transition-colors hover:text-black dark:bg-neutral-900 dark:text-white/80 hover:dark:text-white'
        >
          <span className='overflow-x-auto whitespace-nowrap'>
            {scheduleURL}
          </span>
          <div>
            <MdOutlineCopyAll size={20} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
