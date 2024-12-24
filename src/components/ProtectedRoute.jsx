import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getUser } from "../services/userService"; 

const ProtectedRoute = ({ children }) => {
    const user = getUser();
    return user ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
