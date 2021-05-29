import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

export function Wrap(props) {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
      {...props}
    ></div>
  );
}

function Item({ item }) {
  return (
    <div
      css={css`
        flex: 1 1 calc(50% - 8px);
        &:nth-of-type(odd) {
          margin-right: 8px;
        }
        @media (max-width: 760px) {
          flex: 1 0 100%;
        }
        margin-bottom: 8px;
        border: 1px solid skyblue;
        .img {
          background-image: url(${item.image});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 100%;
          padding-top: 50%;
        }
        .title {
          font-weight: bold;
          font-size: 1.3rem;
          padding: 8px;
        }
      `}
    >
      <div className="img"></div>
      <div className="title">{item.title}</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object,
};

export default Item;
