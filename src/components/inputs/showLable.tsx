export const showLable = ({title, value}: any) => {
  return (
    <div>
      <div className='fv-row mb-8'>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2' htmlFor={title}>
          <span>{title}</span>
        </label>
        <input value={value} className='form-control form-control-lg form-control-solid' />
      </div>
    </div>
  )
}
