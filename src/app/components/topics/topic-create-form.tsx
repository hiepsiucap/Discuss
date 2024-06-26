/** @format */
"use client";
import { useFormState } from "react-dom";
import {
  Input,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import FormButton from "../common/form-button";
import * as actions from "../../actions";
export const TopicCreateForm = () => {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create A Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className=" flex flex-col gap-4 p-4 w-80">
            <h3 className="text lg">Create A Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            ></Input>

            <Textarea
              name="description"
              label="Discription"
              labelPlacement="outside"
              placeholder="Discription"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            ></Textarea>
            {formState.errors._form ? (
              <div className=" text-red-400 p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
