import React from "react";
import { currencyFormatter } from "../../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  noButton,
  onViewExpensesClick,
}) {
  const classNames = [];

  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }
  // className={classNames.join(" ")}
  return (
    <div className="shadow-sm rounded bg-white my-2 p-3">
      <div>
        <div className="flex justify-between ">
          <div className="me-2">{name} </div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max ? (
              <>
                /
                <span className="fs-6 text-muted ms-1">
                  {" "}
                  {currencyFormatter.format(max)}
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* progress bar */}

 

        {max ? (
         <div className="w-full bg-gray-500 rounded-full h-2.5 my-5 dark:bg-gray-700">
            <div
              className={`bg-${getProgressBarVarient(amount,max)}-400 h-2.5 rounded-full`}
              style={{ width: `${(amount/max)*100}%` }}
            ></div>
          </div>
        ) : (
          <></>
        )}

        <div
          direction="horizontal"
          gap="2"
          className="flex space-x-2  justify-end "
        >
          {noButton ? (
            <></>
          ) : (
            <>
              <button
                className = {`outline outline-blue-500 p-1 px-3 rounded `}
                onClick={onAddExpenseClick}
              >
                Add Expense
              </button>{" "}
            </>
          )}
          <button
            variant="outline-secondary"
            className="outline outline-blue-500 p-1 px-3 rounded "
            onClick={onViewExpensesClick}
          >
            View Expense
          </button>
        </div>
      </div>
    </div>
  );
}

const getProgressBarVarient = (amount, max) => {

  const ratio = amount / max
  


  return ratio < 0.5 ? "blue" : ratio < 0.75 ? "yellow" : "red";
};
