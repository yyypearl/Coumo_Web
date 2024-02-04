import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../styles/theme';
import TagButton from './TagButton';

const Post = ({ data, onClick, onModify, onDelete }) => {
  return (
    <Container>
      <Content>
        <PostClick onClick={onClick}>
          <TitleBox>
            <TagButton label={data.label} />
            <Title>{data.title}</Title>
          </TitleBox>
          <Date>2024-01-01 16:32</Date>
        </PostClick>
      </Content>
      <Btns>
        <PostButton onClick={onModify}>수정하기</PostButton>
        <PostButton onClick={onDelete}>삭제하기</PostButton>
      </Btns>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  max-width: 900px;
  height: 110px;
  display: flex;
  align-items: center;
  background: ${COLORS.white_fff};
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;

  &:not(:first-child) {
    border-top: none;
  }

  &:hover {
    background: ${COLORS.post_lightgray};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const PostClick = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 19px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Title = styled.h2`
  width: 260px;
  margin: 0;
  color: #5a5369;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;

  line-height: 132%;
  letter-spacing: 0.864px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    font-size: 16px;
  }
`;

const Date = styled.div`
  font-size: 16px;
  color: #3b3648;
`;

const Btns = styled.div`
  display: flex;
  gap: 10px;
`;

const PostButton = styled.button`
  display: flex;
  width: 96px;
  height: 38px;
  padding: 12px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  border: 1.5px solid rgba(144, 133, 165, 0.4);
  background: ${COLORS.white_fff};
  color: ${COLORS.text_darkgray};
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 132%; /* 21.12px */

  @media screen and (max-width: 1024px) {
    font-size: 11px;
    width: 76px;
    height: 30px;
  }
`;
