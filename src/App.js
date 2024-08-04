import {useState} from "react"


export default function App(){
  let [itemList, setItemList] = useState([]) //list všech itemů

  function deteleItem(itemId){
    setItemList(itemList.filter((item => item.id !== itemId)))
  }

  function updateItem(itemId){
    setItemList(itemList.map((item => item.id === itemId ? {...item, packed: !item.packed} : item)))
  }

  function clearList() {
    setItemList(itemList=[])
   }

  return <div className="app">
    <Header/>
    <Inputs setItemList={setItemList}/>
    <List itemList={itemList} deteleItem={deteleItem} updateItem={updateItem} clearList={clearList}/>
    <Summary itemList={itemList}/>
  </div>
}



//////////////
//HEADER
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


//////////////
//LIST
//////////////
function List({itemList, deteleItem, updateItem, clearList}) {

  const [orderType, setOrderType] = useState("sortByInput") 
  let orderedList = []

  if (orderType==="sortByInput") orderedList = itemList

  if (orderType==="sortByName") orderedList = itemList.slice().sort((a,b) => a.inputVar.localeCompare(b.inputVar)) 

  if (orderType==="sortByPacked") orderedList = itemList.slice().sort((a,b) => Number(a.packed) - Number(b.packed))



  return (
    <div className="list">
      <ul>
          {orderedList.map((currentObj) => (
            <Item item={currentObj} deteleItem={deteleItem} updateItem={updateItem} key={currentObj.id}/>
            ))}
      </ul>

      <div className="actions">
          <select value={orderType} onChange={(e)=>setOrderType(e.target.value)}> 
            <option value="sortByInput">Sort by Input order</option>
            <option value="sortByName">Sort by name of the item</option>
            <option value="sortByPacked">Sort by packed status</option>
          </select>

        <button onClick={clearList}>Clear the list</button>
      </div>

  </div>
        )
}


//////////////
//ITEM
//////////////
function Item({item, deteleItem, updateItem}) {

  return <li> 
    <input type="checkbox" value={item.checked} onChange={() => updateItem(item.id)}/>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}> 
          {`${item.selectVar}
          ${item.inputVar}`}
      </span>
      <button onClick={() => deteleItem(item.id)}>❌</button>
    </li>
}


//////////////
//SUMMARY
//////////////
function Summary({ itemList }) {

  const numberOfPacked = itemList.filter(function(i) { return i.packed === true}).length
  let howManyPacked = 0

  //výpočet procent
  if (itemList.length === 0){
     howManyPacked = 0
  }
  else {
    howManyPacked = Math.round((numberOfPacked/itemList.length)*100)
  }

  //je-li vše zabaleno, nepočítat statistiky
  if (howManyPacked === 100) return <footer className="stats">  All packed! Enjoy your holiday! 🛫</footer> 

  //není-li vše zabaleno, počítat statistiky
  return <footer className="stats">
      <p> {itemList.length} {itemList.length === 1 ? "item" : "items"} on the list.</p>
      <p> {`${howManyPacked} % already packed.`}
      </p>
    </footer>
}