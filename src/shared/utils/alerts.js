import Swal from 'sweetalert2'

export const alertSuccess = (title, text = '') =>
  Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  })

export const alertError = (title, text = '') =>
  Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#3b82f6',
  })

export const alertToast = (title) =>
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  })

export const alertConfirm = (title, text = '') =>
  Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
  })
