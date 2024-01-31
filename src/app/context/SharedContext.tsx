import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {WithChildren} from '../types'

type ShareContextProps = {
  showLoginForm: boolean
  setShowLoginForm: Dispatch<SetStateAction<boolean>>
}

const initShareContextPropsState: ShareContextProps = {
  showLoginForm: false,
  setShowLoginForm: () => {},
}

const ShareContext = createContext<ShareContextProps>(initShareContextPropsState)

const useShared = () => {
  return useContext(ShareContext)
}

const ShareProvider: FC<WithChildren> = ({children}) => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false)

  return (
    <ShareContext.Provider
      value={{
        showLoginForm,
        setShowLoginForm,
      }}
    >
      {children}
    </ShareContext.Provider>
  )
}

export {ShareProvider, useShared}
