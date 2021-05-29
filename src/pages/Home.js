import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Item, { Wrap } from "../components/Item";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const [length, setLength] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/list?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setLists(res.data);
        setLength(res.length);
        setLoading(false);
      });
  }, [page]);

  return (
    <>
      {Array.from(Array(length))
        .map((_, i) => i + 1)
        .map((i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
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
      <Wrap
        css={css`
          margin-top: 12px;
        `}
      >
        {lists.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Wrap>
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
    </>
  );
}
