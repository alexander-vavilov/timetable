import { FC, useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import QRCode from 'qrcode'
import { MdOutlineCopyAll } from 'react-icons/md'
import { toast } from 'sonner'
import { ThemeContext } from '../contexts/ThemeContext'
import { ThemeContextType } from '../types/contexts'

interface IShareModal {
  handleClose: () => void
}

const ShareModal: FC<IShareModal> = ({ handleClose }) => {
  const [source, setSource] = useState('')
  const url = window.location.href

  const { theme } = useContext(ThemeContext) as ThemeContextType

  useEffect(() => {
    QRCode.toDataURL(url, {
      color: { light: theme === 'dark' ? '#fff' : '#e5e7eb' },
      type: 'image/webp',
      width: 175
    }).then(setSource)
  }, [])

  const handleClick = () => {
    navigator.clipboard.writeText(url)
    toast.success('Ссылка успешно скопирована')
  }

  return (
    <Modal
      name='Поделиться расписанием'
      handleClose={handleClose}
      className='!w-auto !max-w-[300px] sm:!max-w-[700px]'
      mobileFullSize={false}
    >
      <div className='flex flex-col items-center justify-center p-4'>
        <img src={source} alt='qrcode' className='mb-4 rounded-md' />
        <div
          onClick={handleClick}
          className='flex max-w-full cursor-pointer items-center gap-2 rounded-md bg-gray-200 p-2 text-black/60 transition-colors hover:text-black dark:bg-neutral-900 dark:text-white/80 hover:dark:text-white'
        >
          <span className='overflow-x-auto whitespace-nowrap'>{url}</span>
          <div>
            <MdOutlineCopyAll size={20} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
