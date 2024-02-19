import React, {Fragment, useEffect, useState} from 'react'
import {useFormik} from 'formik'
import clsx from 'clsx'

import './style.scss'
import {Input} from '@/components/input'
import {CREATE_APPLICATION_PORTAL_CONFIG} from './config'
import TitleContainer from '@/components/title-container.tsx'

const profileBreadCrumbs = {
  title: 'New Application',
  link: [
    {
      to: '/',
      titleLink: 'Home',
    },
  ],
  render: ['New Application'],
}

const NewApplicationPortal = () => {
  // fake data
  const data = [
    {
      fullname: 'Fung Yong Chang',
      identification_no: '1234567890',
    },
  ]

  const {rows} = CREATE_APPLICATION_PORTAL_CONFIG

  const initialValues = {}
  rows.forEach((row) => {
    const {key} = row
    if (data[0].hasOwnProperty(key)) {
      initialValues[key] = data[0][key]
    }
  })

  const [isMobile, setIsMobile] = useState<boolean>(
    document.documentElement.clientWidth < 520 ? true : false
  )

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth
      setIsMobile(clientWidth < 520)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      setIsMobile(true)
    }
  }, [document.documentElement.clientWidth < 520])

  const {values, handleSubmit, handleBlur, handleChange, touched} = useFormik<any>({
    initialValues: initialValues,
    validateOnChange: false,
    onSubmit: () => {},
  })

  return (
    <>
      <TitleContainer data={profileBreadCrumbs} />
      <div className='container pt-20px pt-xxl-40px pt-xl-40px pt-lg-40px pt-md-40px ps-0 pe-0 new-application-portal padding-top-custom'>
        <div className='card mb-20px padding-custom'>
          <div className='p-20px'>
            <h1 className='fs-20 fw-bold text-gray-900  mb-0'>Create New Application</h1>
          </div>
          <div className='d-flex p-20px'>
            <div className='flex-row-fluid'>
              <form className='row gx-20px gy-16px ' onSubmit={handleSubmit}>
                {rows
                  .filter((data) => !!data.infoCreateEdit)
                  .map((row) => {
                    const {infoCreateEdit, name, key} = row
                    const {typeComponent, column, className, columnMobile} = infoCreateEdit || {}

                    const columnClass = isMobile
                      ? `col-${columnMobile || 12}`
                      : `col-${column || 12}`
                    const finalClassName = clsx([columnClass, 'mt-4', className])

                    if (typeComponent === 'input') {
                      return (
                        <div className={finalClassName} key={key}>
                          <Input
                            required={!!infoCreateEdit.required}
                            label={name}
                            onBlur={handleBlur}
                            name={key}
                            value={values[key] || ''}
                            type={infoCreateEdit.type}
                            onChange={handleChange}
                            noThereAreCommas={false}
                            disabled={true}
                            touched={!!touched[key]}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewApplicationPortal
