import { desktopDir, join } from "@tauri-apps/api/path";
import { useContext, useState, useEffect, useCallback } from "react";

// Context
import UserContext from "../../context/User.context.api";
import { exists, readTextFile } from "@tauri-apps/api/fs";

const TotalRevenue = () => {
  const { meses, setTotalCortes } = useContext(UserContext)!;

  const [totalRevenue, setTotalRevenue] = useState(0);

  const year = new Date().getFullYear();

  const RevenueCalculator = useCallback(async () => {
    try {
      const dir = await desktopDir();
      let sum = 0;
      let sumCortes = 0;

      for (let i = 0; i < meses.length; i++) {
        const fileName = `ingresos-${i + 1}-${year}.json`;
        const route = await join(
          dir,
          `el-rodeo-app/src/files/revenue/${fileName}`
        );

        if (await exists(route)) {
          const data = await readTextFile(route);

          // Parsear el contenido existente
          let existentFileData = JSON.parse(data);

          let mesRevenue = existentFileData.reduce((acc: any, element: any) => {
            return acc + parseInt(element.ingresos, 10);
          }, 0);

          let totalCortesMes = existentFileData.reduce(
            (acc: any, element: any) => {
              return acc + parseInt(element.cortes, 10);
            },
            0
          );

          sum += mesRevenue;
          sumCortes += totalCortesMes;
        }
      }

      setTotalRevenue(sum);
      setTotalCortes(sumCortes);
    } catch (error) {
      console.error("Error calculando los ingresos:", error);
    }
  }, [meses, year]);

  useEffect(() => {
    RevenueCalculator();
  }, [RevenueCalculator]);

  return (
    <div className="flex flex-col">
      <span className="text-amber-300 font-bold">${totalRevenue}</span>
      <div>
        <h3 className="text-zinc-400 font-semibold">Ingresos totales</h3>
      </div>
    </div>
  );
};

export default TotalRevenue;
