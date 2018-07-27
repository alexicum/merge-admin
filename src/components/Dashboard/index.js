import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ViewTitle } from 'react-admin';

const Dashboard = props => (
  <Card>
    <ViewTitle title="Welcome to the administration" />
    <CardContent>{props && JSON.stringify(props)}</CardContent>
  </Card>
);

export default Dashboard;
