// スケジュールの一覧
var schedules = [];
// フォームと一覧要素への参照を取得
var scheduleForm = document.getElementById("scheduleForm");
var titleInput = document.getElementById("title");
var dateInput = document.getElementById("date");
var descriptionInput = document.getElementById("description");
var scheduleList = document.getElementById("scheduleList");
var errorDisplay = document.getElementById("errorDisplay");
// フォームの送信時の処理
scheduleForm.addEventListener("submit", function (e) {
    e.preventDefault(); // フォームのデフォルト動作を無効化
    var title = titleInput.value.trim();
    var dateString = dateInput.value;
    var description = descriptionInput.value.trim();
    if (title && dateString) {
        var date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            addSchedule(title, date, description);
            titleInput.value = "";
            dateInput.value = "";
            descriptionInput.value = "";
            errorDisplay.style.display = "none";
        }
        else {
            displayError("Invalid date format. Please use YYYY-MM-DD.");
        }
    }
    else {
        displayError("Title and date are required.");
    }
});
// スケジュールを追加する関数
function addSchedule(title, date, description) {
    var newSchedule = {
        id: schedules.length + 1,
        title: title,
        date: date,
        description: description,
    };
    schedules.push(newSchedule);
    displaySchedules();
}
// スケジュールを表示する関数
function displaySchedules() {
    scheduleList.innerHTML = ""; // 一覧をクリア
    for (var _i = 0, schedules_1 = schedules; _i < schedules_1.length; _i++) {
        var schedule = schedules_1[_i];
        var listItem = document.createElement("li");
        listItem.textContent = "Title: ".concat(schedule.title, ", Date: ").concat(schedule.date.toLocaleDateString(), ", Description: ").concat(schedule.description);
        scheduleList.appendChild(listItem);
    }
}
// エラーメッセージを表示する関数
function displayError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
}
// 初期表示
displaySchedules();
