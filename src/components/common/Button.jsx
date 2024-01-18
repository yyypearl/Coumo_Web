import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/theme';

const Button = ({
  text,
  onClickBtn,
  color = COLORS.btn_lightgray,
  disabled,
  loading,
}) => {
  return (
    <Btn
      title={text}
      onClick={onClickBtn}
      disabled={disabled || loading}
      loading={loading}
      color={color}
    >
      {loading ? 'Loading...' : text}
    </Btn>
  );
};

export default Button;

export const Btn = styled.button`
  display: flex;
  height: 52px;
  padding: 8px 28px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
  border: none;
  border-radius: 12px;
  background: ${(props) => props.color};
  color: ${(props) =>
    props.color === COLORS.btn_lightgray
      ? COLORS.text_btn_darkgray
      : COLORS.white};
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 132%; /* 23.76px */
  letter-spacing: 0.54px;

  &:hover {
    background: ${COLORS.btn_lightgray};
    color: ${COLORS.text_btn_darkgray};
    background: ${COLORS.coumo_purple};
    color: ${COLORS.white};
  }

  &::before {
    content: '${(props) => (props.text ? props.text : '')}';
  }
`;
