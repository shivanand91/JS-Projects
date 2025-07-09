document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseName = document.getElementById("expense-name");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let total = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = expenseName.value.trim();
        const amount = parseFloat(expenseAmount.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            }

            expenses.push(newExpense);
            saveExpensesToLocal();
            updateTotal();
            renderExpenses();
            expenseName.value = "";
            expenseAmount.value = "";
        }

    });

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
            li.setAttribute("data-id", expense.id);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                expenses = expenses.filter(e => e.id !== expense.id);
                saveExpensesToLocal();
                updateTotal();
                renderExpenses();
            });

            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    };

    function saveExpensesToLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal() {
        total = calculateTotal();
        totalAmount.textContent = total.toFixed(2);
    }

})