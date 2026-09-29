/**
 * Уменьшает загруженное фото до квадрата size×size (обрезка по центру) и возвращает data URL.
 * Так аватар занимает десятки килобайт и помещается в localStorage.
 */
export function resizeImageFile(file, size = 320) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      const side = Math.min(image.width, image.height)
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      canvas
        .getContext('2d')
        .drawImage(image, (image.width - side) / 2, (image.height - side) / 2, side, side, 0, 0, size, size)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Не удалось прочитать изображение'))
    }

    image.src = url
  })
}
