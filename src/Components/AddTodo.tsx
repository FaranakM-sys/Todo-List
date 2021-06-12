import { AddTodoProps } from "../types";

export const AddTodo = ({
  handleSubmitTodo,
  title,
  status,
  date,
  time,
  handleChange,
}: AddTodoProps) => (
  <form className="flex justify-between w-full" onSubmit={handleSubmitTodo}>
    <input
      type="text"
      name="title"
      value={title}
      className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
      onChange={handleChange}
    />
    <input
      type="text"
      name="status"
      value="To Do"
      className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
    />
    <input
      type="text"
      name="date"
      value={date}
      className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
      onChange={handleChange}
    />
    <input
      type="text"
      name="time"
      value={time}
      className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
      onChange={handleChange}
    />
    <button type="submit" aria-label="Add todo">
      Add
    </button>
  </form>
);
