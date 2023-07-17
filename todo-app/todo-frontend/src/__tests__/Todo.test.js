import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Todo from "../Todos/Todo";

test("renders a todo correctly", async () => {
  const user = userEvent.setup();

  const todo = {
    id: 1,
    text: "Create multi-stage builds",
    done: false,
  };

  const onClickComplete = jest.fn();
  const onClickDelete = jest.fn();

  render(
    <Todo
      todo={todo}
      onClickComplete={onClickComplete}
      onClickDelete={onClickDelete}
    />
  );

  screen.getByText("Create multi-stage builds");
  screen.getByText("This todo is not done");

  const deleteButton = screen.getByText("Delete");
  await user.click(deleteButton);
  expect(onClickDelete.mock.calls).toHaveLength(1);

  const completeButton = screen.getByText("Set as done");
  await user.click(completeButton);
  expect(onClickComplete.mock.calls).toHaveLength(1);
});
