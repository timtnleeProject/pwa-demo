import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Item, { Wrap } from "../components/Item";
import NotifyPermission from "../components/NotifyPermission";

// eslint-disable-next-line react/prop-types
const Pagination = ({ length, onClick, page }) => (
  <div
    css={css`
      display: flex;
      justify-content: center;
    `}
  >
    {Array.from(Array(length))
      .map((_, i) => i + 1)
      .map((i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          css={css`
            padding: 8px 12px;
            border: 1px solid skyblue;
            cursor: pointer;
            color: skyblue;
            background-color: white;
            ${page === i &&
            css`
              color: white;
              background-color: skyblue;
            `}
          `}
        >
          {i}
        </button>
      ))}
  </div>
);
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [length, setLength] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    setLoading(true);
    fetch(`/api/list?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setLists(res.data);
        setLength(res.length);
        setLoading(false);
        window.scrollTo({
          top: 0,
        });
      })
      .catch(() => {
        setLists([]);
        setError("Something wrong, please try it later.");
      });
  }, [page]);

  return (
    <>
      <Pagination length={length} page={page} onClick={(i) => setPage(i)} />
      <Wrap
        css={css`
          margin-top: 12px;
        `}
      >
        {error}
        {lists.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Wrap>
      <Pagination length={length} page={page} onClick={(i) => setPage(i)} />
      {loading && (
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            padding-top: 5vh;
            background-color: rgba(255, 255, 255, 0.5);
          `}
        >
          LOADING...
        </div>
      )}
      <NotifyPermission />
    </>
  );
}
