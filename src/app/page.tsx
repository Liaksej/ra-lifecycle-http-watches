"use client";

import { Watches } from "@/components/Watches";
import { Form } from "@/components/Form";
import { useReducer } from "react";

export interface Action {
  type: "add" | "remove";
  payload: {
    id: string;
    name: string;
    timezone: number;
  };
}

interface State {
  watches: {
    id: string;
    name: string;
    timezone: number;
  }[];
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add":
      return { ...state, watches: [...state.watches, action.payload] };
    case "remove":
      return {
        ...state,
        watches: state.watches.filter(
          (watch) => watch.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { watches: [] });

  return (
    <div className="w-screen">
      <div className="w-fit mx-auto">
        <Form dispatch={dispatch} />
      </div>
      <div className="w-full p-10 flex flex-wrap justify-center gap-6">
        {state.watches.map((watch) => (
          <Watches key={watch.id} watch={watch} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}
