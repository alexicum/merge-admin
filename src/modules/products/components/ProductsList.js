import { List, Datagrid, TextField } from 'react-admin';
import { mapProps, compose } from 'recompose';
import { connect } from 'react-redux';
import styles from './ProductsList.scss';
import DbProductsList from './DbProductsList';
// import { initSearch, findMatches } from './selectors';

const dbProducts = 'dbProducts';

const withConnect = connect((state, props) => {
  // Возвращаем записи из dbProducts
  const dbProductsResource = state.admin.resources[dbProducts];
  const allRecords = dbProductsResource.data;
  return {
    // records: filteredIDs.map(id => allRecords[id]),
    dbProductsData: allRecords,
  };
});

const withMatch = mapProps(({
  data,
  dbProductsData, dispatch, // нужны только здесь: дальше не передаются
  ...rest
}) => {
  let newData;
  if (dbProductsData && Object.entries(dbProductsData).length > 0) {
    const dataArray = Object.entries(data);
    if (dataArray.length > 0) {
      // initSearch(Object.values(dbProductsData), 'fullName');
      newData = {};
      Object.entries(data).forEach((rec) => {
        // const matches = findMatches(Object.values(dbProductsData));
        newData[rec[0]] = { ...rec[1], matches: 0 };
      });
    }
  }
  return {
    ...rest,
    data: newData ? { ...newData, fetchedAt: data.fetchedAt } : data,
  };
});

const DatagridExt = compose(withConnect, withMatch)(Datagrid);

const ProductsList = (props) => {
  // console.log('ProductsList props: ', props);
  // const { location } = props;
  // location.search = '';
  // const newProps = { ...props, location };

  const sortInfo = {
    field: 'fullName',
    order: 'ASC',
  };

  return (
    <div className={styles.SiteProducts}>
      {/* <List {...props} perPage={Number.MAX_SAFE_INTEGER - 1}> */}
      <List {...props} perPage={10} sort={sortInfo}>
        <DatagridExt>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="matches" />
          <TextField source="fullName" />
        </DatagridExt>
      </List>
      <DbProductsList {...props} perPage={50} resource={dbProducts} sort={sortInfo} />
      {/* <List className={styles.DbProducts} {...props} perPage={5}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="fullName" />
        </Datagrid>
      </List> */}
    </div>
  );
};

export default ProductsList;

// const mapStateToProps = (state, props) => {
//   // // state.admin contains all the registered resources with their name as a key
//   // const resource = state.admin.resources[props.resource];
//   // // every resource has a "data" object with all entities mapped by id
//   // const allRecords = resource && resource.data;
//   // // every resource has a "list" object that has an array of ids of the currently filtered entities
//   // const filteredIDs = (resource && resource.list.ids) || [];

//   const dbProductsResource = state.admin.resources[dbProducts];
//   const allRecords = dbProductsResource.data;
//   const

//   return {
//     // records: filteredIDs.map(id => allRecords[id]),
//     data: allRecords,
//     ids: filteredIDs,
//   };
// };

