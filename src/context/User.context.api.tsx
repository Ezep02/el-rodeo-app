import React, { createContext, ReactNode, useEffect, useState } from "react";


// Define los tipos para el contexto
type MonthData = {
  ingresos?: number | string;
  cortes?: number | string;
  dia?: number | string;
  mes?: number | string;
  anio?: number | string;
  descripcion?: string;
};


interface UserContextType {
  // Define las propiedades en el contexto
  meses: number[];
  setMeses: React.Dispatch<React.SetStateAction<number[]>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedMonthData: MonthData[];
  setSelectedMonthData: React.Dispatch<React.SetStateAction<MonthData[]>>;
  monthRevenue: number;
  setMonthRevenue: React.Dispatch<React.SetStateAction<number>>;

  selectedExpenseMonth: number;
  setSelectedExpenseMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedExpenseMonthData: MonthData[];
  setSelectedExpenseMonthData: React.Dispatch<React.SetStateAction<MonthData[]>>;
  monthExpense: number;
  setMonthExpense: React.Dispatch<React.SetStateAction<number>>;

  //revenue form error/ success handlers
  revenueFormError: object[];
  setRevenueFormError: React.Dispatch<React.SetStateAction<object[]>>;
  revenueFormSuccess: object[];
  setRevenueFormSuccess: React.Dispatch<React.SetStateAction<object[]>>;

  //Expense form error/ success handlers
  expenseFormError: object[];
  setExpenseFormError: React.Dispatch<React.SetStateAction<object[]>>;
  expenseFormSuccess: object[];
  setExpenseFormSuccess: React.Dispatch<React.SetStateAction<object[]>>;

  //Custom Revenue Form error/success handlers
  customRevenueFormError: object[];
  setCustomRevenueFormError: React.Dispatch<React.SetStateAction<object[]>>;
  customRevenueFormSuccess: object[];
  setCustomRevenueFormSuccess: React.Dispatch<React.SetStateAction<object[]>>;

  //Custom Expense Form error/success handlers
  customExpenseFormError: object[];
  setCustomExpenseFormError: React.Dispatch<React.SetStateAction<object[]>>;
  customExpenseFormSuccess: object[];
  setCustomExpenseFormSuccess: React.Dispatch<React.SetStateAction<object[]>>;

  //Total hairCuts
  totalCortes: number;
  setTotalCortes: React.Dispatch<React.SetStateAction<number>>;

}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [meses, setMeses] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedMonthData, setSelectedMonthData] = useState<MonthData[]>([]);
  const [selectedExpenseMonthData, setSelectedExpenseMonthData] = useState<MonthData[]
  >([]);
  const [monthRevenue, setMonthRevenue] = useState(0);

  //revenue form error/ success handlers
  const [revenueFormError, setRevenueFormError] = useState<object[]>([]);
  const [revenueFormSuccess, setRevenueFormSuccess] = useState<object[]>([]);

  //Expense form error/ success handlers
  const [expenseFormError, setExpenseFormError] = useState<object[]>([]);
  const [expenseFormSuccess, setExpenseFormSuccess] = useState<object[]>([]);

  //Custom Revenue form Error/Success handlers
  const [customRevenueFormError, setCustomRevenueFormError] = useState<
    object[]
  >([]);
  const [customRevenueFormSuccess, setCustomRevenueFormSuccess] = useState<
    object[]
  >([]);

  //Custom Expense form Error/Success handlers
  const [customExpenseFormError, setCustomExpenseFormError] = useState<
    object[]
  >([]);
  const [customExpenseFormSuccess, setCustomExpenseFormSuccess] = useState<
    object[]
  >([]);

  //Expense states
  const [selectedExpenseMonth, setSelectedExpenseMonth] = useState<number>(1);
  const [monthExpense, setMonthExpense] = useState(0);


  //Total hairCuts state
  const [totalCortes, setTotalCortes] = useState(0);

  useEffect(() => {
    const numerosDeMeses = [];
    for (let i = 1; i <= 12; i++) {
      numerosDeMeses.push(i);
    }
    setMeses(numerosDeMeses);
  }, []);

  //calcula el total de ingresos
  useEffect(() => {
    //si los datos del mes cambian, se vuelve a ejecutar
    const calculateRevenue = selectedMonthData.reduce(
      (count, m: any) => count + parseInt(m.ingresos, 10),
      0
    );
    setMonthRevenue(calculateRevenue);

    const calculateExpense = selectedExpenseMonthData.reduce(
      (count, m: any) => count + parseInt(m.ingresos, 10),
      0
    );
    setMonthExpense(calculateExpense);
  }, [selectedMonthData, selectedExpenseMonthData]);

  const contextValue: UserContextType = {
    // Proporciona los valores para cuando se implemente el contexto
    setMeses,
    meses,
    selectedMonth,
    setSelectedMonth,
    selectedMonthData,
    setSelectedMonthData,
    monthRevenue,
    setMonthRevenue,
    expenseFormError,
    setExpenseFormError,
    expenseFormSuccess,
    setExpenseFormSuccess,
    revenueFormSuccess,
    setRevenueFormSuccess,
    selectedExpenseMonth,
    setSelectedExpenseMonth,
    selectedExpenseMonthData,
    setSelectedExpenseMonthData,
    monthExpense,
    setMonthExpense,
    revenueFormError,
    setRevenueFormError,
    customRevenueFormError,
    setCustomRevenueFormError,
    customRevenueFormSuccess,
    setCustomRevenueFormSuccess,
    customExpenseFormError,
    setCustomExpenseFormError,
    customExpenseFormSuccess,
    setCustomExpenseFormSuccess,
    totalCortes,
    setTotalCortes,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
