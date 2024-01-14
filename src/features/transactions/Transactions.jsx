import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { deposit, withdrawal, transfer, selectBalance } from "../../features/transactions/transactionsSlice"


import "./transactions.scss";

export default function Transactions() {
  const balance = useSelector(selectBalance);
  const dispatch = useDispatch(); 

  const [amountStr, setAmountStr] = useState("0.00");

  const onTransaction = (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.name;
    const amount = +amountStr;

    // Dispatch the appropriate transaction action based on `action`
    switch (action) {
      case "deposit":
        dispatch(deposit({ amount }));
        break;
      case "withdraw":
        dispatch(withdrawal({ amount }));
        break;
      case "transfer":
        dispatch(transfer({ amount }));
        break;
      default:
        // Handle other cases if needed
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input type="text" placeholder="Recipient Name" name="recipient" />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}