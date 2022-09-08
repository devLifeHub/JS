document.addEventListener("DOMContentLoaded", function () {
   // -----------------------------array-----------------------------
   const students = []
   // -----------------------------check and run LS-----------------------------
   if ((localStorage.getItem("student")) == null) {
      localStorage.setItem('student', JSON.stringify(students));
   } else {
      renderLocalStorageUpdate();
   }

   // -----------------------------get id-----------------------------
   const $table = document.getElementById('table');
   const $studentListTable = document.getElementById('studentListTable');
   const $studentItemList = document.querySelectorAll('thead th');
   const studentHeadingTable = document.getElementById('studentHeadingTable');
   studentHeadingTable.classList.add('table-dark');
   const $form = document.getElementById('form-students');
   // ------------------------------------------
   let column = 'fullName';
   let columnDir = true;

   // -----------------------------buttons switching-----------------------------
   const $btnSearchFullName = document.getElementById('searchFullName');
   const $btnSearchFaculty = document.getElementById('searchFaculty');
   const $btnSearchBirthday = document.getElementById('searchBirthday');
   const $btnSearchYearStartStudy = document.getElementById('searchYearStartStudy');
   const $btnSearchAllStudents = document.getElementById('searchAllStudents');
   // ------------------------------------------
   const $searchInput = document.getElementById('searchInput');
   const $searchBtn = document.getElementById('searchBtn');
   // ------------------------------------------
   const $deleteBtn = document.getElementById('deleteBtn');
   $deleteBtn.classList.add('btn-delete');
   // ------------------------------------------
   const $readyBtn = document.getElementById('readyBtn');

   // -----------------------------buttons switching click-----------------------------
   $btnSearchFullName.addEventListener('click', () => {
      $searchInput.removeAttribute("disabled");
      $searchInput.setAttribute("type", "text");
      $searchInput.removeAttribute("onkeypress");
      $searchInput.setAttribute("id", "searchInputFullName");
      $searchInput.setAttribute("placeholder", "Фамилия студента");
      delBtnReset();
   });
   // ------------------------------------------
   $btnSearchFaculty.addEventListener('click', () => {
      $searchInput.removeAttribute("disabled");
      $searchInput.setAttribute("type", "text");
      $searchInput.removeAttribute("onkeypress");
      $searchInput.setAttribute("id", "searchInputFaculty");
      $searchInput.setAttribute("placeholder", "Факультет");
      delBtnReset();
   });
   // ------------------------------------------
   $btnSearchBirthday.addEventListener('click', () => {
      $searchInput.removeAttribute("disabled");
      $searchInput.setAttribute("onkeypress", "this.value=this.value.substring(0,3);");
      $searchInput.setAttribute("id", "searchInputBirthday");
      $searchInput.setAttribute("type", "number");
      $searchInput.setAttribute("placeholder", "Год рождения");
      delBtnReset();
   });
   // ------------------------------------------
   $btnSearchYearStartStudy.addEventListener('click', () => {
      $searchInput.removeAttribute("disabled");
      $searchInput.setAttribute("type", "number");
      $searchInput.setAttribute("onkeypress", "this.value=this.value.substring(0,3);");
      $searchInput.setAttribute("id", "searchInputYearStartStudy");
      $searchInput.setAttribute("placeholder", "Год начала обучения");
      delBtnReset();
   });
   // ------------------------------------------
   $btnSearchAllStudents.addEventListener('click', () => {
      $searchInput.setAttribute("placeholder", "Все студенты");
      $searchInput.setAttribute("id", "searchInput");
      $searchInput.removeAttribute("onkeypress");
      $searchInput.setAttribute("disabled", "true");
      $searchBtn.setAttribute("disabled", "true");
      delBtnReset();
   });

   // -----------------------------search input disabled length = 0-----------------------------
   $searchInput.addEventListener('input', function () {
      if ($searchInput.value.length > 0) {
         $searchBtn.removeAttribute("disabled");
      } else if ($searchInput.value.length == 0) {
         $searchBtn.setAttribute("disabled", "true");
      }
   });

   // -----------------------------reset btn delete-----------------------------
   function delBtnReset() {
      $searchInput.value = "";
      // ------------------------------------------
      $studentListTable.classList.add('cur-default');
      $studentListTable.classList.remove('cur-pointer');
      // ------------------------------------------
      $table.classList.remove('table-hover');
      // ------------------------------------------
      $readyBtn.classList.remove('btn-ready');
      // ------------------------------------------
      $deleteBtn.classList.remove('active');
      $deleteBtn.innerHTML = "Удалить студента по нажатию";
      // ------------------------------------------
      $form.reset();
      // ------------------------------------------
      render();
   }

   // -----------------------------function LS render when updating-----------------------------
   function renderLocalStorageUpdate() {
      // ------------------------------------------
      let arrayLocStge = JSON.parse(localStorage.getItem("student"));
      // ------------------------------------------
      for (const stud of arrayLocStge) {
         const studName = stud.name;
         const studSurname = stud.surname;
         const studPatronymic = stud.patronymic;
         const studBirthday = new Date(stud.birthday);
         const studYearStartStudy = Number(stud.yearStartStudy);
         const studFaculty = stud.faculty;
         const id = stud.id;
         // ------------------------------------------
         students.push(new Student(studName, studSurname, studPatronymic, studBirthday, studYearStartStudy, studFaculty, id));
      }
   };

   let $containerCells;
   // -----------------------------create string in table students and information-----------------------------
   function createItemTable(student) {
      $containerCells = document.createElement('tr');
      $containerCells.setAttribute("id", student.id);
      $containerCells.classList.add('table-secondary');
      $containerCells.classList.add('line');
      // ------------------------------------------
      const $fullNameCell = document.createElement('td');
      $fullNameCell.classList.add('text-ac');
      const $birthdayCell = document.createElement('td');
      $birthdayCell.classList.add('text-ac');
      const $yearsPeriodStudyCell = document.createElement('td');
      $yearsPeriodStudyCell.classList.add('text-ac');
      const $facultyCell = document.createElement('td');
      $facultyCell.classList.add('text-ac');
      // ------------------------------------------
      $fullNameCell.innerHTML = student.fullName;
      $birthdayCell.innerHTML = student.getBirthdayString() + ' ( ' + student.getAge() + ')';
      $yearsPeriodStudyCell.innerHTML = student.yearStartStudy + '-' + student.getPeriodStudy();
      $facultyCell.innerHTML = student.faculty;
      // ------------------------------------------
      $containerCells.append($fullNameCell);
      $containerCells.append($facultyCell);
      $containerCells.append($birthdayCell);
      $containerCells.append($yearsPeriodStudyCell);
      // ------------------------------------------
      deleteStudent(student);
      // ------------------------------------------
      return $containerCells;
   }

   // -----------------------------function work with table and LS-----------------------------
   function deleteStudent(student) {
      // -----------------------------when click remove item table-----------------------------
      $containerCells.addEventListener('click', function () {
         if ($deleteBtn.matches('button.active')) {
            // ------------------------------------------
            let getLineTable = document.querySelectorAll('.line');
            // ------------------------------------------
            getLineTable.forEach(e => (student.id == e.id) ? e.classList.add('table-danger') : 0);
            // ------------------------------------------
            window.setTimeout(deleteItemStudent, 100);
            // ------------------------------------------
            function deleteItemStudent() {
               if (confirm("Вы уверены?")) {
                  // ------------------------------------------
                  getLineTable.forEach(e => (student.id == e.id) ? e.remove() : 0);
                  // -----------------------------clean array, filter LS, save LS-----------------------------
                  let arrayLocStge = JSON.parse(localStorage.getItem("student"));
                  // ------------------------------------------
                  const newArray = arrayLocStge.filter((object) => object.id !== student.id);
                  // ------------------------------------------
                  localStorage.setItem("student", JSON.stringify(newArray));
                  // ------------------------------------------
                  students.splice(0, students.length);
                  // ------------------------------------------
                  for (const stud of newArray) {
                     const studName = stud.name;
                     const studSurname = stud.surname;
                     const studPatronymic = stud.patronymic;
                     const studBirthday = new Date(stud.birthday);
                     const studYearStartStudy = Number(stud.yearStartStudy);
                     const studFaculty = stud.faculty;
                     const id = stud.id;
                     // ------------------------------------------
                     students.push(new Student(studName, studSurname, studPatronymic, studBirthday, studYearStartStudy, studFaculty, id));
                  }
               } else {
                  getLineTable.forEach(e => (student.id == e.id) ? e.classList.remove('table-danger') : 0);
               }
            }
         }
      });
   }

   // -----------------------------button remove/add (active)-----------------------------
   $deleteBtn.addEventListener('click', function () {
      // ------------------------------------------
      $form.reset();
      // ------------------------------------------
      $searchInput.value = "";
      // ------------------------------------------
      $deleteBtn.classList.toggle('active');
      // ------------------------------------------
      if ($deleteBtn.matches('button.active')) {
         // ------------------------------------------
         $studentListTable.classList.remove('cur-default');
         $studentListTable.classList.add('cur-pointer');
         // ------------------------------------------
         $readyBtn.classList.add('btn-ready');
         $table.classList.add('table-hover');
         // ------------------------------------------
         $deleteBtn.innerHTML = "Удалить всех";
         // ------------------------------------------
      } else {
         // ------------------------------------------
         students.splice(0, students.length);
         // ------------------------------------------
         localStorage.setItem("student", JSON.stringify(students));
         // ------------------------------------------
         delBtnReset();
      }
   });

   // -----------------------------button ready-----------------------------
   $readyBtn.addEventListener('click', () => {
      delBtnReset();
   });

   // -----------------------------create copy array and sorting-----------------------------
   function getSortStudent(prop, dir) {
      // ------------------------------------------
      const studentsCopy = [...students]
      // ------------------------------------------
      return studentsCopy.sort(function (studentA, studentB) {
         if (!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]) return -1;
      });
   }

   // --------------------------search on criterion, create elements no search-------------------------------
   $searchBtn.addEventListener('click', function () {
      // ------------------------------------------
      let studentsCopy = [...students]
      // ------------------------------------------
      const searchStudents = (name) => {
         if (studentsCopy.length > 0) {
            $studentListTable.innerHTML = ' ';
            // ------------------------------------------
            for (const student of studentsCopy) {
               $studentListTable.append(createItemTable(student));
            }
         } else if (studentsCopy.length == 0) {
            $studentListTable.innerHTML = ' ';
            const textSearch = document.createElement('h6');
            const textSearchCell = document.createElement('td');
            textSearchCell.setAttribute("colspan", "4")
            textSearch.classList.add('text-search');
            textSearch.textContent = name;
            textSearchCell.append(textSearch);
            $studentListTable.append(textSearchCell);
         }
      }

      // --------------------------if no search - notice-------------------------------
      (function renderFilter() {
         $searchInput.value = $searchInput.value[0] != $searchInput.value[0].toUpperCase() ? $searchInput.value[0].toUpperCase() + $searchInput.value.slice(1) : $searchInput.value[0] + $searchInput.value.slice(1);
         if (document.getElementById('searchInputFullName')) {
            studentsCopy = studentsCopy.filter(student => student.surname == $searchInput.value);
            searchStudents("Студент не найден");
            // ------------------------------------------
         } else if (document.getElementById('searchInputFaculty')) {
            studentsCopy = studentsCopy.filter(student => student.faculty == $searchInput.value);
            searchStudents("Факультет не найден");
            // ------------------------------------------
         } else if (document.getElementById('searchInputBirthday')) {
            studentsCopy = studentsCopy.filter(student => student.birthday.getFullYear() == $searchInput.value);
            searchStudents("Год рождения не найден");
            // ------------------------------------------
         } else if (document.getElementById('searchInputYearStartStudy')) {
            studentsCopy = studentsCopy.filter(student => student.yearStartStudy == $searchInput.value);
            $studentListTable.innerHTML = ' ';
            for (const student of studentsCopy) {
               $studentListTable.append(createItemTable(student));
            }
         }
      })();
   });

   // -----------------------------rendering-----------------------------
   function render() {
      let studentsCopy = [...students]
      // ------------------------------------------
      studentsCopy = getSortStudent(column, columnDir);
      // ------------------------------------------
      $studentListTable.innerHTML = ' ';
      // ------------------------------------------
      for (const student of studentsCopy) {
         $studentListTable.append(createItemTable(student));
      }
   }

   // -----------------------------click changes direction-----------------------------
   $studentItemList.forEach(e => {
      e.addEventListener('click', function () {
         // ------------------------------------------
         column = this.dataset.column;
         columnDir = !columnDir;
         // ------------------------------------------
         render();
      });
   });

   // -----------------------------range date form for submit-----------------------------
   (function rangeDate() {
      let today = new Date();
      let yyyy = today.getFullYear();
      let mm = today.getMonth();
      let dd = today.getDate();
      // ------------------------------------------
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      // ------------------------------------------
      today = yyyy + '-' + mm + '-' + dd;
      // ------------------------------------------
      document.getElementById('input-birthday').setAttribute("max", today);
      document.getElementById('input-birthday').setAttribute("min", "1990-01-01");
      document.getElementById('input-yearStartStudy').setAttribute("max", +yyyy);
      document.getElementById('input-yearStartStudy').setAttribute("min", "2000");
   })();

   // -----------------------------get info with forms and transfer class-----------------------------
   $form.addEventListener('submit', function (event) {
      // ------------------------------------------
      event.preventDefault();
      // ------------------------------------------
      let inputName = document.getElementById('input-name').value.trim();
      inputName = inputName[0] != inputName[0].toUpperCase() ? inputName[0].toUpperCase() + inputName.slice(1) : inputName[0] + inputName.slice(1);
      let inputSurname = document.getElementById('input-surname').value.trim();
      inputSurname = inputSurname[0] != inputSurname[0].toUpperCase() ? inputSurname[0].toUpperCase() + inputSurname.slice(1) : inputSurname[0] + inputSurname.slice(1);
      let inputPatronymic = document.getElementById('input-patronymic').value.trim();
      inputPatronymic = inputPatronymic[0] != inputPatronymic[0].toUpperCase() ? inputPatronymic[0].toUpperCase() + inputPatronymic.slice(1) : inputPatronymic[0] + inputPatronymic.slice(1);
      let inputBirthday = new Date(document.getElementById('input-birthday').value);
      let inputYearStartStudy = Number(document.getElementById('input-yearStartStudy').value);
      let inputFaculty = document.getElementById('input-faculty').value.trim();
      inputFaculty = inputFaculty[0] != inputFaculty[0].toUpperCase() ? inputFaculty[0].toUpperCase() + inputFaculty.slice(1) : inputFaculty[0] + inputFaculty.slice(1);
      // ------------------------------------------
      let id = Math.random() * 34.67;
      id = id.toFixed(2);
      // ------------------------------------------
      students.push(new Student(inputName, inputSurname, inputPatronymic, inputBirthday, inputYearStartStudy, inputFaculty, id));
      // ------------------------------------------
      localStorage.setItem('student', JSON.stringify(students));
      // ------------------------------------------
      render();
      // ------------------------------------------
      $form.reset();
      // ------------------------------------------
      document.getElementById('input-birthday').type = "text";
   });

   render();
});