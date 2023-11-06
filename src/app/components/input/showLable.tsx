export const showLable = ({title, value}: any) => {
  return (
    <div>
      <div className='fv-row mb-8'>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
          <span>{title}</span>
        </label>
        <label className='form-control form-control-lg '>{value}</label>
      </div>
    </div>
  )
}
