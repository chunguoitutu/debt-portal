import Swal from 'sweetalert2'

export const swalToast = Swal.mixin({
  toast: true,
  position: 'top-right',
  buttonsStyling: false,
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    title: '',
  },
})
