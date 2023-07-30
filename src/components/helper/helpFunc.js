export const getTextCards = arr => {
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