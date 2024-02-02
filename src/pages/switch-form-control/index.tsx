import {TableRow} from '@/app/types'
import {FormikProps} from 'formik'
import {FC, Fragment} from 'react'
import Select from './../../components/select/Select'
import clsx from 'clsx'
import {TextArea} from '@/components/textarea'
import Tippy from '@tippyjs/react'
import {Input} from '@/components/input'
import {CheckboxRounded} from '@/components/checkbox'
import {COUNTRY_PHONE_CODE} from '@/app/utils'

type Props = {
  row: TableRow
  formik: FormikProps<any>
  dataOption?: {[key: string]: any}
}

const SwitchFormControl: FC<Props> = ({row, dataOption, formik}) => {
  const {values, errors, touched, handleChange, handleBlur} = formik

  function renderComponent() {
    const {infoCreateEdit, name, key} = row
    const {
      type,
      required,
      typeComponent,
      column,
      className,
      subTextWhenChecked,
      subTextWhenNoChecked,
      keyLabelOption,
      keyValueOption,
      options,
    } = infoCreateEdit || {}

    switch (typeComponent) {
      case 'checkbox-rounded':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <CheckboxRounded
              key={key}
              name={key}
              label={name}
              checked={!!values[key]}
              onChange={handleChange}
              subTextWhenChecked={subTextWhenChecked}
              subTextWhenNoChecked={subTextWhenNoChecked}
              id={key}
            />
          </div>
        )
      case 'input':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <Input
              id={name}
              required={!!required}
              label={name}
              onBlur={handleBlur}
              name={key}
              value={values[key]}
              type={type}
              onChange={handleChange}
              error={errors[key] as string}
              touched={!!touched[key]}
              noThereAreCommas={false}
              autoComplete='new-password'
              insertLeft={
                type === 'phone' ? (
                  <Tippy
                    offset={[120, 0]}
                    content='Please choose the phone number you prefer'
                    disabled
                  >
                    {/* Wrapper with a span tag to show tooltip */}
                    <span>
                      <Select
                        isOptionDefault={false}
                        classShared='m-0'
                        className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                        name='country_phone_code'
                        options={COUNTRY_PHONE_CODE}
                        disabled={true}
                      />
                    </span>
                  </Tippy>
                ) : undefined
              }
            />
          </div>
        )
      case 'textarea':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <TextArea
              label={name}
              name={key}
              onBlur={handleBlur}
              value={values[key] || ''}
              onChange={handleChange}
              error={errors[key] as string}
              touched={!!touched[key]}
            />
          </div>
        )
      case 'select':
        return (
          <div className={clsx([`col-${column || 12}`, className])} key={key}>
            <Select
              required={required}
              label={name}
              name={key}
              value={values[key] || ''}
              onBlur={handleBlur}
              onChange={handleChange}
              keyLabelOption={keyLabelOption || 'label'}
              keyValueOption={keyValueOption || dataOption?.[key] ? 'id' : 'value'}
              error={errors[key] as string}
              touched={!!touched[key]}
              classShared=''
              options={dataOption?.[key] || options || []}
            />
          </div>
        )
      default:
        return <Fragment key={key}></Fragment>
    }
  }
  return <>{renderComponent()}</>
}

export default SwitchFormControl
