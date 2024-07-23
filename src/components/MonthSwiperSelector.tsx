import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import React, { useEffect, useContext } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import UserContext from "../context/User.context.api";
import { desktopDir, join } from "@tauri-apps/api/path";
import { exists, readTextFile } from "@tauri-apps/api/fs";

//icons
import { FaCloudDownloadAlt } from "react-icons/fa";

//PDF
import jsPDF from "jspdf";

interface MonthSwiperSelectorProps {
  meses: number[];
}

const MonthSwiperSelector: React.FC<MonthSwiperSelectorProps> = ({ meses }) => {
  const {
    selectedMonth,
    setSelectedMonth,
    setSelectedMonthData,
    monthRevenue,
  } = useContext(UserContext)!;

  useEffect(() => {
    const monthHandler = async () => {
      try {
        // Se busca el archivo
        const deskDir = await desktopDir();
        const date = new Date();
        const fileName = `ingresos-${selectedMonth}-${date.getFullYear()}.json`;

        const route = await join(
          deskDir,
          `el-rodeo-app/src/files/revenue/${fileName}`
        );

        // Si no existe, lanza un error
        if (!(await exists(route))) {
          setSelectedMonthData([]);
          throw new Error("No se encontró el archivo");
        }

        // Si existe, se buscan los datos del archivo
        const data = await readTextFile(route);
        setSelectedMonthData(JSON.parse(data));
      } catch (error) {
        console.log(error);
      }
    };
    monthHandler();
  }, [selectedMonth]);

  const handleDownloadFile = async (month: number) => {
    const deskDir = await desktopDir();
    const date = new Date();
    const fileName = `ingresos-${month}-${date.getFullYear()}.json`;

    const route = await join(
      deskDir,
      `el-rodeo-app/src/files/revenue/${fileName}`
    );

    // Si existe, se buscan los datos del archivo
    const data = await readTextFile(route);

    const response = JSON.parse(data);

    const doc = new jsPDF();
    doc.text(`Resumen total de ingresos del mes ${month}`, 10, 10);

    // Variables para posicionar el texto
    let yPosition = 20;

    response.forEach((element: any) => {
      doc.text(
        `Total: $${element.ingresos}\tDia: ${element.dia}\tMes: ${element.mes}\tAño: ${element.anio}`,
        10,
        yPosition
      );
      yPosition += 20;
    });

    doc.save(`El Rodeo resumen ingresos ${getMonthName(month - 1)}.pdf`);
  };

  const getMonthName = (monthIndex: number) => {
    const date = new Date();
    date.setMonth(monthIndex);
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {meses.map((mes, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center bg-zinc-900  rounded-2xl
            hover:bg-neutral-900 text-blue-400 flex-col gap-2 shadow-xl w-full"
          >
            <span className="uppercase font-bold text-zinc-50 ">
              {getMonthName(mes - 1)}
            </span>

            {selectedMonth === mes ? (
              <div className="flex justify-evenly w-full items-start">
                <span className="text-green-400 font-bold">
                  ${monthRevenue}
                </span>
                {monthRevenue > 0 && (
                  <button
                    onClick={() => handleDownloadFile(mes)}
                    className="flex gap-1 font-semibold items-center"
                    name="descargar"
                  >
                    <i className="text-blue-400 ">
                      <FaCloudDownloadAlt />
                    </i>
                    Descargar
                  </button>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedMonth(mes)}
                  className="
                   text-green-400 p-1 font-semibold w-full 
                  transition-all duration-300 hover:text-zinc-100 py-1 "
                >
                  Ver ingresos
                </button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MonthSwiperSelector;
