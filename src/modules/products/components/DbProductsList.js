import { Component } from 'react';
import { List, Datagrid, TextField, crudGetList as crudGetListAction } from 'react-admin';
// import queryString from 'query-string';
import { connect } from 'react-redux';
import styles from './ProductsList.scss';


class DbProductsList extends Component {
  // console.log('DbProductList props: ', props);
  // const parsed = queryString.parse(props.location.search);
  // parsed.perPage = props.perPage;
  // parsed.page = 1;
  // const stingifiedSearch = queryString.stringify(parsed);
  // props.location.search = stingifiedSearch;

  // console.log(JSON.stringify(props.records, null, '  '));
  // return (
  //   <div className={styles.DbProducts}>
  //     {/* <List {...props} resource="dbProducts"> */}
  //     <List {...props}>
  //       {/* <List {...props} perPage={3} resource="dbProducts"> */}
  //       <Datagrid>
  //         <TextField source="id" />
  //         <TextField source="name" />
  //         <TextField source="fullName" />
  //         <TextField source="price" />
  //       </Datagrid>
  //     </List>
  //   </div>
  // );

  componentDidMount() {
    this.props.crudGetList(
      'dbProducts',
      { page: 1, perPage: 50 },
      { ...this.props.sort },
      {},
    );
  }

  render() {
    return (
      <Datagrid className={styles.DbProducts} data={this.props.data} ids={this.props.ids} currentSort={{}}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="fullName" />
        <TextField source="price" />
      </Datagrid>
    );
  }
}

const mapStateToProps = (state, props) => {
  // [Connect your component to the redux store](https://stackoverflow.com/a/44987685/1807736)
  // state.admin contains all the registered resources with their name as a key
  const resource = state.admin.resources[props.resource];

  // every resource has a "data" object with all entities mapped by id
  const allRecords = resource && resource.data;

  // every resource has a "list" object that has an array of ids of the currently filtered entities
  const filteredIDs = (resource && resource.list.ids) || [];

  return {
    // records: filteredIDs.map(id => allRecords[id]),
    data: allRecords,
    ids: filteredIDs,
  };
};

// connect your component to the store
export default connect(mapStateToProps, {
  crudGetList: crudGetListAction,
})(DbProductsList);

// export default DbProductsList;
