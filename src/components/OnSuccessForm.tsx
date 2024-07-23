import React from "react";

type onSuccess = {
  onSuccessProp: object[];
};

const OnSuccessForm: React.FC<onSuccess> = ({ onSuccessProp }) => {
  return (
    <>
      <ul className="flex flex-col gap-1">
        {onSuccessProp.map((succ: any, i: number) => (
          <li
            key={i}
            className="bg-green-500 text-zinc-50 p-1 rounded-md shadow-md"
          >
            {succ.message}
          </li>
        ))}
      </ul>
    </>
  );
};

export default OnSuccessForm;
