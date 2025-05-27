

import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaWindowClose } from 'react-icons/fa';
import { PieChart } from '@mui/x-charts/PieChart';
import { publicRequest } from "./utils/requestMethods";

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateLabel, setUpdateLabel] = useState("");
  const [updateAmount, setUpdateAmount] = useState(0);
  const [updateDate, setUpdateDate] = useState("");
  const [sortOption, setSortOption] = useState("none");

  const handleAddExpense = () => setShowAddExpense(!showAddExpense);
  const handleshowReport = () => setShowReport(!showReport);
  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdateId(id);
  };

  const handleUpdateExpense = async () => {
    if (updateId) {
      try {
        await publicRequest.put(`/${updateId}`, {
          label: updateLabel,
          date: updateDate,
          value: updateAmount
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleExpense = async () => {
    try {
      await publicRequest.post("/", {
        label,
        date,
        value: amount
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get("/");
        setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredExpenses = expenses.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
    if (sortOption === "amount-high") return b.value - a.value;
    if (sortOption === "amount-low") return a.value - b.value;
    return 0;
  });

  const totalExpenditure = expenses.reduce((acc, curr) => acc + Number(curr.value), 0);

  return (
    <div>
      <div className='flex flex-col items-center justify-center mt-[3%] w-[80%] ml-[10%]'>
        <h1 className='text-2xl font-medium text-[#555]'>Expense Tracker</h1>

        <div className='relative flex items-center justify-between mt-3 w-full'>
          <div className='relative flex justify-between w-[300px]'>
            <button className='bg-[#af8978] p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium' onClick={handleAddExpense}>Add Expense</button>
            <button className='bg-[#be8675] p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium' onClick={handleshowReport}>Expense Report</button>
          </div>

          <div className='flex gap-2 items-center'>
            <select className='p-[10px] border-2 border-[#444]' onChange={(e) => setSortOption(e.target.value)}>
              <option value="none">Sort</option>
              <option value="oldest">Oldest First</option>
              <option value="newest">Newest First</option>
              <option value="amount-high">Amount High to Low</option>
              <option value="amount-low">Amount Low to High</option>
            </select>
            <input
              type="text"
              placeholder='Search...'
              className='p-[10px] w-[150px] border-2 border-[#444] border-solid'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className='grid grid-cols-4 gap-4 mt-6 w-[80vw] font-semibold text-[#444]'>
          <span>Category</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Action</span>
        </div>

        <div className='flex flex-col'>
          {sortedExpenses.map((item, index) => (
            <div key={index} className='grid grid-cols-4 items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px] px-4'>
              <h2 className='text-[#555] text-[18px] font-medium'>{item.label}</h2>
              <span className='text-[18px] font-medium'>{item.date}</span>
              <span className='text-[18px] font-medium'>${item.value}</span>
              <div className="flex gap-2">
                <FaTrash className="text-[#F08080] cursor-pointer" onClick={() => handleDelete(item._id)} />
                <FaEdit className="text-[#555] cursor-pointer" onClick={() => handleShowEdit(item._id)} />
              </div>
            </div>
          ))}
        </div>

        {showAddExpense && (
          <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-0 h-[500px] w-[500px] bg-[#fff] shadow-xl">
            <FaWindowClose className="flex justify-end items-end text-2xl text-[#8B0000] cursor-pointer" onClick={handleAddExpense} />
            <label className="mt-[10px] font-semibold text-[18px]">Expense Name</label>
            <input type="text" className='outline-none border-2 border-[#555] border-solid p-[10px] w-[450px]' onChange={(e) => setLabel(e.target.value)} />
            <label className="mt-[10px] font-semibold text-[18px]">Expense Date</label>
            <input type="date" className='outline-none border-2 border-[#555] border-solid p-[10px] w-[450px]' onChange={(e) => setDate(e.target.value)} />
            <label className="mt-[10px] font-semibold text-[18px]">Expense Amount</label>
            <input type="number" className='outline-none border-2 border-[#555] border-solid p-[10px] w-[450px]' onChange={(e) => setAmount(e.target.value)} />
            <button className='bg-[#af8978] border-none outline-none cursor-pointer text-[#fff] text-medium my-[10px] p-[10px] w-[472px]' onClick={handleExpense}>Add Expense</button>
          </div>
        )}

        {showReport && (
          <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[500px] w-[500px] bg-[#fff] shadow-xl">
            <FaWindowClose className="flex justify-end items-end text-2xl text-[#8B0000] cursor-pointer" onClick={handleshowReport} />
            <h2 className="font-bold text-lg mb-2">Total Expenditure: ${totalExpenditure.toFixed(2)}</h2>
            <PieChart
              series={[
                {
                  data: expenses,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />
          </div>
        )}

        {showEdit && (
          <div className="absolute z-[999] flex flex-col p-[10px] top-[25%] right-0 h-[500px] w-[500px] bg-[#fff] shadow-xl">
            <FaWindowClose className="flex justify-end items-end text-2xl text-[#8B0000] cursor-pointer" onClick={handleShowEdit} />
            <label className="mt-[10px] font-semibold text-[18px]">Expense Name</label>
            <input type="text" className='outline-none border-2 border-[#555] border-solid p-[10px] w-[450px]' onChange={(e) => setUpdateLabel(e.target.value)} />
            <label className="mt-[10px] font-semibold text-[18px]">Expense Date</label>
            <input type="date" className='outline-none border-2 border-[#555] border-solid p-[10px] w-[450px]' onChange={(e) => setUpdateDate(e.target.value)} />
            <label className="mt-[10px] font-semibold text-[18px]">Expense Amount</label>
            <input type="number" className='outline-none border-2 border-[#555] border-solid p-[10px] w-[450px]' onChange={(e) => setUpdateAmount(e.target.value)} />
            <button className='bg-[#af8978] border-none outline-none cursor-pointer text-[#fff] text-medium my-[10px] p-[10px] w-[472px]' onClick={handleUpdateExpense}>Update Expense</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

