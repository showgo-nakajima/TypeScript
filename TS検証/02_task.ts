// スケジュールの型定義
interface Schedule {
  id: number;
  title: string;
  date: Date; // 日付は Date オブジェクトとして保存
  description: string;
}

// スケジュールの一覧
const schedules: Schedule[] = [];

// フォームと一覧要素への参照を取得
const scheduleForm = document.getElementById("scheduleForm") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const scheduleList = document.getElementById("scheduleList") as HTMLUListElement;
const errorDisplay = document.getElementById("errorDisplay") as HTMLDivElement;

// フォームの送信時の処理
scheduleForm.addEventListener("submit", function (e) {
  e.preventDefault(); // フォームのデフォルト動作を無効化

  const title = titleInput.value.trim();
  const dateString = dateInput.value;
  const description = descriptionInput.value.trim();

  if (title && dateString) {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      addSchedule(title, date, description);
      titleInput.value = "";
      dateInput.value = "";
      descriptionInput.value = "";
      errorDisplay.style.display = "none";
    } else {
      displayError("Invalid date format. Please use YYYY-MM-DD.");
    }
  } else {
    displayError("Title and date are required.");
  }
});

// スケジュールを追加する関数
function addSchedule(title: string, date: Date, description: string): void {
  const newSchedule: Schedule = {
    id: schedules.length + 1,
    title,
    date,
    description,
  };
  schedules.push(newSchedule);
  displaySchedules();
}

// スケジュールを表示する関数
function displaySchedules(): void {
  scheduleList.innerHTML = ""; // 一覧をクリア

  for (const schedule of schedules) {
    const listItem = document.createElement("li");
    listItem.textContent = `Title: ${schedule.title}, Date: ${schedule.date.toLocaleDateString()}, Description: ${schedule.description}`;
    scheduleList.appendChild(listItem);
  }
}

// エラーメッセージを表示する関数
function displayError(message: string): void {
  errorDisplay.textContent = message;
  errorDisplay.style.display = "block";
}

// 初期表示
displaySchedules();
