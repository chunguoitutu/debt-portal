type Props = {
  title: string
  value: string | number | null
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
  const handleChange = (e: any) => {
    onChange(id, e.target.value as string);
  }

  const renderOptions = () => {
    return datas?.map((row, index) => (
      <option value={row[setValueTitle]} key={index}>
        {row[valueTitle]}
      </option>
    ));
  }

  const renderError = () => {
    return touched && errors && (
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>{errorTitle}</div>
      </div>
    );
  }
  return (
    <div className='row mb-6'>
      <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
        <span>{title}</span>
      </label>
  
      <div className='fv-row'>
        <select
          id={id}
          className='form-select form-select-solid form-select-lg fw-bold'
          value={value || ''}
          onChange={handleChange}
        >
          <option value={''}></option>
          {renderOptions()}
        </select>
        {renderError()}
      </div>
    </div>
  );
}
export default Select
