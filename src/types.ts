import { ChangeEvent, FormEvent } from "react"

export type Todo = {
  /*isCompleted: boolean*/
  title: string
  status: string
  date: string
  time: string
}

export type TodoProps = {
  todo: Todo
  handleCheckTodo: (id: string) => void
}

export type AddTodoProps = {
  title: string
  status: string
  date: string
  time: string
  handleSubmitTodo: (e: FormEvent) => void
  handleChange: (e: ChangeEvent) => void
}