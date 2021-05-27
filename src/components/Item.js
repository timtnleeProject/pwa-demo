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
        flex: 1 1 50%;
        @media (max-width: 760px) {
          flex: 1 0 100%;
        }
        padding: 8px;
        border: 1px solid lightblue;
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
          font-size: 1.5rem;
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
