import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import {Dispatch, FC, Fragment, SetStateAction} from 'react'
import Select from '../../../../components/select/select'
import {COUNTRY_PHONE_CODE} from '../../../../constants/option'

interface Props {
  config: any
  formData: {[key: string]: string | any[]}
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: string | any[]
    }>
  >
}

const ContactInformation: FC<Props> = ({formData, setFormData, config = []}) => {

  function handleChangeData(e: React.ChangeEvent<any>) {
    const {value, type, checked, name} = e.target

    if (type === 'checkbox') {
      return setFormData({
        ...formData,
        [name]: Array.isArray(formData[name])
          ? formData[name].includes(value)
            ? Array.from(formData[name]).filter((item) => item !== value)
            : [...Array.from(typeof formData[name] === 'string' ? '' : formData[name]), value]
          : checked,
      })
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function renderComponent(item) {
    const {key, data = [], isFullLayout, column} = item
    let Component = item?.component

    // nothing
    if (!Component) return

    if (Component.name === 'Radio') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([formData[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={formData[key] === item.value}
          value={item.value}
          onChange={handleChangeData}
        />
      ))
    }

    if (Component.name === 'Checkbox') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([formData[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={formData[key].includes(item.value)}
          value={item.value}
          onChange={handleChangeData}
        />
      ))
    }

    const className =
      isFullLayout || !column
        ? 'flex-grow-1 w-sm-300px'
        : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    if (Component.name === 'InputAdvance') {
      return (
        <Component
          classShared={className}
          className='w-100'
          name={key}
          value={item.value}
          onChange={handleChangeData}
          insertLeft={
            <Tippy offset={[120, 0]} content='Please choose the phone number you prefer'>
              {/* Wrapper with a span tag to show tooltip */}
              <span>
                <Select
                  onChange={handleChangeData}
                  value={formData.country_phone_code}
                  isOptionDefault={false}
                  classShared='m-0'
                  className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                  name='country_phone_code'
                  options={COUNTRY_PHONE_CODE}
                />
              </span>
            </Tippy>
          }
        />
      )
    }

    return (
      <Component
        value={item.value}
        onChange={handleChangeData}
        name={key}
        classShared={className}
      />
    )
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, isFullLayout, column, isHide} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={`d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8 ${
              isFullLayout || !column ? 'full' : ''
            }`}
            key={i}
          >
            <div className='input-title-application left fs-4 text-start text-lg-end'>{label}</div>

            {renderComponent(item)}
          </div>
        )
      })}
    </>
  )
}

export default ContactInformation
