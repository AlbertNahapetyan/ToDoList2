import { useRef, useState } from 'react';
import './App.css';
import Button from './Components/Button/Button';
import Input from './Components/Input/Input';
import List from './Components/List/List';
import Listitem from "./Components/Listitem/Listitem"
import Text from './Components/Text/Text';
import Wrapper from './UI/Wrapper/Wrapper';
import Card from './UI/Card/Card';
import { IoClose } from "react-icons/io5"

const App  = () => {
    const [toDoList, setToDoList] = useState([
      {text: `Researching, designing, implementing software programs.`, id: 1, done: false},
      {text: `Testing and evaluating new programs`, id: 2, done: false},
      {text: `Identifying areas for modification in existing programs.`, id: 3, done: false},
      {text: `Writing and implementing efficient code.`, id: 4, done: false},
    ]);
    const [nextId, setNextId] = useState(toDoList[toDoList.length - 1]?.id + 1);
    const [checkNotComplited, setCheckNotComplited] = useState(false);
    const taskRef = useRef("");
    const [inputClass, setInputClass] = useState('add-input');
    const [placeholder, setPlaceholder] = useState('Write here');
    const [deleteMainDivClass, setDeleteMainDivClass] = useState('main');
    const [deleteDivClass, setDeleteDivClass] = useState(`delete-div`);
    const [deletedId, setDeletedId] = useState(``);
    const [searchValue, setSearchValue] = useState(``);

    const filterTasks = (el) => {
      if(checkNotComplited) {
          return el.done === false
      } else {
        return true
      }
    }

    const addTask = () => {
        if(taskRef.current.value) {
          const object = {
            text: taskRef.current.value,
            id: nextId,
            done: false
          }
          setToDoList(toDoList.concat(object));
          setNextId(nextId + 1)
          taskRef.current.value = ``
          setInputClass('add-input')
          setPlaceholder('Write here')
        } else {
          setInputClass('wrong-input')
          setPlaceholder('Cant add empty task')
        }
    }

    const deleteTask = (id) => {
      setDeleteMainDivClass('main main-view');
      setDeleteDivClass(`delete-div delete-div2`)
        setDeletedId(id)
    }

    const deleteYes = () => {
            const filteredList = toDoList.filter(el => el.id !== deletedId);
            setToDoList(filteredList)
            setDeletedId(``);
            setDeleteMainDivClass(`main`);
            setDeleteDivClass(`delete-div`)
    }

    const deleteNo = () => {
        setDeletedId(``);
        setDeleteMainDivClass(`main`)
        setDeleteDivClass(`delete-div`)
    }

    const doneTask = (id) => {
      let modifiedList = [...toDoList];
      modifiedList.map(el => el.id === id ? el.done = !el.done : null);
      setToDoList(modifiedList)
    }

    const searchFilter = (el) => {
      return el.text.toLowerCase().includes(searchValue.toLowerCase())
    }

    return(
      <Wrapper>
        <Card className={deleteDivClass}>
              <Text>Are you sure you want to delete?</Text>
              <Card>
                <Button className="accept-delete" onClick={deleteYes}>Yes</Button>
                <Button className="accept-delete" onClick={deleteNo}>No</Button>
              </Card>
        </Card>
        <Card className={deleteMainDivClass}></Card>
         <Card className="hide">
          <Input onClick={() => setCheckNotComplited(!checkNotComplited)} className="checkbox" type="checkbox" />
          <Text className="text">Hide Complited</Text>
        </Card>

        <Card className="add-div">
        <Input placeholder={placeholder} type="text" className={inputClass} myRef={taskRef} />
        <Input placeholder="search" className="add-input" type="text" onChange={(event) => setSearchValue(event.target.value)} />
        <Button onClick={addTask} className="add-button">Add</Button>
        </Card>
        
        <List className="list">
            {toDoList.filter(el => filterTasks(el)).filter(el => searchFilter(el)).map(el => {
              return(
                <Card className="list-line" key={el.id}>
                    <Listitem className="list-item" key={el.id}>
                      <Input defaultChecked={el.done} onClick={() => doneTask(el.id)} className="done" type="checkbox" /> 
                      {el.text}
                      <IoClose onClick={() => deleteTask(el.id)} className='delete' />
                    </Listitem>
                </Card>
              )
            })}
        </List>

      </Wrapper>
    )
}

export default App;
