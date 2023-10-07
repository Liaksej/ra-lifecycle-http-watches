import { Action } from "@/app/page";
import { Dispatch } from "react";

interface WatchesProps {
  watch: {
    id: number;
    name: string;
    timezone: string;
  };
  dispatch: Dispatch<Action>;
}

export const Watches = ({ watch, dispatch }: WatchesProps) => {
  return (
    <div className="clock w-[100px] h-[100px] border-[1px] border-gray-500 border-solid relative rounded-full">
      <div className="hand hour-hand w-1/2 bg-gray-700 origin-bottom rotate-90 h-[3px] left-[23%]"></div>
      <div className="hand minute-hand w-1/2 bg-gray-700 origin-bottom rotate-[95deg] h-[2px] left-[26%]"></div>
      <div className="hand second-hand w-1/2 bg-gray-700 origin-bottom rotate-[100deg] h-[1px] left-[29%]"></div>
    </div>
  );
};
