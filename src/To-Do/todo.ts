// リテラル型
type Priority = "high" | "medium" | "low";
//####################################################
// 画面描画時、イベントを付与
//#####################################################
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-Button");
    if (addButton) {
        addButton.addEventListener("click", () => {
            const inputTodoElement = document.getElementById("todoInput");
            const prioritySelect = document.getElementById("prioritySelect");
            if (!(inputTodoElement instanceof HTMLInputElement) || !(prioritySelect instanceof HTMLSelectElement)) {
                console.log("input要素が見つかりません。");
                return;
            }
            const inputTodoValue = inputTodoElement.value;
            const prioritySelectValue = prioritySelect.value;
            if (isPriority(prioritySelectValue)) {
                registerTodo(inputTodoValue, prioritySelectValue);
            }
        });
    }
    const backButton = document.getElementById("back-Button");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "/ToDo/todolist.html";
        });
    }
});
//####################################################
// 優先度の入力値をチェック
//#####################################################
function isPriority(value: string): value is Priority {
    return value === "high" || value === "medium" || value === "low";
}
//####################################################
// 入力されたTODOをローカルストレージに格納
//#####################################################
function registerTodo(inputTodo: string, priority: Priority): void {
    //----------------------
    // IDを取得し、ローカルストレージに保存（既存のローカルストレージを取得し、入力されたTODOを追加し、ローカルストレージへ保存）。
    // その後入力値を削除
    //----------------------
    const toDoId = generateId();
    const existingTodosJson = localStorage.getItem("todos");
    const existingTodos = existingTodosJson ? JSON.parse(existingTodosJson) : [];
    const todos = { id: toDoId, text: inputTodo, priority: priority };
    existingTodos.push(todos);
    localStorage.setItem("todos", JSON.stringify(existingTodos));
    deleteInputTodo();
}
//####################################################
// IDをランダム生成
// @returns ID
//#####################################################
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

//####################################################
// 入力値の削除
//#####################################################
function deleteInputTodo(): void {
    const inputTodoElement = document.getElementById("todoInput");
    if (inputTodoElement instanceof HTMLInputElement) {
        inputTodoElement.value = "";
        return;
    }
}
