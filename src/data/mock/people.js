/** Заказчики и авторы отзывов, которых нет среди зарегистрированных пользователей */
const avatar = (gender, id) => `https://randomuser.me/api/portraits/${gender}/${id}.jpg`

export const PEOPLE = [
  { name: 'Никита Евреев', avatar: avatar('men', 12) },
  { name: 'Алия Нурланова', avatar: avatar('women', 29) },
  { name: 'Тимур Жаксыбеков', avatar: avatar('men', 36) },
  { name: 'Дарина Ким', avatar: avatar('women', 47) },
  { name: 'Руслан Абдуллаев', avatar: avatar('men', 55) },
  { name: 'Екатерина Иванова', avatar: avatar('women', 17) },
  { name: 'Максим Орлов', avatar: avatar('men', 61) },
  { name: 'Жанна Сейтказы', avatar: avatar('women', 58) },
  { name: 'Арман Бекмухамедов', avatar: avatar('men', 83) },
  { name: 'Ольга Власова', avatar: avatar('women', 72) },
  { name: 'Ильяс Мухамеджанов', avatar: avatar('men', 91) },
  { name: 'Сабина Ахметова', avatar: avatar('women', 85) },
]
