// console.log('isValidId', [
//   isValidId(100),
//   isValidId('100'),
//   isValidId('100.500'),
//   isValidId('sdfsf100'),
//   isValidId('dsfsdfsf'),
// ])

export const isValidId = (id: string) => {
  const value = parseInt(id, 10)
  return value.toString() === id && value > 0
}
