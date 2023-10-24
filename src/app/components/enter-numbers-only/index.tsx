const numberAllowDotRegex = /^[0-9.]+$/
export function handleKeyPress({noThereAreCommas = true, e}: any) {
  e = e || window.event
  const charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
  const charStr = String.fromCharCode(charCode)
  const dotInvalid = noThereAreCommas
    ? charStr === '.' && noThereAreCommas
    : e.target.value.includes('.') && charStr === '.'
  ;(dotInvalid || !charStr.match(numberAllowDotRegex)) && e.preventDefault()
}
export function handlePaste({noThereAreCommas = true, e}: any) {
  let valueCopied = e.clipboardData.getData('text/plain')
  const oldValue = +e.target.value
  if (
    Number.isNaN(+valueCopied) ||
    ((oldValue % 1 !== 0 || noThereAreCommas) && +valueCopied % 1 !== 0) ||
    +valueCopied < 0
  )
    e.preventDefault()
}
