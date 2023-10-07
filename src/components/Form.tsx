import { Button, Stack, TextField } from "@mui/material";
import { Action } from "@/app/page";
import { Dispatch } from "react";

interface FormProps {
  dispatch: Dispatch<Action>;
}

export const Form = ({ dispatch }: FormProps) => {
  return (
    <form className="form">
      <Stack spacing={2} direction="row">
        <TextField id="standard-basic" label="Название" variant="standard" />
        <TextField
          id="standard-basic"
          label="Временная зона"
          variant="standard"
        />
        <Button
          type="submit"
          variant="text"
          size="small"
          onClick={(event) => {
            event.preventDefault();
            dispatch({
              type: "add",
              payload: {
                id: 1,
                name: "Watch1",
                timezone: "1",
              },
            });
          }}
        >
          Добавить
        </Button>
      </Stack>
    </form>
  );
};
