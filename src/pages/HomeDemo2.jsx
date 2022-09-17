import React, { useRef } from "react";
import { useCollection } from "../hooks/useCollection";
import useFireStore from "../hooks/useFireStore";

export default function HomeDemo() {
  const nameRef = useRef();
  const maxRef = useRef();
  const [addBudget, , , response] = useFireStore("budget");
  const [budgets,] = useCollection("budget")
  
  console.log(budgets)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
  };



  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h3>Add budget</h3>
        <label htmlFor="">
          <h3>name</h3>
          <input className="bg-pink-100" type="text" ref={nameRef} />
        </label>
        <label>
          <h3>max</h3>
          <input className="bg-pink-100" type="number" ref={maxRef} />
        </label>
        <button className="bg-blue-200" type="submit">
          submit
        </button>
      </form>
      {/* card */}
      <div className="outline-1">
        {budgets?.map(budget => <p>{budget.name}</p>)}
      </div>

    </div>

  );
}
