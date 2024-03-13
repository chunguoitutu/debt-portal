import Swal from 'sweetalert2'

export const swalToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  customClass: {
    title: 'fs-4',
  },
})

export const swalConfirm = Swal.mixin({
  icon: 'warning',
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Delete',
  focusCancel: true,
  customClass: {
    htmlContainer: 'fs-14',
    cancelButton: 'btn btn-lg order-0 btn-secondary fs-14 m-0 w-100',
    confirmButton: 'order-1 btn btn-lg btn-danger fs-14 m-0 w-100',
    actions: 'w-100 mt-20px gap-16px',
  },
})

export const swalConfirmCancel = Swal.mixin({
  icon: 'warning',
  buttonsStyling: false,
  showCancelButton: true,
  confirmButtonText: 'Yes',
  cancelButtonText: 'No, return',
  focusCancel: true,
  customClass: {
    htmlContainer: 'fs-3',
    cancelButton: 'btn btn-lg order-0 btn-secondary fs-6',
    confirmButton: 'order-1 btn btn-lg btn-danger fs-6',
    actions: 'w-100',
  },
})
