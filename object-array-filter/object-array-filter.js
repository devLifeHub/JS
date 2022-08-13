let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' },
  { name: 'Пётр', surname: 'Иван' },
  { name: 'Иван', surname: 'Иванов' },
];

function filter(objects, property, value) {
  let filterNameResult = [];
  for (let object of objects) {
    if (object[property] == value) {
      filterNameResult.push(object);
    }
  }
  return filterNameResult;
}

let result = filter(objects, 'name', 'Иван');
console.log(result);

