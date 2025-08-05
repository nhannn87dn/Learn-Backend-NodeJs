import { useNavigate } from "react-router";

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p>Please check the URL or return to the home page.</p>
        <button onClick={() => {
            navigate('/'); // Navigate to home page

        }}>
            Go to Home
        </button>
    </div>
  )
}

export default NotFoundPage