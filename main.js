//유저가 입력한다
// + 버튼 할일이추가된다
// Delete버튼 할일이 삭제된다
// chk버튼을 누르면 할일에 밑줄, 항리끝남 isCompletet treu 밑줄
//진행준 끝남 탭을누르면 , 언더바가 이동
//끝납탭은, 끝난아이태ㅔㅁ, 진행중은 진행중인 아이템만
//전체탭은 전체 아이탬 나옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});

function addTask() {
  let taskContent = taskInput.value;
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(task);
  render();
}

function render() {
  console.log("render!!!");
  let resultHTML = "";
  console.log(taskList.length);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += ` <div class="task">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`;
    } else {
      resultHTML += ` <div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
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
      taskList.splice(i,1);
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
