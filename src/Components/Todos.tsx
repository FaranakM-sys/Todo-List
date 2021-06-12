import React, { ChangeEvent, FormEvent, useState } from "react";

import { Row } from "./Row";
import { data } from "../todos";
import { Todo } from "../types";
const paused = "Paused";

export const Todos = () => {
  const [activeStatus, setActiveStatus] = useState(1);

  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTask = (): void => {
    const newTask = { title: title, status: status, date: date, time: time };
    setTodoList([...todoList, newTask]);
    setTitle("Task #4");
    setStatus("To Do");
    setDate("12 June 2021");
    setTime("11:30 pm");
  };

  return (
    <>
      <div className="flex justify-end mr-12 mt-8 ">
        <button
          onClick={addTask}
          className="inline-flex items-center px-3 py-2 justify-end w-24 h-8 text-white text-xs font-semibold bg-blue-600 rounded-md shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p>Add Task</p>
        </button>
      </div>
      <div className="mx-auto container py-0 px-4 flex items-center justify-center w-full">
        <ul className="w-full hidden md:flex items-center pb-0 border-b space-x-1 border-gray-200">
          <li
            onClick={() => setActiveStatus(1)}
            className={
              activeStatus === 1
                ? "py-2 px-4 cursor-pointer border-t border-l border-r w-28 ease-in duration-150 rounded xl:text-xs font-semibold text-center text-blue-600"
                : "py-2 px-4 cursor-pointer  border-t border-l border-r w-28 bg-gray-50 hover:bg-indigo-50 ease-in duration-150 rounded xl:text-xs text-center text-gray-400"
            }
          >
            To Do
          </li>
          <li
            onClick={() => setActiveStatus(2)}
            className={
              activeStatus === 2
                ? "py-2 px-2 cursor-pointer border-t border-l border-r w-28 ease-in duration-150 rounded font-semibold xl:text-xs text-center text-blue-600"
                : "py-2 px-4 cursor-pointer border-t border-l border-r w-28 bg-gray-50 hover:bg-indigo-50 ease-in duration-150 rounded text-center xl:text-xs text-gray-400"
            }
          >
            Done Tasks
          </li>
        </ul>
      </div>

      <div className="flex justify-end py-8 mr-12">
        <span className="relative z-0 inline-flex rounded-sm shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 text-xs font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-blue-600 focus-visible:z-10 focus:outline-none focus-visible:border-blue-300 focus-visible:shadow-outline-blue active:bg-gray-100 active:text-blue-600"
          >
            Month
          </button>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-xs font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-blue-600 focus-visible:z-10 focus:outline-none focus-visible:border-blue-300 focus-visible:shadow-outline-blue active:bg-gray-100 active:text-blue-600"
          >
            Week
          </button>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-xs font-medium leading-5 text-blue-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-blue-600 focus-visible:z-10 focus:outline-none focus-visible:border-blue-300 focus-visible:shadow-outline-blue active:bg-gray-100 active:text-blue-600"
          >
            Day
          </button>
        </span>
      </div>
      <div className="flex flex-col ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-0">
          <div className=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden ml-10 mr-10 border-gray-200 sm:rounded-lg">
              <table className="min-w-full border-b divide-y divide-gray-200">
                <thead className="shadow w-full ml-10 mr-10"></thead>
                <thead>
                  <tr>
                    <th className="px-6 py-3 ml-10 mr-10"></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-500 tracking-wider"
                    >
                      Tasks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-500  tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-500  tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-500 tracking-wider"
                    >
                      Time
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th className="px-6 py-3 ml-10 mr-10"></th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((todo) => (
                    //<Row key={todo.id} todo={todo} />
                    <tr key={todo.id}>
                      <td>
                        <input type="checkbox" checked={todo.isCompleted} />
                      </td>
                      <td className="px-6 py-4 ml-3 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-700">
                          {todo.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 ml-3 whitespace-nowrap">
                        <button
                          className={`rounded-full border-gray-400 ${
                            todo.status === paused
                              ? "bg-yellow-500 h-7 w-20 text-white text-sm"
                              : "bg-blue-700 h-7 w-24 text-white text-sm"
                          }  `}
                        >
                          {todo.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 ml-3 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-700">
                          {todo.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 ml-3 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-700">
                          {todo.time}
                        </div>
                      </td>
                      <td className="flex py-5 px-10 space-x-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
