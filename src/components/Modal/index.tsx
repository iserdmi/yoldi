import React, { useEffect } from 'react'
import ReactModal from 'react-modal'
import css from './index.module.scss'

ReactModal.defaultStyles = {}
ReactModal.setAppElement('body')

export const Modal = ({
  onRequestClose,
  children,
  isOpen,
  ...restProps
}: {
  onRequestClose: Function
  children: React.ReactNode
  isOpen: boolean
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <ReactModal {...restProps} isOpen={isOpen} onRequestClose={() => onRequestClose()} shouldFocusAfterRender={false}>
      <div className={css.content}>{children}</div>
    </ReactModal>
  )
}
