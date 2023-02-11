import cn from 'classnames'
import merge from 'lodash/merge'
import { useRef, useState } from 'react'
import { Button } from '../Button'
import css from './index.module.scss'
import { clientApi, type User } from '@/api'
import { notify } from '@/utils/notify'

export const UploadCover = ({ user }: { user: User }) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div onClick={() => inputEl.current?.click()} className={cn({ [css.uploadCover]: true, [css.loading]: loading })}>
      <Button
        className={css.button}
        leftIconName="upload"
        rightIconName="image"
        type="button"
        loading={loading}
        size="s"
        style="outline"
      >
        Загрузить
      </Button>
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
                const patchProfileInput = merge({}, { name: user.name, slug: user.slug }, { coverId: uploadResult.id })
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
      <div className={css.loader} />
    </div>
  )
}
