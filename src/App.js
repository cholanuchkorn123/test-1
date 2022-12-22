import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState("");

  const [edittext, setEdittext] = useState([]);
  const [todobox, setTodobox] = useState(() => {
    const savetodo = localStorage.getItem("todobox");
    if (savetodo) {
      return JSON.parse(savetodo);
    } else return [];
  });
  console.log(todobox);
  const inputChange = (e) => {
    setTodo(e.target.value);
  };
  useEffect(() => {
    localStorage.setItem("todobox", JSON.stringify(todobox));
  }, [todobox]);
  const handlesubmit = (e) => {
    if (todo !== "") {
      setTodobox([...todobox, { text: todo, isdone: false }]);
    }

    setTodo("");
    e.preventDefault();
  };
  const deletebox = (index) => {
    const newitem = todobox.filter((item, itemindex) => index !== itemindex);
    console.log(newitem);
    const newitems = [...newitem];
    newitems.map((item, itemindex) => {
      if (item.isdone !== false) {
        return (item.isdone = itemindex);
      }
    });
    setTodobox(newitem);
  };
  const editbox = (index) => {
    const newitem = todobox.filter((item, itemindex) => index == itemindex);

    setEdittext([...newitem]);
  };
  const edititems = (index, todobox, edittext, e) => {
    e.preventDefault();
    const newitem = [...todobox];
    newitem[index].text = edittext;

    setTodobox(newitem);
  };
  const donetodo = (index) => {
    const newitem = [...todobox];
    newitem[index].isdone == index
      ? (newitem[index].isdone = false)
      : (newitem[index].isdone = index);

    setTodobox(newitem);
  };
  return (
    <div className="bg-[#f2d9d9] w-screen h-screen flex items-center flex-col gap-[15px] text-[#660000] ">
      <h1 className="text-[40px] font-semibold">Todo list</h1>
      <form onSubmit={handlesubmit}>
        <input
          placeholder="list todo here...."
          type="text"
          onChange={inputChange}
          value={todo}
          className="w-[600px] h-[40px] rounded-[6px] bg-[#f7d4d4] border-white border-[2px] hover:scale-110 hover:bg-[#f2d9d9]"
        />
        <button
          onClick={handlesubmit}
          className="ml-[20px] border-white border-[2px] p-[10px] rounded-[10px] bg-[#fccfcf] hover:bg-[#f2d9d9]"
        >
          submit
        </button>
      </form>

      {todobox.map((items, index) => {
        return (
          <div
            key={index}
            className="w-[500px] h-max bg-[#fad1d1] rounded-[10px] flex items-center flex-col pb-[15px]"
          >
            <li className="text-[25px] font-semibold"> {items.text}</li>
            <div className="flex flex-row items-center mt-[10px]">
              {" "}
              <button
                onClick={() => deletebox(index)}
                className="ml-[20px] border-white border-[2px] w-max h-max pl-[10px] pr-[10px] rounded-[10px] bg-[#fccfcf] hover:bg-[#f2d9d9]"
              >
                {" "}
                X
              </button>
              <button
                onClick={() => {
                  setEdit(edit === "" ? index : "");
                  editbox(index);
                  setEdittext(items.text);
                }}
                className="ml-[20px] border-white border-[2px] p-[5px] rounded-[10px] bg-[#fccfcf] hover:bg-[#f2d9d9]"
              >
                Edit
              </button>
              {(todobox[index].isdone === index && (
                <button
                  className="bg-[#bfff00] ml-[10px] border-white border-[2px] p-[5px] rounded-[10px]"
                  onClick={() => {
                    donetodo(index);
                  }}
                >
                  DONE
                </button>
              )) || (
                <button
                  className="bg-tranparents ml-[10px] border-white border-[2px] p-[5px] rounded-[10px]"
                  onClick={() => {
                    donetodo(index);
                  }}
                >
                  DONE
                </button>
              )}
            </div>

            {edit === index && (
              <form className="mt-[10px] pb-[10px]">
                <input
                  placeholder="update todo list"
                  value={edittext}
                  onChange={(e) => {
                    setEdittext([e.target.value]);
                  }}
                  className="bg-[#f0dbdb] rounded-[5px] text-center"
                />
                <button
                  onClick={(e) => {
                    edititems(index, todobox, edittext, e);
                  }}
                  className="ml-[20px] border-white border-[2px] p-[5px] rounded-[10px] bg-[#fccfcf] hover:bg-[#f2d9d9]"
                >
                  Update
                </button>
                <button
                  onClick={() => setEdit("")}
                  className="ml-[20px] border-white border-[2px] p-[5px] rounded-[10px] bg-[#fccfcf] hover:bg-[#f2d9d9]"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
