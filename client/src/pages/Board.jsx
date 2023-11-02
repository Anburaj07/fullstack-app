import {
  Box,
  Button,
  ButtonGroup,
  Card,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const AddTask = ({ id, onCancel, onUpdate }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [subTask, setSubTask] = useState([]);
  const [status,setStatus]=useState('')
  const [task,setTask]=useState('')
  const firstFieldRef = useRef();


  const handleAdd = () => {
    // Update data on the server
    // axios
    //   .post(`http://localhost:8080/bills/${id}`, { name, desc, subTask,status })
    //   .then(() => {
    //     onUpdate(); // Trigger any necessary actions after successful update
    //     onCancel();
    //   })
    //   .catch((error) => {
    //     console.error("Update failed:", error);
    //   });
  };

  return (
    <Stack spacing={4}>
      <TextInput
        label="Name"
        id="name"
        ref={firstFieldRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        label="Description"
        id="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <TextInput
        label="subTasks"
        id="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Select placeholder="Current Status" onChange={(e)=>setStatus(e.target.value)}>
        <option value="Todo">Todo</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </Select>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleAdd}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const Board = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = useRef();
  const [todo,setTodo]=useState([])
  const [doing,setDoing]=useState([])
  const [done,setDone]=useState([])

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status,setStatus]=useState('')
  const firstFieldRef = useRef();

  const [boards,setBoards]=useState([]);
  
  const handleAdd = () => {
    if(status=='Todo'){
        let obj={
            
                "subtasks": [],
                "title": name,
                "description": desc,
                "status": "Todo",            
        }
        setTodo((prev)=>[...prev,obj])
        onClose();
    }else if(status=='Doing'){
            let obj={
                
                    "subtasks": [],
                    "title": name,
                    "description": desc,
                    "status": "Doing",            
            }
            setDoing((prev)=>[...prev,obj])
            onClose();
        
    }else{
        let obj={
                
            "subtasks": [],
            "title": name,
            "description": desc,
            "status": "Done",            
    }
    setDone((prev)=>[...prev,obj])
    onClose();
    }
  };
  useEffect(()=>{
    axios.get(`http://localhost:8080/boards`)
    .then((res)=>{
        // console.log(res.data)
        setBoards(res.data.boards)
        // console.log(res.data.boards[0].tasks)
        // console.log(res.data.boards[1].tasks)
        // console.log(res.data.boards[2].tasks)
        setTodo(res.data.boards[0].tasks)
        setDoing(res.data.boards[1].tasks)
        setDone(res.data.boards[2].tasks)
    })
    .catch((err)=>{
        console.log(err)
    })
  },[])
  return (
    <CONTAINER>
      <HEAD>
        <Heading>Kanban</Heading>
        <Heading as="h3" size="md">Board1</Heading>
        <div id="popOver">
          <Popover
            isOpen={isOpen}
            initialFocusRef={initialFocusRef}
            onOpen={onOpen}
            onClose={onClose}
            placement="bottom"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <Button>+Add New Task</Button>
            </PopoverTrigger>
            <PopoverContent p={5}>
              <PopoverArrow />
              <PopoverCloseButton />
              {/* <AddTask  onCancel={onClose} /> */}
              <Stack spacing={4} >
      <TextInput
        label="Name"
        id="name"
        ref={firstFieldRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        label="Description"
        id="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <Select placeholder="Current Status" value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option value="Todo">Todo</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </Select>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleAdd}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
            </PopoverContent>
          </Popover>
        </div>
      </HEAD>
      <DIV>
        <LEFTBAR>
          <Heading as="h4" size="md">
            All Boards
          </Heading>
          <Heading as="h4" size="md" mt={'20px'} borderRadius={'15px'} p={'5px'} backgroundColor={'blue'} color={'white'}>
            Board1
          </Heading>
          
          <Button mt={'20px'}>+Create New Board</Button>
        </LEFTBAR>

        <DASHBOARD>
          <div>
            <Heading as="h4" size="md" color={'#424242'}>
              Todo
              </Heading>
              {todo.map((el)=>(
                // <Card key={el._id} title={el.title}/>
                <CARD key={el.id}><Heading as="h4" size="md">{el.title} </Heading> <Text>2 of 3 subtasks</Text></CARD>
              ))}
          </div>
          <div>
            <Heading as="h4" size="md" color={'#424242'}>
              Doing
            </Heading>
            {doing.map((el)=>(
                // <Card key={el._id} title={el.title}/>
                <CARD key={el.id}><Heading as="h4" size="md">{el.title} </Heading> <Text>2 of 3 subtasks</Text></CARD>
              ))}
          </div>
          <div>
            <Heading as="h4" size="md" color={'#424242'}>
              Done
            </Heading>
            {done.map((el)=>(
                // <Card key={el._id} title={el.title}/>
                <CARD key={el.id}><Heading as="h4" size="md">{el.title} </Heading> <Text>2 of 3 subtasks</Text></CARD>
              ))}
          </div>
        </DASHBOARD>
      </DIV>
    </CONTAINER>
  );
};

export default Board;

const DIV = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HEAD = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CONTAINER = styled.div`
  /* border: 1px solid red; */
  background-color: #78909C;
  color: black;
  padding: 10px;
`;
const LEFTBAR = styled.div`
  width: 20%;
  padding: 20px;
  /* border: 1px solid yellow; */
`;
const DASHBOARD = styled.div`
  width: 79%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  /* border: 1px solid red; */
`;

const CARD = styled.div`
  padding: 2%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: whitesmoke;
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 250px;
`;