import React from "react";

type OnError = {
  onErrorProp: object[];
};

const OnErrorForm: React.FC<OnError> = ({ onErrorProp }) => {
  return (
    <>
      <ul className="flex flex-col gap-1 ">
        {onErrorProp.map((err: any, i: number) => (
          <li key={i} className="bg-red-500  p-1 rounded-md shadow-md">
            <span className="text-zinc-50 text-wrap text-justify">
              {err.message}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default OnErrorForm;
