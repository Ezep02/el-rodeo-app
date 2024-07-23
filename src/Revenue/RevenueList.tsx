import React from "react";
import ShowRevenueList from "./components/ShowRevenueList";
import UserContext from "../context/User.context.api";

import MonthSwiperSelector from "../components/MonthSwiperSelector";

const RevenueList = () => {
  const { meses } = React.useContext(UserContext)!;

  return (
    <div className="grid grid-cols-12 grid-rows-12  h-full w-full ">
      <div
        className="
        col-start-2 col-end-11 row-start-1 row-end-13 flex flex-col gap-3 py-5 w-full h-full 
        
        sm:col-start-2 sm:col-end-11 sm:row-start-2 sm:row-end-12
        md:col-start-4 md:col-end-10 md:row-start-3 md:row-end-12
        xl:col-start-4 xl:col-end-10 xl:row-start-3 xl:row-end-12
      "
      >
        <div className="flex w-full min-h-32">
          <MonthSwiperSelector meses={meses} />
        </div>

        <div
          className=" 
          flex  h-full flex-col gap-8 overflow-y-scroll scroll-abrir-tarjeta w-full "
        >
          {/* componente que reenderiza el listado del mes*/}
          <ShowRevenueList />
        </div>
      </div>
    </div>
  );
};

export default RevenueList;
