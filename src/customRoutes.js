import { Route } from 'react-router-dom';
import Callback from 'components/Callback';
// import LoginPage from 'components/LoginPage';
import auth from 'Auth';

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export default [
  <Route
    path="/callback"
    render={ (props) => {
      handleAuthentication(props);
      return <Callback {...props} />;
    }}
  />,
  // <Route
  //   path="/login"
  //   render={ (props) => {
  //     handleAuthentication(props);
  //     return <LoginPage {...props} auth={auth} />;
  //   }}
  // />,
];
