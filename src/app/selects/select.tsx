type Props = {
  title: string
  value: string
  onChange: (id: string, value: string) => void
  datas: any[]
  errors?: any
  errorTitle?: any
  touched?: any
  id: string
  valueTitle: string
  setValueTitle: string
}

const Select = ({
  title,
  onChange,
  value,
  datas,
  touched,
  errorTitle,
  errors,
  id,
  valueTitle,
  setValueTitle,
}: Props) => {
  const handleChange = (event) => {
    onChange(id, event.target.value as string)
  }

  return (
    <div className='row mb-6'>
      <label className='col-lg-4 col-form-label fw-bold fs-6'>
        <span className='required'>{title}</span>
      </label>

      <div className=' fv-row'>
        <select
          id={id}
          className='form-select form-select-solid form-select-lg fw-bold'
          value={value}
          onChange={handleChange}
        >
          <option value={''}></option>
          {datas?.map((row, index) => (
            <option value={row[`${setValueTitle}`]} key={index}>
              {row[`${valueTitle}`]}
            </option>
          ))}
        </select>
        {touched && errors && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>{errorTitle}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Select
