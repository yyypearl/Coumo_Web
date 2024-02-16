import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { BtnContainer } from '../coupon/UIServiceForm';
import Edit from '../../components/admin/neighborhood/Edit';
import { useNavigate } from 'react-router-dom';
import OneBtnPopUp from '../../components/common/popUp/OneBtnPopUp';
import { defaultInstance } from '../../api/axios';
import { useSelector } from 'react-redux';

const WritePost = () => {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [category, setCategory] = useState('new');
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    image: [],
  });

  if (popUp) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const isVaild = () => {
    if (category && inputs.title && inputs.content) {
      return true;
    } else {
      return false;
    }
  };

  const ownerId = useSelector((state) => state.user);

  const onSubmit = async () => {
    if (!isVaild()) {
      alert(
        '모든 항목을 입력해주세요.\n(제목, 카테고리, 글 내용을 모두 입력해야 합니다.)'
      );
      return;
    }

    try {
      const writeData = {
        category,
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      };
      const response = await defaultInstance.post(
        `/api/notice/${ownerId}/post`,
        writeData
      );

      if (response.data.isSuccess) {
        console.log('Sending data to server:', writeData);
        navigate('/neighborhood/myPosts');

        // 서버 요청 성공 시 모달
        submitPopUp();
        resetData();
      } else {
        console.error('글 작성 실패', response.data.message);
      }
    } catch (error) {
      console.error('에러에러!');
    }
  };

  const submitPopUp = () => {
    setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
    }, 3000);
  };

  const resetData = () => {
    setCategory('');
    setInputs({
      title: '',
      content: '',
      image: [],
    });
  };

  return (
    <StyledWrite>
      <Edit
        category={category}
        setCategory={setCategory}
        inputs={inputs}
        setInputs={setInputs}
      />
      <Btn>
        <Button text='취소하기' onClickBtn={() => resetData()} />
        <Button text='저장하기' typee={true} onClickBtn={() => onSubmit()} />
      </Btn>
      {popUp && (
        <OneBtnPopUp
          title='글이 성공적으로 작성되었습니다!'
          onClick={() => setPopUp(false)}
        />
      )}
    </StyledWrite>
  );
};

export default WritePost;

const StyledWrite = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 70px 100px;

  @media screen and (max-width: 1024px) {
    padding: 70px 50px;
  }
`;

const Btn = styled(BtnContainer)`
  max-width: 870px;
  justify-content: right;
  margin-top: 50px;
`;
