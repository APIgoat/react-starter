export const copyclip = (copyText: string) => {
  const textField = document.createElement('textarea')
  textField.innerText = copyText
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}
