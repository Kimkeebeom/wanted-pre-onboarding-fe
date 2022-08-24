import styled from '@emotion/styled';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import TodoList from './todoList';

const apiUrl =
  'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/';

export default function Todo() {
  const [newTodo, setNewTodo] = useState('');

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
        <button onClick={onClickCreateTodo}>Enter</button>
      </Wrap>
      <TodoList />
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
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
`;
