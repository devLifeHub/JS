// --------------------------------------class Student--------------------------------------
class Student {
   constructor(name, surname, patronymic, birthday, yearStartStudy, faculty, id) {
      this.name = name
      this.surname = surname
      this.patronymic = patronymic
      this.birthday = birthday
      this.yearStartStudy = yearStartStudy
      this.faculty = faculty
      this.id = id
   }

   // --------------transfer order to table full name
   get fullName() {
      return this.surname + ' ' + this.name + ' ' + this.patronymic
   }

   // --------------format date dd.mm.yyyy (birthday)--------------
   getBirthdayString() {
      const yyyy = this.birthday.getFullYear();
      let mm = this.birthday.getMonth() + 1;
      let dd = this.birthday.getDate();
      // ------------------------------------------
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      // ------------------------------------------
      return dd + '.' + mm + '.' + yyyy;
   }

   // --------------calculate from the current date, how many age student--------------
   getAge() {
      const today = new Date();
      let age = today.getFullYear() - this.birthday.getFullYear();
      let month = today.getMonth() - this.birthday.getMonth();
      // ------------------------------------------
      if (month < 0 || (month === 0 && today.getDate() < this.birthday.getDate())) {
         age--;
      }
      // ------------------------------------------
      if (age == 1 || age == 21) {
         return age + ' год ';
      } else if (age == 2 || age == 3 || age == 4 || age == 22 || age == 23 || age == 24) {
         return age + ' года ';
      } else {
         return age + ' лет ';
      }
   }

   // --------------calculate from the current date, the period of study and the course--------------
   getPeriodStudy() {
      const currentTime = new Date();
      const correctionDate = new Date();
      correctionDate.setMonth(correctionDate.getMonth() + 4);
      // ------------------------------------------
      if ((correctionDate.getFullYear() - this.yearStartStudy) > 4) {
         return this.yearStartStudy + 4 + ' ' + 'Закончил(а)';
      } else {
         return currentTime.getFullYear() + ' ( ' + (currentTime.getFullYear() - this.yearStartStudy) + ' курс )'
      }
   }
}

