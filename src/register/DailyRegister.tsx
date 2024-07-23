import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import DailyRevenueForm from "./components/principales/DailyRevenueForm";
import DailyExpenseForm from "./components/principales/DailyExpenseForm";
import DailyCustomFrom from "./components/principales/DailyCustomFrom";

const DailyRegister = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + index +' ">' + "</span>";
    },
  };

  return (
    <div className="flex flex-col w-full h-full bg-[url('/shingeki.webp')] bg-cover ">
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper h-full w-full"
      >
        <SwiperSlide className="flex justify-center items-center">
          <DailyRevenueForm />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <DailyExpenseForm />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <DailyCustomFrom />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DailyRegister;
