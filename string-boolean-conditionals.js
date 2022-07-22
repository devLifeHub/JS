//  *Задание 1
let password = `_-aaa`;
let symbolOne = `-`;
let symbolTwo = `_`;

if (password.length > 4 && (password.includes(symbolOne) || password.includes(symbolTwo))) {
  console.log('Пароль надежный');
} else {
  console.log('Пароль недостаточно надёжный');
}

// *****************************************************
let password = `_-aeeee`;

if (password.length > 4 && (password.includes('-') || password.includes('_'))) {
  console.log('Пароль надежный');
} else {
  console.log('Пароль недостаточно надёжный');
}

//  *Задание 2
let name = "аЛЕКСАНДР";
let surname = "Саскевич";

let firstLetterName = name.substr(0, 1);
let firstLetterSurname = surname.substr(0, 1);

let otherLetterName = name.substr(1);
let otherLetterSurname = surname.substr(1);

let LetterUpperName = firstLetterName.toUpperCase();
let LetterUpperSurname = firstLetterSurname.toUpperCase();
let LetterLowerName = otherLetterName.toLowerCase();
let LetterLowerSurname = otherLetterSurname.toLowerCase();

let transformName = LetterUpperName + LetterLowerName;
let transformSurname = LetterUpperSurname + LetterLowerSurname;

if ((firstLetterName === LetterUpperName && otherLetterName === LetterLowerName) &&
  (firstLetterSurname === LetterUpperSurname && otherLetterSurname === LetterLowerSurname)) {
  console.log('Имя осталось без изменений:' + name);
  console.log('Фамилия осталась без изменений:' + surname);
} else if (firstLetterName === LetterUpperName && otherLetterName === LetterLowerName) {
  console.log('Имя осталось без изменений:' + name);
  console.log('Фамилия было преобразовано:' + transformSurname);
} else if (firstLetterSurname === LetterUpperSurname && otherLetterSurname === LetterLowerSurname) {
  console.log('Имя было преобразовано:' + transformName);
  console.log('Фамилия осталась без изменений:' + surname);
} else {
  console.log('Имя было преобразовано:' + transformName);
  console.log('Фамилия было преобразовано:' + transformSurname);
}

// *****************************************************
let name = "Александр";
let surname = "Саскевич";

let firstLetterName = name.substr(0, 1);
let firstLetterSurname = surname.substr(0, 1);

let otherLetterName = name.substr(1);
let otherLetterSurname = surname.substr(1);

let LetterUpperName = firstLetterName.toUpperCase();
let LetterUpperSurname = firstLetterSurname.toUpperCase();
let LetterLowerName = otherLetterName.toLowerCase();
let LetterLowerSurname = otherLetterSurname.toLowerCase();

let transformName = LetterUpperName + LetterLowerName;
let transformSurname = LetterUpperSurname + LetterLowerSurname;

let xName = (firstLetterName === LetterUpperName && otherLetterName === LetterLowerName);
let xSurname = (firstLetterSurname === LetterUpperSurname && otherLetterSurname === LetterLowerSurname);

let x = xName && xSurname ? (
  console.log('Имя осталось без изменений:' + name),
  console.log('Фамилия осталась без изменений:' + surname)
) : xName ? (
  console.log('Имя осталось без изменений:' + name),
  console.log('Фамилия было преобразовано:' + transformSurname)
) : xSurname ? (
  console.log('Имя было преобразовано:' + transformName),
  console.log('Фамилия осталась без изменений:' + surname)
) : (
  console.log('Имя было преобразовано:' + transformName),
  console.log('Фамилия было преобразовано:' + transformSurname)
);


