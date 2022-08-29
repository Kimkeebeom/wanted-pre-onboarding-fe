import styled from '@emotion/styled';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { apiUrl } from '../api/api';

export default function ListItem(props: any) {
  const [editTodo, setEditTodo] = useState(props?.el?.todo);
  const [isCompleted, setIsCompleted] = useState<boolean>(props.el.isCompleted);
  const [isEdit, setIsEdit] = useState(false);

  const onChangeValue = (event: { target: { value: string } }) => {
    setEditTodo(event?.target.value);
  };

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
          // setIsEdit((prev) => !prev);
        }
        setEditTodo(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const toggleCheck = () => {
    setIsCompleted((current) => !current);
  };

  const onChangeCheckBox = async () => {
    toggleCheck();
    await axios
      .put(
        `${apiUrl}todos/${props.el.id}`,
        {
          id: props.el.id,
          todo: props.el.todo,
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
        setIsCompleted(res.data.isCompleted);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onClickCancel = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    onChangeCheckBox();
    onClickCancel();
    toggleCheck();
    // onClickUpdateTodo();
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
              onChange={onChangeValue}
            />
          </ItemWrap>
          <span onClick={onClickUpdateTodo}>등록</span>
          <span onClick={onClickCancel}>취소</span>
        </Wrap>
      ) : (
        <Wrap>
          {!isCompleted ? (
            <ItemWrap>
              <button id={props.el.id} onClick={onChangeCheckBox} />
              {props?.el?.todo}
            </ItemWrap>
          ) : (
            <ItemWrap>
              <button
                id={props.el.id}
                onClick={onChangeCheckBox}
                style={{ background: 'red' }}
              />
              <s>{props?.el?.todo}</s>
            </ItemWrap>
          )}
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
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: row;

  span {
    cursor: pointer;
    margin-left: 10px;
  }
  button {
    padding: 5px;
    margin-top: 1px;
    margin-right: 5px;
    border-radius: 30px;
    height: 20px;
    cursor: pointer;
  }
`;

const ItemWrap = styled.div`
  display: flex;
`;
