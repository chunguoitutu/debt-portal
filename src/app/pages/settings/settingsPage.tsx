import React, {FC} from 'react'
import {MenuSetting} from './menuSetting'
import MenuSettingPage from './menuSettingPages'
const SettingPage: FC = () => {
  return (
    <>
      <MenuSetting />
      <MenuSettingPage />
    </>
  )
}

export default SettingPage
