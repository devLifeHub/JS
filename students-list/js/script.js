import Student from './Student.js'

// -----------------------------array-----------------------------
const students = []
// -----------------------------get id tbody-----------------------------
const $studentListTable = document.getElementById('studentListTable');
// -----------------------------get id thead cells th-----------------------------
const $studentItemList = document.querySelectorAll('thead th');

let column = 'fullName';
let columnDir = true;
// -----------------------------create string in table students and information-----------------------------
function createItemTable(student) {
   const $containerCells = document.createElement('tr');
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
   $containerCells.append($fullNameCell)
   $containerCells.append($facultyCell)
   $containerCells.append($birthdayCell)
   $containerCells.append($yearsPeriodStudyCell)
   // ------------------------------------------
   return $containerCells;
}
// -----------------------------create copy array and sorting-----------------------------
function getSortStudent(prop, dir) {
   const studentsCopy = [...students]
   return studentsCopy.sort(function (studentA, studentB) {
      if (!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop])
         return -1;
   })
}
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
   })
})
// -----------------------------get id form-----------------------------
const $form = document.getElementById('form-students');
// -----------------------------range date form for submit-----------------------------
(function rangeDate () {
   let today = new Date();
   let yyyy = today.getFullYear();
   let mm = today.getMonth();
   let dd = today.getDate();
   // ------------------------------------------
   if (dd < 10) dd = '0' + dd;
   if (mm < 10) mm = '0' + mm;
   // ------------------------------------------
   today = yyyy+'-'+mm+'-'+dd;
   // ------------------------------------------
   document.getElementById('input-birthday').setAttribute("max", today);
   document.getElementById('input-birthday').setAttribute("min", "1990-01-01");
   document.getElementById('input-yearStartStudy').setAttribute("max", +yyyy);
   document.getElementById('input-yearStartStudy').setAttribute("min", "2000");
})();
// -----------------------------get info with forms and transfer class-----------------------------
$form.addEventListener('submit', function (event) {
   event.preventDefault();
   // ------------------------------------------
   students.push(new Student(
      document.getElementById('input-name').value.trim(),
      document.getElementById('input-surname').value.trim(),
      document.getElementById('input-patronymic').value.trim(),
      new Date(document.getElementById('input-birthday').value),
      Number(document.getElementById('input-yearStartStudy').value),
      document.getElementById('input-faculty').value.trim(),
   ));
   // ------------------------------------------
   render();
   // ------------------------------------------
   $form.reset();
   // ------------------------------------------
   document.getElementById('input-birthday').type = "text";
});

render();
