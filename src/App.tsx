import { BrowserRouter, Routes, Route } from "react-router-dom";

import RevenueList from "./Revenue/RevenueList";
import ExpenseList from "./Expense/ExpenseList";
import DailyRegister from "./register/DailyRegister";
import Home from "./home/Home";

import NavBar from "./components/NavBar";

import { UserContextProvider } from "./context/User.context.api";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div
          className="grid grid-rows-12 grid-cols-12 h-screen overflow-y-scroll 
          bg-[url('/levi2.webp')] bg-cover 
        "
        >
          <NavBar />
          <div className="col-start-1 col-end-13 row-start-1 row-end-13">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rodeo/register" element={<DailyRegister />} />
              <Route path="/rodeo/revenue-list" element={<RevenueList />} />
              <Route path="/rodeo/expense-list" element={<ExpenseList />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
