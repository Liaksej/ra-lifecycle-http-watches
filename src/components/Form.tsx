import { Button, FormHelperText, Stack, TextField } from "@mui/material";
import { Action } from "@/app/page";
import { Dispatch, FormEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface FormProps {
  dispatch: Dispatch<Action>;
}

function isValidDistance(timezone: number) {
  return !isNaN(timezone) && timezone >= -12 && timezone <= 12;
}

export const Form = ({ dispatch }: FormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const timezoneRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nameRef.current || !timezoneRef.current) {
      return;
    }
    if (!isValidDistance(+timezoneRef.current.value)) {
      setError("Временная зона: -12 до 12");
      return;
    } else {
      setError("");
    }

    dispatch({
      type: "add",
      payload: {
        id: uuidv4(),
        name: nameRef.current.value,
        timezone: +timezoneRef.current.value,
      },
    });

    nameRef.current.value = "";
    timezoneRef.current.value = "";
  }

  return (
    <form
      className="form"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        submitHandler(event);
      }}
    >
      <Stack spacing={2} direction="row">
        <TextField
          inputRef={nameRef}
          id="standard-basic"
          label="Название"
          variant="standard"
          required={true}
        />
        <div>
          <TextField
            inputRef={timezoneRef}
            id="standard-basic"
            label="Временная зона"
            variant="standard"
            required={true}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </div>
        <Button type="submit" variant="text" size="small">
          Добавить
        </Button>
      </Stack>
    </form>
  );
};
