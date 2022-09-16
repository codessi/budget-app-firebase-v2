import { useRef } from "react";
import { useBudgets } from "../../contexts/BudgetsContext";
import useFireStore from '../../hooks/useFireStore'
import useAuthContext from "../../hooks/useAuthContext";

export default function AddBudgetModal({ show, handleClose }) {

  const nameRef = useRef();
  const maxRef = useRef();
  // const { addBudget } = useBudgets();
  const [ addDocument, , ,response ] = useFireStore('budget')
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      uid: user.uid
    });
    nameRef.current.value = ''
    maxRef.current.value=''

    handleClose();
  };

  return (
    <div className={`fixed  flex justify-center items-center inset-0 bg-gray-900/80 ${show ? "" : "hidden"}  `}>
      <div className="bg-white rounded-lg  p-5 w-96" >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-">Add Budget</h3>
            <button onClick={handleClose}>
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
              >
                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
              </svg>
            </button>
          </div>
          <hr className="border-1 border-gray-500/40 -mx-5" />
          <div>
            <div className="my-4" >
              <label className="space-y-1">
                <h3>Name</h3>
                <input
                  className="w-full placeholder:p-1 outline outline-slate-200 rounded"
                  ref={nameRef}
                  placeholder="name"
                  type="text"
                  required
                />
              </label>
            </div>

            <div className="mb-3" >
              <label className="space-y-1">
                <h3>Maximum Spending</h3>
                <input
                  className="w-full placeholder:p-1 outline outline-slate-200 rounded"
                  placeholder="amount"
                  ref={maxRef}
                  type="number"
                  min={0}
                  step={0.01}
                  required
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button className="outline rounded outline-blue-400  p-1 px-3 " type="submit">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
