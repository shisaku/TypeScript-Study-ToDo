//####################################################
// 画面描画時、イベントを付与
//#####################################################
document.addEventListener("DOMContentLoaded", () => {
    //----------------------
    // todoListのhtmlを生成し、htmlに描画
    //----------------------
    createToDoListHtml();
    //----------------------
    // 追加画面への遷移
    //----------------------
    const transitionToDoAdd = document.getElementById("transition-todo-add");
    if (transitionToDoAdd) {
        transitionToDoAdd.addEventListener("click", () => {
            window.location.href = "/ToDo/todo.html";
        });
    }
    //----------------------
    // 削除処理
    //----------------------
    document.addEventListener("click", e => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("delete-todo")) {
            const deleteId = target.dataset.id;
            if (deleteId) {
                deleteToDo(deleteId);
            }
        }
    });
});
type todoList = { id: string; text: string };
//####################################################
// ローカルストレージに保存されている情報をもとにTo-Doリストを作成
//#####################################################
function createToDoListHtml(): void {
    //----------------------
    // ローカルストレージの値を取得し、todoリストのhtmlを生成
    //----------------------
    const todosJson = localStorage.getItem("todos");
    const todosObj: todoList[] = todosJson ? JSON.parse(todosJson) : [];
    let todoListHtml = "";
    todosObj.forEach(todosObj => {
        todoListHtml += '<li class="todo-item">';
        todoListHtml += `<label for="" class="todo-text">${todosObj.text}</label>`;
        todoListHtml += `<button class="delete-todo" data-id="${todosObj.id}">削除</button>`;
        todoListHtml += "</li>";
    });
    const todoListParent = document.getElementById("todoList");
    if (!todoListParent) return;
    todoListParent.innerHTML = todoListHtml;
}
//####################################################
// 削除処理
//#####################################################
function deleteToDo(deleteId: string): void {
    const todosJson = localStorage.getItem("todos");
    const todosObj: todoList[] = todosJson ? JSON.parse(todosJson) : [];
    const fileteredTodo = todosObj.filter(todo => todo.id !== deleteId);
    localStorage.setItem("todos", JSON.stringify(fileteredTodo));
    createToDoListHtml();
}
