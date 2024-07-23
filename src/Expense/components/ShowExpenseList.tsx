import React from "react";
import NoSeCargaron from "../../components/NoSeCargaron";
import UserContext from "../../context/User.context.api";
import RegisterList from "../../components/RegisterList";

const ShowExpenseList: React.FC = () => {
  const { selectedExpenseMonth, selectedExpenseMonthData } =
    React.useContext(UserContext)!;

  return (
    <div className="w-full h-full">
      {selectedExpenseMonthData && selectedExpenseMonthData.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-evenly">
            <RegisterList monthData={selectedExpenseMonthData} expense={true} />
          </div>
        </div>
      ) : (
        <div className="justify-center items-center flex h-1/2">
          <NoSeCargaron month={selectedExpenseMonth} />
        </div>
      )}
    </div>
  );
};

export default ShowExpenseList;
