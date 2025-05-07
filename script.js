function createTodoItem(todo) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const label = document.createElement("label");
  label.textContent = todo.title;

  checkbox.addEventListener("change", async () => {
    const updatedTodo = {
      ...todo,
      completed: checkbox.checked,
    };

    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      label.style.textDecoration = checkbox.checked ? "line-through" : "none";
    } catch (error) {
      alert("Failed to update todo");
    }
  });

  label.style.textDecoration = todo.completed ? "line-through" : "none";

  li.appendChild(checkbox);
  li.appendChild(label);
  return li;
}

const todoList = document.getElementById("todoList");
const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTodoTitle = input.value.trim();

  if (newTodoTitle === "") return;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: newTodoTitle,
        completed: false,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const newTodo = await res.json();

    const item = createTodoItem(newTodo);
    todoList.prepend(item);

    input.value = "";
  } catch (error) {
    console.error("POST failed:", error);
  }
});
