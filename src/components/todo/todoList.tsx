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

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/');
      return;
    }
    getList();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
