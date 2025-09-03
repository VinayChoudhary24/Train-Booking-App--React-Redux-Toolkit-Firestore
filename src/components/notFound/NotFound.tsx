import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.key === "default") {
        // "default" means no history entry (user typed URL directly, like /something)
        navigate("/", { replace: true });
        // we can see if to Clear user from state and localStorage
      } else {
        // otherwise, go back in history
        navigate(-1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <>
      <h1>OOOPPSSS!!!!! Something went wrong</h1>
      {/* <p>Redirecting you...</p> */}
    </>
  );
}

export default NotFoundPage;
