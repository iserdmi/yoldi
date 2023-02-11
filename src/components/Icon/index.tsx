import { createElement } from 'react'
import CameraIcon from '@/assets/icons/camera.svg'
import EnvelopeIcon from '@/assets/icons/envelope.svg'
import EyeIcon from '@/assets/icons/eye.svg'
import ImageIcon from '@/assets/icons/image.svg'
import LockIcon from '@/assets/icons/lock.svg'
import PenIcon from '@/assets/icons/pen.svg'
import SignOutIcon from '@/assets/icons/sign-out.svg'
import TrashIcon from '@/assets/icons/trash.svg'
import UploadIcon from '@/assets/icons/upload.svg'
import UserIcon from '@/assets/icons/user.svg'

const icons = {
  user: UserIcon,
  envelope: EnvelopeIcon,
  lock: LockIcon,
  eye: EyeIcon,
  camera: CameraIcon,
  image: ImageIcon,
  pen: PenIcon,
  'sign-out': SignOutIcon,
  trash: TrashIcon,
  upload: UploadIcon,
}

export type IconName = keyof typeof icons

export const Icon = ({ name, ...restProps }: { name: IconName } & React.SVGProps<SVGSVGElement>) => {
  return createElement(icons[name], restProps)
}
