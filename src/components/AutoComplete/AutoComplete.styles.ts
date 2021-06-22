import { css } from "@emotion/react";

export const container = css`
  position: relative;
`;

export const svg = css`
  margin-right: 8px;
`;

export const ul = (hasError: boolean) => css`
  padding: 0;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  margin: ${hasError ? "-25px 0 0" : "0"};
  border-top: 0;
  z-index: 1000;
  list-style: none;
  transition: "opacity .1s ease";
  border-radius: 0 0 0.28571429rem 0.28571429rem;
  box-shadow: "0 2px 3px 0 rgba(34,36,38,.15)";
  border: ${hasError ? "0" : "1px solid #e5e5e5"};
  min-width: 200px;
  background-color: white;
  width: 100%;

  & > li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #e5e5e5;
    border-top: none;
    height: 56px;
    padding: 16px 24px;
    cursor: pointer;
    border-radius: 0 0 0.28571429re3 0.28571429rem;
  }
`;

export const highlight = (isHighlighted: boolean, color: string) => css`
  background-color: ${isHighlighted ? color : "auto"};
`;

export const link = css`
  cursor: pointer;
`;

export const searchIcon = css`
  cursor: pointer;
`;

export const right = (hasError: boolean) =>
  css`
    display: flex;
    position: absolute;
    right: 0;
    margin-top: ${hasError ? "-68px" : "-40px"};
    align-items: center;
  `;

export const inputError = css`
  margin-top: -68px;
`;
