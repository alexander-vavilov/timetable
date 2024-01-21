import { QRCodeSVG } from 'qrcode.react'
import { FC, useContext } from 'react'
import { MdOutlineCopyAll } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ThemeContext } from '../../contexts/ThemeContext'
import { IThemeContext } from '../../types/contexts'
import Modal from '../Modal/Modal'
import ModalContent from '../Modal/ModalContent'

const ShareModal: FC = () => {
  const { scheduleId } = useParams()
  const { theme } = useContext(ThemeContext) as IThemeContext

  const scheduleURL = `${window.location.origin}/schedule/${scheduleId}`

  const handleClick = () => {
    navigator.clipboard.writeText(scheduleURL)
    toast.success('Ссылка успешно скопирована.')
  }

  const navigate = useNavigate()
  const handleClose = () => navigate(`/schedule/${scheduleId}`)

  return (
    <Modal
      name="Поделиться расписанием"
      handleClose={handleClose}
      className="w-auto max-w-[300px] sm:max-w-xl"
      variant="mobileCompact"
    >
      <ModalContent className="flex flex-col items-center justify-center">
        <QRCodeSVG
          value={scheduleURL}
          size={160}
          bgColor={theme === 'dark' ? '#fff' : '#e5e7eb'}
          includeMargin
          className="rounded-md"
        />
        <div
          onClick={handleClick}
          className="mt-4 flex max-w-full cursor-pointer items-center gap-2 rounded-md bg-gray-200 p-2 text-black/60 transition-colors hover:text-black dark:bg-neutral-900 dark:text-white/80 hover:dark:text-white"
        >
          <span className="overflow-x-auto whitespace-nowrap">
            {scheduleURL}
          </span>
          <div>
            <MdOutlineCopyAll size={20} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal
