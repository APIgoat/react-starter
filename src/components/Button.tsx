import styled from "styled-components";

export const Button = styled.button`
  background: var(--mainColor);
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  line-height: 1;
  font-size: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: var(--mainBlueHover);
  }

  svg {
    fill: #fff;
  }

  &.minimal {
    color: #fff;
    background: none;

    &:hover {
      background: var(--accentDark);
    }
  }

  &.small {
    font-size: 12px;
    padding: 5px 7px;
  }
`;

export const SubmitBtn = styled.button`
  background: var(--mainBlue);
  border-radius: var(--borderRadius);
  border: none;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  height: 40px;
  line-height: 30px;
  padding: 5px 15px;
  transition: background var(--transitionTime);
  width: 100%;

  &:not(:disabled):hover {
    background: var(--mainBlueHover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
