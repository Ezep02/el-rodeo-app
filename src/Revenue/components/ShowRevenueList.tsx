import React from "react";

import UserContext from "../../context/User.context.api";

import NoSeCargaron from "../../components/NoSeCargaron";
import RegisterList from "../../components/RegisterList";

const ShowRevenueList: React.FC = () => {
  const { selectedMonthData, selectedMonth } = React.useContext(UserContext)!;

  return (
    <div className="w-full h-full">
      {selectedMonthData && selectedMonthData.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-evenly">
            <RegisterList monthData={selectedMonthData} revenue={true} />
          </div>
        </div>
      ) : (
        <div className="justify-center items-center flex h-1/2">
          <NoSeCargaron month={selectedMonth} />
        </div>
      )}
    </div>
  );
};

export default ShowRevenueList;
