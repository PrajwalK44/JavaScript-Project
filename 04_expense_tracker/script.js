document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmtInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;

  // Initial render of expenses and total amount
  renderExpenses();
  updateTotalDisplay();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmtInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };
      expenses.push(newExpense);
      saveExpenses();
      renderExpenses();
      updateTotal();

      // Clear form inputs
      expenseNameInput.value = "";
      expenseAmtInput.value = "";
      console.log(expenses);
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });

    // Handle delete button clicks
    document.querySelectorAll("button[data-id]").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"), 10);
        expenses = expenses.filter((expense) => expense.id !== id);
        saveExpenses();
        renderExpenses();
        updateTotal();
      });
    });
  }

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    localStorage.setItem("totalAmount", totalAmount);
    updateTotalDisplay();
  }

  function updateTotalDisplay() {
    totalAmountDisplay.textContent = `Total: $${totalAmount.toFixed(2)}`;
  }
});
