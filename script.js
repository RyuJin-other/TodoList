let form = document.getElementById("form");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let descriptionInput = document.getElementById("descInput");
let msg = document.getElementById("msg");
let task = document.getElementById("task");
let add = document.getElementById("add");

let data = JSON.parse(localStorage.getItem("data")) || []; // Ambil data dari localStorage jika ada

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (
    titleInput.value === "" ||
    dateInput.value === "" ||
    descriptionInput.value === ""
  ) {
    msg.innerHTML = "Semua field harus diisi";
    msg.style.color = "red";
  } else {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let acceptData = () => {
  data.push({
    text: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  displayData();
};

let displayData = () => {
  task.innerHTML = "";
  data.map((x, y) => {
    return (task.innerHTML += `
        <div class="card mb-2 rounded-3 border-5">
          <div class="card-body" id="${y}">
            <h5 class="card-title fw-bold" id="title">${x.text}</h5>
            <p class="card-subtitle fw-light text-secondary" id="date">${x.date}</p>
            <p class="card-text" id="description">
              ${x.description}
            </p>
            <button type="button" class="btn btn-warning" onclick="editTask(this)">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteTask(this)">Delete</button>
          </div>
        </div>
        `);
  });

  resetForm();
};

let resetForm = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
};

let deleteTask = (e) => {
  let selectedTaskIndex = e.parentElement.parentElement.id;
  data.splice(selectedTaskIndex, 1);
  localStorage.setItem("data", JSON.stringify(data));
  displayData();
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  titleInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  descriptionInput.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
};

// Memanggil displayData() saat halaman dimuat untuk menampilkan data yang sudah ada
displayData();
