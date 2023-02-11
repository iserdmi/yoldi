import cn from 'classnames'
import merge from 'lodash/merge'
import { useRef, useState } from 'react'
import { Avatar } from '../Avatar'
import { Icon } from '../Icon'
import css from './index.module.scss'
import { clientApi, type User } from '@/api'
import { notify } from '@/utils/notify'

export const UploadAvatar = ({ user }: { user: User }) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  return (
    <Avatar user={user} size="m" className={cn({ [css.uploadAvatar]: true, [css.loading]: loading })}>
      <input
        className={css.fileInput}
        type="file"
        disabled={loading}
        accept="image/*"
        ref={inputEl}
        onChange={({ target: { files } }) => {
          void (async () => {
            setLoading(true)
            try {
              if (files?.length) {
                const file = files[0]
                const uploadResult = await clientApi.uploadImage.fetcher({ file })
                const patchProfileInput = merge({}, { name: user.name, slug: user.slug }, { imageId: uploadResult.id })
                const newProfile = await clientApi.patchProfile.fetcher(patchProfileInput)
                clientApi.getProfile.mutate(newProfile)
                clientApi.getUser.mutate({ slug: user.slug }, newProfile)
              }
            } catch (err: any) {
              console.error(err)
              notify({
                message: err.message,
                type: 'error',
              })
            } finally {
              setLoading(false)
              if (inputEl.current) {
                inputEl.current.value = ''
              }
            }
          })()
        }}
      />
      <button onClick={() => inputEl.current?.click()} className={css.hover}>
        <Icon name="camera" />
      </button>
      <div className={css.loader} />
    </Avatar>
  )
}
