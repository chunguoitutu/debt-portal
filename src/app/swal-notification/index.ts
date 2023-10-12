import Swal from 'sweetalert2'

export const swalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    title: 'fs-3',
  },
})

export const swalConfirmDelete = Swal.mixin({
  icon: 'warning',
  showCancelButton: true,
  buttonsStyling: false,
  confirmButtonText: 'Delete',
  focusCancel: true,
  customClass: {
    htmlContainer: 'fs-3',
    cancelButton: 'btn btn-light btn-active-light-primary',
    confirmButton: 'btn btn-danger',
    actions: 'd-flex justify-content-end w-100',
  },
})
