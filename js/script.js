showtasks();
document.getElementById("Addbtn").addEventListener("click", () => {
  let x1 = document.getElementById("task-content").value;
  let x2 = document.getElementById("task-date").value;
  let x3 = document.getElementById("task-time").value;
  if (x1 == "") {
    alert("צריך להיות תוכן של המשימה");
  } else if (x2 == "") {
    alert("צריך לבחור תאריך יעד למשימה");
  } else if (x3 == "") {
    alert("צריך לבחור זמן יעד למשימה");
  } else {
    var task = {};
    task["content"] = x1;
    task["date"] = x2;
    task["time"] = x3;
    var arr = localStorage.getItem("Data-ameer");
    if (arr == null) {
      var newArr = [];
      task["id"] = "0";

      newArr.push(task);
      localStorage.setItem("Data-ameer", JSON.stringify(newArr));
      localStorage.setItem("Data-ameer-nextId", "1");
    } else {
      var id = localStorage.getItem("Data-ameer-nextId");
      task["id"] = id;
      localStorage.setItem("Data-ameer-nextId", (parseInt(id) + 1).toString());
      var tasks = JSON.parse(arr);
      tasks.push(task);

      localStorage.setItem("Data-ameer", JSON.stringify(tasks));
    }
    showTask(task, document.getElementById("Note"));
  }
});
function showtasks() {
  var arr = localStorage.getItem("Data-ameer");
  if (arr == null) {
    return;
  }

  var tasks = JSON.parse(arr);
  var place = document.getElementById("Note");
  place.innerHTML = "";
  tasks.forEach((element) => {
    showTask(element, place);
  });
}

function showTask(task, place) {
  let note = document.createElement("li");
  note.className = "not-container";
  let Divnote = document.createElement("div");
  note.appendChild(Divnote);
  Divnote.className = "notediv";
  let closenote = document.createElement("div");
  closenote.className = "noteclose";
  let notid = document.createElement("div");
  notid.textContent = task["id"];
  notid.className = "hidden";
  let notecontent = document.createElement("div");
  notecontent.className = "notecontent";
  notecontent.textContent = task["content"];
  let notedate = document.createElement("div");
  notedate.textContent = task["date"];
  notedate.className = "notedate";
  let notetime = document.createElement("div");
  notetime.textContent = task["time"];
  notetime.className = "notetime";
  Divnote.appendChild(notecontent);
  Divnote.appendChild(notedate);
  Divnote.appendChild(notetime);
  Divnote.appendChild(closenote);
  Divnote.appendChild(notid);
  place.appendChild(note);
  document.getElementById("form-inputs").reset();

  closenote.addEventListener("click", (ev) => {
    var parent = ev.path[0].parentElement;
    var id = -1;
    for (var i = 0; i < parent.childNodes.length; i++) {
      if (parent.childNodes[i].className == "hidden") {
        id = parseInt(parent.childNodes[i].textContent);
        break;
      }
    }
    if (id != -1) {
      var arr = localStorage.getItem("Data-ameer");
      if (arr == null) {
        return;
      }

      var tasks = JSON.parse(arr);
      var idx = -1;
      for (var t = 0; t < tasks.length; t++) {
        if (parseInt(tasks[t]["id"]) == id) {
          idx = t;
          break;
        }
      }
      if (idx != -1) {
        tasks.splice(idx, 1);
      }
      localStorage.setItem("Data-ameer", JSON.stringify(tasks));
    }
    parent = parent.parentElement;
    parent.remove();
  });
}
