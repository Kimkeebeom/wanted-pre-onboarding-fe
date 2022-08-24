import styled from '@emotion/styled';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListItem from './listItem';

const apiUrl =
  'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/';

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  const getList = async () => {
    await axios
      .get(apiUrl + '/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        setTodoList(res.data);
        console.log('이거?', res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  // }, []);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
      return;
    }
    getList();
    // if (todoList.length <= 3 && todoList.length > 0) {
    // }
  }, []);

  // useEffect(() => {
  //   if (todoList.length > 0 && todoList.length <= 5) {
  //     getList();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [todoList]);

  console.log('어케할꼬?:', todoList);

  return (
    <Main>
      {todoList.length > 0 &&
        todoList?.map((el, index) => (
          <Fragment key={index}>
            <ListItem el={el} getList={getList} />
          </Fragment>
        ))}
    </Main>
  );
}

const Main = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
