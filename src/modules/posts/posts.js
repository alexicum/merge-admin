import { List, Datagrid, TextField } from 'react-admin';
import styles from './posts.scss';

const PostList = props => (
  <div className={styles.Posts}>
    {/* <List {...props} perPage={Number.MAX_SAFE_INTEGER - 1}> */}
    <List {...props} perPage={3}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="fullName" />
      </Datagrid>
    </List>
    <List className={styles.PostsRight} {...props} perPage={5}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="fullName" />
      </Datagrid>
    </List>
  </div>
);

export default PostList;
