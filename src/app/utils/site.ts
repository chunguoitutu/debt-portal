import axios from 'axios'
import {DEFAULT_MSG_ERROR} from '../constants'
import {swalToast} from '../swal-notification'
import {FileType, HelperOpenFile} from '../types'

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

export function addMimeType(base64String: string, type: FileType = 'png') {
  const mimeType = `data:application\/${type};base64,`
  const newBase64 = removeMimeType(base64String)

  return `${mimeType}${newBase64}`
}

export function downloadFileFromBase64(base64String: string, fileName: string) {
  try {
    var byteCharacters = atob(base64String)
    var byteNumbers = new Array(byteCharacters.length)
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    var byteArray = new Uint8Array(byteNumbers)

    var blob = new Blob([byteArray], {type: 'application/octet-stream'})

    var url = window.URL.createObjectURL(blob)

    var a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = fileName

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
  } catch (error) {
    console.error('Error:', error)
  }
}

export function formatFileName(fileName: string): string {
  if (fileName.length < 20) return fileName

  return `${fileName.slice(0, 10)}...${fileName.slice(-7)}`
}
