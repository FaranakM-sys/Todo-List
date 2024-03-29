import React, { useState, useEffect, memo, useMemo } from "react";

import { data, sortDir } from "../todos";
import { Todo, sortDirection } from "../types";
import { Modal } from "../Modal/modal";

const pausedBtn = "Paused";
const completedBtn = "Completed";
const todoBtn = "ToDo";
const inProgressBtn = "In Progress";

export const Todos = memo(() => {
  const [activeStatus, setActiveStatus] = useState(1);
  const [isShowModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("Add Task");
  const [selectedItems, setSelectedItem] = useState<Todo | undefined>(
    undefined
  );
  const [todoList, setTodoList] = useState<Todo[]>(data);
  const [allItems, setAllItems] = useState<Todo[]>(data);
  const [newID, setNewID] = useState(0);
  const [currentId, setCurentId] = useState(0);
  const [headers, setHeaders] = useState<sortDirection[]>(sortDir);

  useEffect(() => {
    setHeaders(sortDir);
  }, []);

  const Sorter = useMemo(
    () => (fieldToSort: sortDirection) => {
      let sortedArray = [...todoList];
      if (fieldToSort.direction === "asc") {
        sortedArray.sort((a, b) =>
          a["title"] > b["title"] ? 1 : b["title"] > a["title"] ? -1 : 0
        );
      } else {
        sortedArray.sort((a, b) =>
          a["title"] < b["title"] ? 1 : b["title"] < a["title"] ? -1 : 0
        );
      }
      fieldToSort.direction === "asc"
        ? (fieldToSort.direction = "dsc")
        : (fieldToSort.direction = "asc");

      setTodoList([...sortedArray]);
    },
    [todoList]
  );

  const editItem = (item: Todo) => {
    setSelectedItem(item);
    setCurentId(item.id);

    setShowModal(true);
    setFormTitle("Edit Task");
  };

  const addItem = () => {
    if (allItems.length !== 0) {
      setNewID(allItems[allItems.length - 1]["id"] + 1);
    } else {
      setNewID(0);
    }

    setSelectedItem(undefined);
    setShowModal(true);
    setFormTitle("Add Task");
  };

  const addTodoList = (item: Todo) => {
    if (activeStatus === 2) {
      setActiveStatus(1);
    }
    const finalList = [...allItems, item];
    console.log(finalList);
    const todoNoCompleted = finalList.filter(
      (todo) => todo.isCompleted === false
    );
    setTodoList(todoNoCompleted);
    setAllItems(finalList);
  };

  const updateTodoList = (item: Todo) => {
    const objIndex = allItems.findIndex((obj) => obj.id === item.id);

    allItems[objIndex].title = item.title;
    allItems[objIndex].id = item.id;
    allItems[objIndex].status = item.status;
    allItems[objIndex].isCompleted = item.isCompleted;
    allItems[objIndex].date = item.date;
    allItems[objIndex].time = item.time;

    if (item.isCompleted && item.status === completedBtn) {
      setActiveStatus(2);
      setAllItems(allItems);
      const todoItems = allItems.filter((todo) => todo.isCompleted === true);
      setTodoList(todoItems);
    }
  };

  const deleteTodo = (id: number) => {
    const updateAllItems = allItems.filter((todo) => todo.id !== id);
    const updatedTodos = todoList.filter((todo) => todo.id !== id);

    setAllItems(updateAllItems);

    setTodoList(updatedTodos);
  };

  const todayTodo = () => {
    const today = new Date();
    let todoItems = allItems;
    const thisYear = new Date().getFullYear();

    if (activeStatus === 1) {
      todoItems = allItems.filter((todo) => todo.isCompleted === false);
    } else if (activeStatus === 2) {
      todoItems = allItems.filter((todo) => todo.isCompleted === true);
    }
    const updatedTodos = todoItems.filter(
      (todo) =>
        todo.date.substring(todo.date.length, 8) ===
          String(today.getDate()).padStart(2, "0") &&
        todo.date.substring(0, 4) === thisYear.toString()
    );

    setTodoList(updatedTodos);
  };

  const monthTodo = () => {
    const d = new Date();
    const thisYear = new Date().getFullYear();
    let todoItems = allItems;

    if (activeStatus === 1) {
      todoItems = allItems.filter((todo) => todo.isCompleted === false);
    } else if (activeStatus === 2) {
      todoItems = allItems.filter((todo) => todo.isCompleted === true);
    }
    const updatedTodos = todoItems.filter(
      (todo) =>
        todo.date.substring(todo.date.length - 3, 5) ===
          String(d.getMonth() + 1).padStart(2, "0") &&
        todo.date.substring(0, 4) === thisYear.toString()
    );

    setTodoList(updatedTodos);
  };

  const weekTodo = () => {
    const a = new Date();
    let todoItems = allItems;
    const lastWeek = new Date(a.getFullYear(), a.getMonth(), a.getDate() - 6)
      .toISOString()
      .split("T")[0];
    const startDayWeek = lastWeek.substring(lastWeek.length, 8);
    const today = String(new Date().getDate()).padStart(2, "0");
    const d = new Date();
    const thisYear = new Date().getFullYear();

    if (activeStatus === 1) {
      todoItems = allItems.filter((todo) => todo.isCompleted === false);
    } else if (activeStatus === 2) {
      todoItems = allItems.filter((todo) => todo.isCompleted === true);
    }
    const updatedTodos = todoItems.filter(
      (todo) =>
        todo.date.substring(todo.date.length - 3, 5) ===
          String(d.getMonth() + 1).padStart(2, "0") &&
        todo.date.substring(0, 4) === thisYear.toString() &&
        todo.date.substring(todo.date.length, 8) >= startDayWeek &&
        todo.date.substring(todo.date.length, 8) < today
    );

    setTodoList(updatedTodos);
  };

  const CheckTodoDone = (id: number) => {
    const updatedTodos = allItems.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
          status: completedBtn,
        };
      }
      return todo;
    });
    const todoItems = updatedTodos.filter((todo) => todo.isCompleted === true);
    setActiveStatus(2);

    setAllItems(updatedTodos);
    setTodoList(todoItems);
  };

  const tabChange = (tabIndex: number) => {
    const todoItems = allItems.filter((todo) => todo.isCompleted === false);

    if (tabIndex === 1) {
      setActiveStatus(tabIndex);
      setTodoList(todoItems);
    }
    const alltodos = allItems.filter((todo) => todo.isCompleted === true);
    if (tabIndex === 2) {
      setActiveStatus(tabIndex);
      setTodoList(alltodos);
    }
  };

  return (
    <>
      <div className="flex justify-end mr-12 mt-8 ">
        <button
          onClick={addItem}
          className="inline-flex items-center px-3 py-2 justify-end w-24 h-8 text-white text-xs font-semibold bg-blue-600 rounded-md shadow-sm focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p>Add Task</p>
        </button>
      </div>

      <div className="mx-auto container py-0 px-4 flex items-center justify-center w-full">
        <ul className="w-full hidden md:flex sm:flex items-center pb-0 border-b space-x-1 border-gray-200">
          <li
            onClick={() => tabChange(1)}
            className={
              activeStatus === 1
                ? "py-2 px-4 cursor-pointer border-t border-l border-r  w-28 ease-in duration-150 rounded text-xs font-semibold text-center text-blue-600"
                : "py-2 px-4 cursor-pointer  border-t border-l border-r w-28  bg-gray-50 hover:bg-indigo-50 ease-in duration-150 rounded text-xs text-center text-gray-400"
            }
          >
            To Do
          </li>

          <li
            onClick={() => tabChange(2)}
            className={
              activeStatus === 2
                ? "py-2 px-2 cursor-pointer border-t border-l border-r w-28  ease-in duration-150 rounded font-semibold text-xs text-center text-blue-600"
                : "py-2 px-4 cursor-pointer border-t border-l border-r w-28 bg-gray-50 hover:bg-indigo-50 ease-in duration-150 rounded text-center text-xs text-gray-400"
            }
          >
            Done Tasks
          </li>
        </ul>
      </div>

      <div className="flex justify-end py-8 mr-12">
        <span className="relative z-0 inline-flex rounded-sm shadow-sm">
          <button
            onClick={monthTodo}
            type="button"
            className="relative inline-flex items-center px-4 py-2 text-xs font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-blue-600 focus-visible:z-10 focus:outline-none focus-visible:border-blue-300 focus-visible:shadow-outline-blue active:bg-gray-100 active:text-blue-600"
          >
            Month
          </button>
          <button
            onClick={weekTodo}
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-xs font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-blue-600 focus-visible:z-10 focus:outline-none focus-visible:border-blue-300 focus-visible:shadow-outline-blue active:bg-gray-100 active:text-blue-600"
          >
            Week
          </button>
          <button
            onClick={todayTodo}
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-xs font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-blue-600 focus-visible:z-10 focus:outline-none focus-visible:border-blue-300 focus-visible:shadow-outline-blue active:bg-gray-100 active:text-blue-600"
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
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-500 tracking-wider "
                    >
                      {headers.map((val) => {
                        return (
                          <button
                            key={0}
                            className="focus:outline-none"
                            onClick={() => Sorter(val)}
                          >
                            Tasks
                          </button>
                        );
                      })}
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
                  {todoList.map((todo) => (
                    <tr key={todo.id}>
                      <td>
                        <input
                          className={`${
                            todo.status === completedBtn
                              ? "invisible"
                              : "visible"
                          }  `}
                          type="checkbox"
                          checked={todo.isCompleted}
                          onChange={() => CheckTodoDone(todo.id)}
                        />
                      </td>
                      <td className="px-6 py-4 ml-3 whitespace-nowrap sm:px-3">
                        <div className="text-sm font-bold text-gray-700">
                          {todo.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 ml-3 whitespace-nowrap">
                        <button
                          className={`rounded-full border-gray-400 ${
                            todo.status === pausedBtn
                              ? "bg-yellow-500 h-7 w-20 text-white text-sm"
                              : todo.status === completedBtn
                              ? "bg-green-500 h-7 w-24 text-white text-sm"
                              : todo.status === todoBtn
                              ? "bg-purple-500 h-7 w-24 text-white text-sm"
                              : todo.status === inProgressBtn
                              ? "bg-blue-600 h-7 w-24 text-white text-sm"
                              : ""
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
                      <td className="flex py-5 px-10 space-x-6 sm:space-x-3 sm:px-4">
                        <svg
                          onClick={() => editItem(todo)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <svg
                          onClick={() => deleteTodo(todo.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
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
      <Modal
        isShow={isShowModal}
        data={selectedItems}
        newId={newID}
        currentId={currentId}
        formTitle={formTitle}
        setIsShow={setShowModal}
        addData={addTodoList}
        editData={updateTodoList}
      />
    </>
  );
});
