import styled from '@emotion/styled';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { apiUrl } from '../api/api';

// export interface IListItemProps {
//   id: string;
//   todo: string;
//   isCompleted: boolean;
//   userId: number;
// }

export default function ListItem(props: any) {
  const [editTodo, setEditTodo] = useState(props?.el?.todo);
  const [isCompleted, setIsCompleted] = useState(props.el.isCompleted);
  const [isEdit, setIsEdit] = useState(false);

  const onClickDeleteTodo = async () => {
    await axios
      .delete(apiUrl + `/todos/${props.el.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          props.getList();
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onClickUpdateTodo = async () => {
    await axios
      .put(
        // `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${props.el.id}`,
        `${apiUrl}todos/${props.el.id}`,
        {
          todo: editTodo,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          props.getList();
          setIsEdit((prev) => !prev);
        }
        setEditTodo(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const onClickCancel = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    // onClickUpdateTodo();
    onClickCancel();
  }, []);

  return (
    <Fragment>
      {isEdit ? (
        <Wrap>
          <ItemWrap>
            <input
              type="text"
              id={props.el.id}
              defaultValue={props?.el?.todo}
            />
          </ItemWrap>
          <span onClick={onClickUpdateTodo}>등록</span>
          <span onClick={onClickCancel}>취소</span>
        </Wrap>
      ) : (
        <Wrap>
          <ItemWrap>{props?.el?.todo}</ItemWrap>
          <span onClick={onClickUpdateTodo}>수정✅</span>
          <span id={props.el.id} onClick={onClickDeleteTodo}>
            ❌
          </span>
        </Wrap>
      )}
    </Fragment>
  );
}
const Wrap = styled.div`
  display: flex;
  span {
    cursor: pointer;
    margin-left: 10px;
  }
`;

const ItemWrap = styled.div`
  display: flex;
`;
