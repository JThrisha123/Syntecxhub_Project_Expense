import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const titleRef = useRef();

  useEffect(() => {
    const mockExpenses = [
      { id: 2, title: "Transport", amount: 20 },
    ];
    setExpenses(mockExpenses);
  }, []);

  const addExpense = useCallback(
    (e) => {
      e.preventDefault();
      if (!title || !amount) return;
      const newExpense = { id: Date.now(), title, amount: parseFloat(amount) };
      setExpenses((prev) => [...prev, newExpense]);
      setTitle("");
      setAmount("");
      titleRef.current.focus();
    },
    [title, amount]
  );

  // Delete expense
  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  }, []);

  const total = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <h2>Total: ${total.toFixed(2)}</h2>

      <form onSubmit={addExpense} className="expense-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          ref={titleRef}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            <span className="expense-title">{exp.title}</span>:{" "}
            <span className="expense-amount">${exp.amount.toFixed(2)}</span>
            <i
              className="fas fa-trash trash-btn"
              onClick={() => deleteExpense(exp.id)}
              title="Delete"
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
