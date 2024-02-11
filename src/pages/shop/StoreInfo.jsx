import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageBlock from '../../components/admin/shop/ImageBlock';
import MenuMore from '../../components/admin/shop/MenuMore';
import Button from '../../components/common/Button';

const StoreInfo = () => {
  const [inputs, setInputs] = useState({
    image: [],
    description: '',
    menu: [],
  });

  useEffect(() => {
    console.log('inputs changed:', inputs);
  }, [inputs]);

  const handleImageChange = (images) => {
    setInputs({
      ...inputs,
      image: images,
    });
  };

  const handleMenuChange = (menus) => {
    setInputs({
      ...inputs,
      menu: menus,
    });
  };

  const onSubmit = async () => {
    // 서버 요청 코드
    console.log(inputs);
  };

  return (
    <Info>
      <Image>
        <Representative>
          <Title>대표이미지</Title>
          <Recommend>*이미지는 1000px, 1000px의 1:1비율을 권장합니다</Recommend>
        </Representative>
        <ImageBlock onChange={handleImageChange} />
      </Image>
      <Description>
        <Title>매장 상세설명</Title>
        <DescripInput
          name='description'
          placeholder='매장에 대한 설명글을 간단히 적어주세요 (0/100)'
          value={inputs.description}
          isEmpty={inputs.description.length === 0}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </Description>
      <Scroll>
        <MenuMore onChange={handleMenuChange} />
      </Scroll>
      <BtnContainer>
        <Button text='취소하기' />
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
  gap: 100px;
  box-sizing: border-box;

  @media screen and (max-width: 1024px) {
    padding: 70px 50px;
  }
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
`;

const Representative = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  gap: 30px;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DescripInput = styled.textarea`
  display: flex;
  width: 100%;
  max-width: 567px;
  height: 200px;
  padding: 8px 12px;
  box-sizing: border-box;
  resize: none;
  align-items: top;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, isEmpty }) =>
      isEmpty ? theme.colors.text : theme.colors.coumo_purple};
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text_darkgray};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: 'Pretendard';
  font-size: ${({ theme }) => theme.fontSize.base};
  font-style: normal;
  font-weight: 400;
  line-height: 170%;

  &:focus {
    outline: none;
  }
`;

const BtnContainer = styled.div`
  max-width: 950px;
  display: flex;
  gap: 16px;
  justify-content: right;
`;
