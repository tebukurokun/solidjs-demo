import { Component, createEffect, createSignal, For } from 'solid-js'

type Todo = {
  id: number
  text: string
  completed: () => boolean
  setCompleted: (completed: boolean) => void
}

const App: Component = () => {
  const [todos, setTodos] = createSignal<Todo[]>([])
  let input: HTMLInputElement | undefined
  let todoId = 0

  createEffect(() => {
    console.debug('todos: ', todos())
  })

  const addTodo = (text: string) => {
    const [completed, setCompleted] = createSignal<boolean>(false)
    setTodos([...todos(), { id: ++todoId, text, completed, setCompleted }])
  }
  const toggleTodo = (id: number) => {
    const index = todos().findIndex(t => t.id === id)
    const todo = todos()[index]
    if (todo) todo.setCompleted(!todo.completed())
  }

  return (
    <div class="bg-slate-800 py-5 px-10 w-screen h-screen  text-white">
      <Header todoCount={todos().length} />
      <div class="mt-5 grid grid-cols-3 gap-2 max-w-lg">
        <input ref={input} class="col-span-2 rounded-lg text-black px-3" />
        <button
          onClick={_e => {
            if (!input?.value.trim()) return
            addTodo(input.value)
            input.value = ''
          }}
          class="bg-green-700 ml-5 px-3 py-2 rounded-lg"
        >
          Add Todo
        </button>
      </div>
      <div class="mt-5 text-lg">
        <For each={todos()}>
          {todo => {
            const { id, text } = todo
            console.log(`Creating ${text}`)
            return (
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed()}
                  onChange={[toggleTodo, id]}
                  class="mr-2"
                  id={`check-${id}`}
                />
                <label for={`check-${id}`}>
                  <span
                    style={{
                      'text-decoration': todo.completed() ? 'line-through' : 'none',
                    }}
                  >
                    {text}
                  </span>
                </label>
              </div>
            )
          }}
        </For>
      </div>
    </div>
  )
}

type HeaderProps = {
  todoCount: number
}

const Header = (props: HeaderProps) => {
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-items': 'center',
      }}
    >
      <h1>Todo List</h1>
      <p
        style={{
          height: '12px',
          'line-height': '12px',
          'text-align': 'center',
          'margin-left': '20px',
        }}
      >
        todoCount: {props.todoCount}
      </p>
    </div>
  )
}

export default App
