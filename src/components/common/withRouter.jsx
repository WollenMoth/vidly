import { useParams, useNavigate, useLocation } from "react-router-dom";

const withRouter = (Child) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return (
      <Child
        {...props}
        params={params}
        navigate={navigate}
        location={location}
      />
    );
  };
};

export default withRouter;
