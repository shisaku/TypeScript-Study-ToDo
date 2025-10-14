//####################################################
// 画面描画時、イベントを付与
//#####################################################
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-Button");
    if (addButton) {
        addButton.addEventListener("click", () => {
            registerTodo();
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
// 入力されたTODOをローカルストレージに格納
//#####################################################
function registerTodo(): void {
    //----------------------
    // 入力値を取得し、型チェック
    //----------------------
    const inputTodoElement = document.getElementById("todoInput");
    if (!(inputTodoElement instanceof HTMLInputElement)) {
        console.log("input要素が見つかりません。");
        return;
    }
    const inputTodoValue = inputTodoElement.value;
    //----------------------
    // IDを取得し、ローカルストレージに保存（既存のローカルストレージを取得し、入力されたTODOを追加し、ローカルストレージへ保存）。
    // その後入力値を削除
    //----------------------
    const toDoId = generateId();
    const existingTodosJson = localStorage.getItem("todos");
    const existingTodos = existingTodosJson ? JSON.parse(existingTodosJson) : [];
    const todos = { id: toDoId, text: inputTodoValue };
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
