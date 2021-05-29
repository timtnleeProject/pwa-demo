import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      This link is broken or the page have been removed, back to{" "}
      <Link to="/">Home</Link>
    </div>
  );
}
