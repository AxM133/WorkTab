const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed leo at hendrerit dictum diam, enim. Dolor in imperdiet ultrices mauris. Est vitae vulputate est nec cras. Turpis nunc ornare nulla neque, interdum. At pharetra consectetur nec est convallis.'

const avatar = (gender, id) => `https://randomuser.me/api/portraits/${gender}/${id}.jpg`

export const ACTUAL_WORKS = [
  {
    id: '1',
    title: 'Сделать дизайн интернет-магазина',
    description: LOREM,
    author: { id: 'u1', name: 'Артём Ким', avatar: avatar('men', 32) },
  },
  {
    id: '2',
    title: 'Верстка landing page',
    description: LOREM,
    author: { id: 'u2', name: 'Алина Смирнова', avatar: avatar('women', 65) },
  },
  {
    id: '3',
    title: 'Сделать дизайн сайта-каталога и посадить на какой нибудь конструктор',
    description: LOREM,
    author: { id: 'u3', name: 'Данияр Ахметов', avatar: avatar('men', 75) },
  },
  {
    id: '4',
    title: 'Продвижение instagram',
    description: LOREM,
    author: { id: 'u4', name: 'Олег Петров', avatar: avatar('men', 52) },
  },
  {
    id: '5',
    title: 'Срочно! Нужен веб дизайнер!',
    description: LOREM,
    author: { id: 'u5', name: 'Мария Лим', avatar: avatar('women', 21) },
  },
]
