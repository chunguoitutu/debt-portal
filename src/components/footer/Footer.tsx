/* eslint-disable react/jsx-no-target-blank */
import {useEffect} from 'react'
import {ILayout, useLayout} from '../../_metronic/layout/core'
import clsx from 'clsx'

const Footer = () => {
  const {config} = useLayout()
  useEffect(() => {
    updateDOM(config)
  }, [config])
  return (
    <>
      <div className={clsx(['text-dark order-2 order-md-1'])}>
        <span className='text-muted fw-semibold'>
          Copyright &copy;{new Date().getFullYear().toString()} MC Dynamics Pte Ltd. All Rights
          Reserved
        </span>
      </div>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export {Footer}
