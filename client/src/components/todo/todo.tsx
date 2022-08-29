import styled from '@emotion/styled';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../api/api';
import TodoList from './todoList';

export default function Todo() {
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onClickCreateTodo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await axios
      .post(
        apiUrl + '/todos',
        { todo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setNewTodo(res.data);
        console.log('todo:', res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <Main>
      <Wrap>
        <input type="text" placeholder="할 일 추가" onChange={onChangeTodo} />
        <button style={{ cursor: 'pointer' }} onClick={onClickCreateTodo}>
          추가
        </button>
      </Wrap>
      <Wrap>
        <TodoList />
      </Wrap>
    </Main>
  );
}
const Main = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  input {
    border-radius: 10px;
    margin-right: 10px;
  }
  button {
    border-radius: 10px;
  }
`;
