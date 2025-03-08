import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go to HomePage</Link>
    </div>
  );
}

export default NotFoundPage;
