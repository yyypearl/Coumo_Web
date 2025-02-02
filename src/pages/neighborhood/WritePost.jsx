import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { BtnContainer } from '../coupon/UIServiceForm';
import Edit from '../../components/admin/neighborhood/Edit';
import { useNavigate } from 'react-router-dom';
import OneBtnPopUp from '../../components/common/popUp/OneBtnPopUp';
import { formAuthInstance } from '../../api/axios';
import { useSelector } from 'react-redux';

const WritePost = () => {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [category, setCategory] = useState('NEW_PRODUCT');
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

  const onClickBtn = () => {
    setPopUp(false);
    navigate('/neighborhood/myPosts/1');
  };

  /* ---- 필수 작성 항목 확인 (카테고리, 제목, 내용) ---- */
  const isVaild = () => {
    if (category && inputs.title && inputs.content) {
      return true;
    } else {
      return false;
    }
  };

  const { ownerId } = useSelector((state) => state.user);

  const onSubmit = async () => {
    if (!isVaild()) {
      alert(
        '모든 항목을 입력해주세요.\n(제목, 카테고리, 글 내용을 모두 입력해야 합니다.)'
      );
      return;
    }

    /* ---- 글작성 POST 요청 ---- */
    try {
      let formData = new FormData();
      formData.append('noticeType', category);
      formData.append('title', inputs.title);
      formData.append('noticeContent', inputs.content);

      let storeImgData = inputs.image.map(({ image }) => image);
      storeImgData.forEach((image) => formData.append('noticeImages', image));

      const response = await formAuthInstance.post(
        `/api/notice/${ownerId}/post`,
        formData
      );

      if (response.data.isSuccess) {
        /* ---- 서버 요청 성공 시, 제출 팝업 ---- */
        setPopUp(true);

        /* ---- 서버 요청 성공 시, 입력값 초기화 ---- */
        resetData();
      } else {
        console.error('writing post 실패', response.data.message);
      }
    } catch (error) {
      console.error('writing post 에러');
      console.log(error);
    }
  };

  /* ---- 입력값 초기화 ---- */
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
        <Button text='저장하기' type={true} onClickBtn={() => onSubmit()} />
      </Btn>
      {popUp && (
        <OneBtnPopUp
          title='글이 성공적으로 작성되었습니다.'
          text='작성된 글을 확인해보세요.'
          onClick={onClickBtn}
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
