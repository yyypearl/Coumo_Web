import React, { useState } from 'react';
import styled from 'styled-components';
import ImageBlock from '../../components/admin/shop/ImageBlock';
import MenuMore from '../../components/admin/shop/MenuMore';
import Button from '../../components/common/Button';
import { v4 as uuidv4 } from 'uuid';

const StoreInfo = () => {
  const [inputs, setInputs] = useState({
    image: [],
    description: '',
  });

  const [menus, setMenus] = useState([
    {
      id: uuidv4(),
      name: '',
      description: '',
      image: '',
      isNew: false,
    },
  ]);

  const handleImageChange = (images) => {
    setInputs((prev) => ({
      ...prev,
      image: images,
    }));
  };

  const isVaild = () => {
    const { description, image } = inputs;
    if (description.trim() === '' || menus.length === 0 || image.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
  };
  const [isInputFocused, setInputFocused] = useState(false);

  const onSubmit = async () => {
    if (!isVaild()) {
      alert(
        '모든 항목을 입력해주세요.\n(이미지, 상품 정보는 최소 1개 이상 입력해야 합니다.)'
      );
      return;
    }
    // 서버 요청 코드
    console.log(inputs);
  };

  return (
    <Info>
      <Gap>
        <Image>
          <Representative>
            <Title>대표이미지</Title>
            <Recommend>*이미지는 1:1비율을 권장합니다</Recommend>
          </Representative>
          <ImageBlock onChange={handleImageChange} />
        </Image>
        <Description>
          <Title>매장 상세설명</Title>
          <DescripInput
            name='description'
            spellcheck='false'
            placeholder='매장에 대한 설명글을 간단히 적어주세요 (0/100)'
            value={inputs.description}
            onChange={(e) => {
              onInputHandler(e);
              setInputs((prev) => ({ ...prev, description: e.target.value }));
            }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            maxLength='99'
          />
          <Count focused={isInputFocused}>
            <span>{inputCount}</span>
            <span>/100</span>
          </Count>
        </Description>
        <Scroll>
          <MenuMore menus={menus} setMenus={setMenus} />
        </Scroll>
      </Gap>
      <BtnContainer>
        <Button text='저장하기' type={true} onClickBtn={onSubmit} />
      </BtnContainer>
    </Info>
  );
};

export default StoreInfo;

const Info = styled.div`
  width: 100%;
  max-width: 1220px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 70px 100px;
  /* gap: 40px; */
  box-sizing: border-box;

  @media screen and (max-width: 1024px) {
    padding: 70px 50px;
  }
`;

const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
`;

const Representative = styled.div`
  width: 500px;
  display: flex;
  margin-bottom: 20px;
`;

const Title = styled.div`
  width: 110px;
  color: ${({ theme }) => theme.colors.coumo_purple};
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 31.68px */
  letter-spacing: 0.72px;
`;

const Recommend = styled.div`
  color: ${({ theme }) => theme.colors.coumo_purple};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-style: normal;
  font-weight: 400;
  line-height: 200%;
`;

const Scroll = styled.div`
  width: 100%;
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DescripInput = styled.textarea`
  display: flex;
  width: 100%;
  max-width: 567px;
  height: 100px;
  padding: 8px 12px;
  box-sizing: border-box;
  resize: none;
  align-items: top;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text_darkgray};
  text-overflow: ellipsis;
  white-space: pre-wrap;
  font-family: 'Pretendard';
  font-size: ${({ theme }) => theme.fontSize.base};
  font-style: normal;
  font-weight: 400;
  line-height: 170%;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.coumo_purple};

    &::placeholder {
      opacity: 0.6;
    }
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Count = styled.div`
  width: 100%;
  max-width: 567px;
  display: flex;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, focused }) =>
    focused ? theme.colors.coumo_purple : theme.colors.text};
`;
