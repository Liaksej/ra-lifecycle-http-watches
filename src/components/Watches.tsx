import { Action } from "@/app/page";
import { Dispatch, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Cancel from "@mui/icons-material/Cancel";

interface WatchesProps {
  watch: {
    id: string;
    name: string;
    timezone: number;
  };
  dispatch: Dispatch<Action>;
}

export const Watches = ({ watch, dispatch }: WatchesProps) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate(),
          new Date().getUTCHours(),
          new Date().getUTCMinutes(),
          new Date().getUTCSeconds(),
          new Date().getUTCMilliseconds(),
        ),
      );
      d.setTime(d.getTime() + watch.timezone * 60 * 60000);
      setDate(d);
    }, 1000);
    return () => clearInterval(interval);
  }, [watch.timezone]);

  const time = date.toLocaleTimeString("en-GB");

  const [hours, minutes, seconds] = time.split(":").map(parseFloat);

  const hourRotation = hours * 30 + minutes * 0.5;

  const minuteRotation = minutes * 6 + seconds * 0.1;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between self-end">
        <div className="name w-2/3 whitespace-nowrap overflow-scroll hide-scrollbar">
          {watch.name}
        </div>
        <IconButton
          className="abs h-[20px] w-1/3 justify-self-end"
          aria-label="delete"
          onClick={() => dispatch({ type: "remove", payload: watch })}
        >
          <Cancel color="disabled" />
        </IconButton>
      </div>
      <div className="clock box-border origin-center w-[100px] h-[100px] border-[1px] border-gray-500 border-solid relative rounded-full">
        <div
          className="hand hour-hand absolute bottom-1/2 left-1/2 transform -translate-x-1/2 origin-bottom bg-gray-700
     w-[3px]"
          style={{
            height: "40%",
            transform: `rotate(${hourRotation}deg)`,
          }}
        ></div>
        <div
          className="hand absolute minute-hand bottom-1/2 left-1/2 transform -translate-x-1/2 origin-bottom bg-gray-700
    w-[1px]"
          style={{
            height: "46%",
            transform: `rotate(${minuteRotation}deg)`,
          }}
        ></div>
      </div>
    </div>
  );
};
