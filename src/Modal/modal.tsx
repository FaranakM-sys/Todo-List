import { useRef } from "react";

import { Todo } from "../types";

type Props = {
  isShow: boolean;
  newId: number;
  currentId: number;
  formTitle: string;
  setIsShow: (show: boolean) => void;
  addData: (data: Todo) => void;
  editData: (data: Todo) => void;
  data: Todo | undefined;
};

export const Modal = (props: Props) => {
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const save = () => {
    if (
      dateRef.current &&
      timeRef.current &&
      titleRef.current &&
      statusRef.current
    ) {
      if (!props.data) {
        const data: Todo = {
          id: props.newId,
          isCompleted: false,
          date: dateRef.current.value,
          status: "ToDo",
          time: timeRef.current.value,
          title: titleRef.current.value,
        };
        props.addData(data);
      } else {
        const data: Todo = {
          id: props.currentId,
          isCompleted: statusRef.current.value === "Completed" ? true : false,
          date: dateRef.current.value,
          status: statusRef.current.value,
          time: timeRef.current.value,
          title: titleRef.current.value,
        };

        props.editData(data);
      }
      props.setIsShow(false);
    }
  };

  if (props.data) {
    if (
      titleRef.current &&
      statusRef.current &&
      dateRef.current &&
      timeRef.current
    ) {
      titleRef.current.value = props.data.title;
      statusRef.current.value = props.data.status;
      dateRef.current.value = props.data.date;
      timeRef.current.value = props.data.time;
    }
  } else {
    if (
      titleRef.current &&
      statusRef.current &&
      dateRef.current &&
      timeRef.current
    ) {
      titleRef.current.value = "";
      statusRef.current.value = "ToDo";
      dateRef.current.value = "";
      timeRef.current.value = "";
    }
  }

  return (
    <div
      className={
        "flex bg-gray-bg1 bg-black bg-opacity-70 w-full h-full absolute top-0 left-0" +
        (props.isShow ? "" : " invisible")
      }
    >
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          {props.formTitle}
        </h1>
        <div>
          <label>Task Name</label>
          <input
            ref={titleRef}
            type="text"
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            id="TaskName"
            placeholder="Enter your task name"
            defaultValue={props.data && props.data.title}
            disabled={props.data && props.data.status === "Completed"}
          />
        </div>
        <div>
          <label>Status</label>

          <select
            ref={statusRef}
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            defaultValue={props.data && props.data.status}
            disabled={
              !props.data || (props.data && props.data.status === "Completed")
            }
          >
            <option value="ToDo">ToDo</option>
            <option value="Paused">Paused</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Date</label>
          <input
            ref={dateRef}
            type="date"
            className={`w-full p-2 text-primary border rounded-md outline-none text-xs text-gray-500 transition duration-150 ease-in-out mb-4`}
            id="date"
            defaultValue={props.data && props.data.date}
            disabled={props.data && props.data.status === "Completed"}
          />
        </div>
        <div>
          <label>Time</label>
          <input
            ref={timeRef}
            type="time"
            className={`w-full p-2 text-primary border rounded-md outline-none text-xs text-gray-500 transition duration-150 ease-in-out mb-4`}
            id="time"
            defaultValue={props.data && props.data.time}
            disabled={props.data && props.data.status === "Completed"}
          />
        </div>

        <div className="flex justify-center items-center mt-6 space-x-5">
          <button
            onClick={() => props.setIsShow(false)}
            className="bg-white py-2 px-4 text-sm text-black rounded border border-gray-400 focus:outline-none w-20"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="bg-blue-600 py-2 px-4 text-sm text-white rounded border  focus:outline-none w-20"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
