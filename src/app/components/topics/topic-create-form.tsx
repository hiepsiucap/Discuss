/** @format */
import {
  Input,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import * as actions from "../../actions";
export const TopicCreateForm = () => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create A Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={actions.createTopic}>
          <div className=" flex flex-col gap-4 p-4 w-80">
            <h3 className="text lg">Create A Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
            ></Input>
            <Textarea
              name="description"
              label="Discription"
              labelPlacement="outside"
              placeholder="Discription"
            ></Textarea>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
