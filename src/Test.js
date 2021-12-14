import React from 'react';
import ReactDOM from 'react-dom';

function DrawForm(){
  let [key,setKey]=React.useState(1);  
  let  [listTask, setListTask] = React.useState([
  
              

]);
  
 




  React.useEffect(()=>{AllDB()},[])
  async function AllDB(){
    listTask=[]
    setListTask(listTask)
    const x = await  fetch("http://127.0.0.1:8000/ShowAll")
    .then(res=>res.json())
    .then(result=>{return result});
    


    let i=0;
     while(i<x.length-2){
      
      console.log(i, "ТЕкст ", x[i+1], "ID", x[i+3])
     /* setListTask(listTask.concat([{//id: Date.now(),
        Text: x[i+1],
        check: x[i+3],
      }]))*/
        listTask.push({
        Text: x[i+1],
        ID: x[i+3]
      })
      i=i+4;
    }
   setListTask(listTask)
    
    console.log(listTask)
    return ReactDOM.render(
      <DrawForm />,
        document.getElementById('root')
        );
  }
  
  
  
 
function Remove(ID){
  setListTask(listTask.filter(Per=>Per.ID!==ID))
  //fetch(`http://127.0.0.1:8000/remove/${id}`, "DELETE")
  let url = "http://127.0.0.1:8000/remove/"+ID;
  let y = fetch(url, {
    method: 'DELETE'
  })
  .then(res=>res.json())
  .then(rezult=>{console.log(rezult)});
  
}

async function  AddTask(textTask){
  let url = "http://127.0.0.1:8000/text/"+textTask;
  let y = await fetch(url, {
    method: 'POST'
  })
  .then(res=>res.json())
  .then(rezult=>{console.log(rezult)});
  AllDB()
  
  
  
  

}
function EditTask(TextTask,NewText, ID){
  
  let url = "http://127.0.0.1:8000/edit/"+ID+"/"+NewText;
  let y = fetch(url, {
    method: 'PUT'
  })
  .then(res=>res.json())
  .then(rezult=>{console.log(rezult)});

  for(var i=0;i<listTask.length;i++){
    if(listTask[i].Text===TextTask){
      listTask[i].Text=NewText
    }
  }
  setListTask(listTask)
  
    setKey(1);
  
  
}
function StartEdit(){
  setKey(2);
}

switch (key){
  case 1:
    return (
      
      <div className="Center" >
    
        <input id="1"></input> <button className="Button" onClick={()=>AddTask(document.getElementById("1").value)}>Добавить задачу</button>
        {listTask.map(todo=>{return (<div key={todo.Text}><button className="Button" onClick={()=>StartEdit()}>{todo.Text}</button>
        <button className="Button" onClick={()=>Remove(todo.ID)}>Выполнить</button>
        </div>)})}
        
      </div>
    );
  
  case 2://редакстирование бокса
    return (

      <div className="Center" >

        
        {listTask.map(todo=>{return (<div key={todo.Text}>
          
        <input id={todo.Text} placeholder={todo.Text}/>
        <button className="Button" onClick={()=>{EditTask(todo.Text,document.getElementById(todo.Text).value, todo.ID)}}>Редактировать</button>
        </div>)})}
        
      </div>
    );
    
    default:      
    break;
}
}
export default DrawForm;