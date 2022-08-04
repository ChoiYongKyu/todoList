//유저가 입력한다
// + 버튼 할일이추가된다
// Delete버튼 할일이 삭제된다
// chk버튼을 누르면 할일에 밑줄, 항리끝남 isCompletet treu 밑줄
//진행준 끝남 탭을누르면 , 언더바가 이동
//끝납탭은, 끝난아이태ㅔㅁ, 진행중은 진행중인 아이템만
//전체탭은 전체 아이탬 나옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
//필터링
function filter(event) {
  //console.log(event.target.id);
  mode = event.target.id;
  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
  underLine.style.top =
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  filterList = [];
  document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
  console.log(filterList);
  console.log(event.target.id, "클릭댐");
}

console.log(tabs);
addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});

function addTask() {
  let taskContent = taskInput.value;
  if (taskContent != "") {
    let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
    };
    taskList.push(task);
    console.log(task);
    render();
    taskInput.value = "";
  } else {
    alert("내용을 입력하세요");
  }
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  console.log(list.length);
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += ` <div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
    } else {
      resultHTML += ` <div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  console.log("삭제하다");
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  //filter();
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
