// import { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import ProductsList, { DbProductsList } from 'modules/products';
import authProvider from 'authProvider';
import dataProvider from 'dataProvider';
import customRoutes from 'customRoutes';
import auth from 'Auth';
import Dashboard from 'components/Dashboard';
import LoginPage from 'components/LoginPage';
import history from 'historyWrapper';

// import ProductsListContainer from 'modules/products/components/ProductsListContainer';
// import './App.scss';

// https://github.com/marmelab/react-admin/issues/1935
// ReferenceError: Buffer is not defined... (on fetch)
// global.Buffer = global.Buffer || require('buffer').Buffer;

const login = props => <LoginPage {...props} auth={auth} />;

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={login}
    // customRoutes={customRoutes}
    history={history}
  >
    <Resource name="siteProducts" list={ProductsList} />
    <Resource name="dbProducts" list={DbProductsList} />
    {/* <Resource name="users" list={PostList} /> */}
  </Admin>
);

export default App;

// import { Component } from 'react';
// import './App.css';

// export default class App extends Component {
//   state = {
//     name: 'merge-admin',
//   };

//   render() {
//     return (
//       <div className="App">
//         <h1>Welcome to {this.state.name}</h1>
//       </div>
//     );
//   }
// }
