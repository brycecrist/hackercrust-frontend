export const ellipsis = (text, length=25) => {
  if (text && text.toString().length > length)
    return `${text.substring(0, length)}...`

  return text
}