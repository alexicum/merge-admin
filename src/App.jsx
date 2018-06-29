// import { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import ProductsList, { DbProductsList } from 'modules/products';

// import ProductsListContainer from 'modules/products/components/ProductsListContainer';
// import './App.scss';

// https://github.com/marmelab/react-admin/issues/1935
// ReferenceError: Buffer is not defined... (on fetch)
global.Buffer = global.Buffer || require('buffer').Buffer;

const dataProvider = jsonServerProvider('http://localhost:3000');

const App = () => (
  <Admin dataProvider={dataProvider}>
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
