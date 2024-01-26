import axios from 'axios'
import {DEFAULT_MSG_ERROR} from '../constants'
import {swalToast} from '../swal-notification'
import {HelperOpenFile} from '../types'

export async function openFileBase64({base64, type}: HelperOpenFile) {
  try {
    const response = await axios.get(`data:application/${type};base64,${base64}`, {
      responseType: 'blob',
    })
    const blobUrl = URL.createObjectURL(response.data)

    window.open(blobUrl, '_blank')
  } catch (error) {
    swalToast.fire({
      icon: 'error',
      title: DEFAULT_MSG_ERROR,
    })
  }
}

export function removeMimeType(base64String: string) {
  const mimeRegex = /^data:application\/(pdf|jpeg|png);base64,/

  if (mimeRegex.test(base64String)) {
    return base64String.replace(mimeRegex, '')
  } else {
    return base64String
  }
}
