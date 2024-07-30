import {useState} from "react"


export default function App(){
  const [itemList, setItemList] = useState([]) //list všech itemů

  function deteleItem(itemId){
    setItemList(itemList.filter((item => item.id !== itemId)))
  }

  return <div className="app">
    <Header/>
    <Inputs setItemList={setItemList}/>
    <List itemList={itemList} deteleItem={deteleItem}/>
    <Summary/>
  </div>
}



//////////////
//COMPONENTS
//////////////
function Header() {
  return <h1>📋 Holiday List 📋</h1>
}


function Inputs({setItemList}) {
 const [inputVar, setInputVar] = useState("") 
 const [selectVar, setSelectVar] = useState("1") 

/////Funkce pro vložení nového itemu
  function addItem(e) {
    e.preventDefault();

    if (!inputVar) return;  
    //Je-li state proměnná obsahující inputovou hodnotu prázdná, funkce nepokračuje
    
    const newItem = {inputVar, selectVar, packed: false, id: Date.now()}
    setItemList(itemList => [...itemList, newItem])

    //reset input polí:
    setInputVar("")
    setSelectVar("1")
  }

  return (
    <form className="add-form" onSubmit={addItem}>
      <h3>New item:</h3>

      <select value={selectVar} onChange={(e)=>setSelectVar(e.target.value)}> 

        {Array.from({length: 20}, (_, i) => i + 1 )
        .map( (num) => (
          <option 
            value={num} key={num}> {num} 
          </option>))}
      </select>

      <input type="text" placeholder="item..." value={inputVar}
      onChange={(e)=>setInputVar(e.target.value)}
      ></input>

      <button>Add</button>
    </form>
)}


function List({itemList, deteleItem}) {

  return (
    <div className="list">
      <ul>
          {itemList.map((currentObj) => (
            <Item item={currentObj} deteleItem={deteleItem} key={currentObj.id}/>
            ))}
      </ul>
    </div>
        )
}


function Item({item, deteleItem}) {


  return <li> 
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}> 
          {`${item.selectVar}
          ${item.inputVar}`}
      </span>
      <button onClick={() => deteleItem(item.id)}>❌</button>
    </li>
}


function Summary() {
  return <footer className="stats">
       {/* <em> You have __ items on your list, __ % items are already packed.</em> */}
    </footer>
}