import Swal from 'sweetalert2'

export const swalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    title: 'fs-4',
  },
})

export const swalConfirmDelete = Swal.mixin({
  icon: 'warning',
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Delete',
  focusCancel: true,
  customClass: {
    htmlContainer: 'fs-3',
    cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
    confirmButton: 'order-1 fs-5 btn btn-lg btn-danger m-8px',
    actions: 'd-flex justify-content-center w-100 ',
  },
})
