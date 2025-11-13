// To-Do List JavaScript
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = '';
  getTasks().forEach((task, idx) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.title = 'Click to delete';
    li.onclick = () => { deleteTask(idx); };
    list.appendChild(li);
  });
}
function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim()) {
    const tasks = getTasks();
    tasks.push(input.value.trim());
    saveTasks(tasks);
    input.value = '';
    renderTasks();
  }
}
function deleteTask(idx) {
  const tasks = getTasks();
  tasks.splice(idx, 1);
  saveTasks(tasks);
  renderTasks();
}

// Product Listing JavaScript
const products = [
  { name: "Phone", category: "Electronics", price: 20000, rating: 4.5 },
  { name: "T-Shirt", category: "Clothing", price: 500, rating: 4 },
  { name: "Laptop", category: "Electronics", price: 60000, rating: 5 },
  { name: "Jeans", category: "Clothing", price: 1200, rating: 3.5 },
];
function renderProducts() {
  const cat = document.getElementById('categoryFilter').value;
  const sort = document.getElementById('sortFilter').value;
  let filtered = cat ? products.filter(p=>p.category==cat) : [...products];
  filtered.sort((a,b)=> sort==='price' ? a.price-b.price : b.rating-a.rating );
  const list = document.getElementById('productList');
  list.innerHTML = filtered.map(p=>
    `<div class="product">${p.name} - ₹${p.price} - Rating: ${p.rating}</div>`
  ).join("");
}

// Event Listeners and Initial Calls
document.getElementById('categoryFilter').onchange = renderProducts;
document.getElementById('sortFilter').onchange = renderProducts;
window.onload = function() {
  renderTasks();
  renderProducts();
};
