import React,{useEffect,useState} from "react";
import "./Project.css";



const getLocalItems=()=>{
    let list = localStorage.getItem('lists');
    console.log(list);

    if(list)
    {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

const Todo = () => {

   
    const [input,setInput]=useState("");

    const [items,setItems]=useState(getLocalItems());

    const [toggle,setToggle]=useState(true);

    const [isEditItem,setIsEditItem]=useState(null);

    //add iitems
    function addItems()
    {
       
           if(!input)
           {
            alert("please fill the input");
           }
           else if(input && !toggle)
           {
              setItems(
                items.map((elem)=>{
                  if (elem.id === isEditItem)
                  {
                    return{...elem,name:input}
                  }
                  return elem;
                 
                })
              )
              setInput("");
              setToggle(true);
           }
           else
           {
            const allinput={id:new Date().getTime().toString(), name:input};
            setItems([...items,allinput]);

            // setItems([...items,input]);

            // setItems((preval)=>{
            //     return[...preval,input]
            // })  

            console.log(items);
            setInput("");
           }
    }

    function editItem(index){
      let newEditItems =items.find((elem)=>{
        return elem.id===index;
      });
      // console.log(newEditItems);
      setToggle(false);
      setInput(newEditItems.name);
      setIsEditItem(index);

    }

    //delete Items
    function deleteItem(index)
    {
        
            // const newUpdatedData=items.filter((val,index)=>{
            //     return index !==id;
            // });
            // setItems(newUpdatedData)

            const newUpdatedData=items.filter((elem)=>{
              return elem.id !==index;
          });
          setItems(newUpdatedData)
    }

    //remove all elements
    function removeAll(){
        setItems([]);
    }

    //save data to localstorage
    useEffect(()=>{
     localStorage.setItem('lists',JSON.stringify(items));
    },[items])

  return (
    <>
      <div className="todo">
        <div className="todo_form">
          <img
            className="todo_image"
            src="https://cdn-icons-png.flaticon.com/512/1567/1567073.png"
            alt="todo_image_error"
          />

          <h2 className="todo_heading">Add Your List Here ✌️</h2>
          <div className="adding">
            <input
              className="todo_input"
              type="text"
              placeholder="✏️ Add Your Task...."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {
              (toggle === true) ? <i className="fa-solid fa-plus" id="add_icon" onClick={addItems} ></i>: <i className="fa-solid fa-pen" id="update_icon" onClick={addItems}></i>
            }
           
          </div>

          <div>
            {
                items.map((ele)=>{
                    return(
                        <div className="data_div" key={ele.id}>
                            <h3 className="list_data">{ele.name}</h3>
                            <i className="fa-solid fa-pen-to-square" id="edit_icon" onClick={()=>editItem(ele.id)}></i>
                            <i className="fa-solid fa-trash-can" id="delete_icon" onClick={()=>deleteItem(ele.id)}></i>
                        </div>
                    )
                })
            }
          </div>
         
          <div className="remove_div">
            <button className="remove_button" onClick={removeAll}>
              Remove All
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Todo;
