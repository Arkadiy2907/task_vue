export const getTextCards = arr => {
  if (!Array.isArray(arr)) {
    console.log('не массив');
    return;
  }
  arr.forEach((el) => {
    if (el.address !== '') {
      el.address;
    } else {
      el.address = '10-й проезд 7-го выезда';
    }
    if (el.landmark !== '') {
      el.landmark;
    } else {
      el.landmark = 'дерево такое и памятник мужик сидячий';
    }
    if (el.cuisine !== '') {
      el.cuisine;
    } else {
      el.cuisine = 'мишленовская от Ашота Мишленованяна';
    }
    if (el.distance) {
      el.distance;
    } else {
      el.distance = 'тут несколько ';
      el.time = 'меньше нескольких';
    }

    if (el.business_lunch) {
      el.business_lunch = 'да есть';
    } else {
      el.business_lunch = 'пока нет';
      el.price = 'не купить за ';
    }
  });
}

export const getRundomPost = (arr = null) => {
  const id = Math.floor(Math.random() * arr.length);
  const rundomPost = arr && arr.find((post) => post.id === id);
  return rundomPost;
};

export const sendSelectedCard = (arr, id) => {
  const selectedPost = arr.find(
    (post) => post.id === id
  );
  if (selectedPost === undefined) {
    console.log('карта не выбрана');
    return;
  }
  const email = 'example@example.com';
  const subject = 'Выбранный объект';
  const body = `Название кафе: ${selectedPost?.name}; Адрес: ${selectedPost?.address};`;
  const mailto_link = `mailto:${email}?subject=${subject}&body=${body}`;
  console.log(mailto_link);
  // window.open(mailto_link, 'emailWindow');
}