import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import { ViewTitle } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import history from 'historyWrapper';
// import Callback from 'components/Callback';

class LoginPage extends Component {
  state = {
    error: '',
  };

  componentDidMount() {
    this.handleAuthentication();
    // const credentials = {};
    // const { auth } = this.props;
    // if (!auth.isAuthenticated()) {

    // }
    // this.props.userLogin(credentials);
  }

  setError = (err) => {
    if (err !== this.state.error) {
      this.setState({ error: err });
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.auth.login();
  }

  handleAuthentication = () => {
    const { auth, location } = this.props;
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication()
        .then(() => {
          this.setError('');
          // TODO: как сделать редирект на страницу, где была AUTH_ERROR ?
          // userLogin принимает вторым путь куда редиректить (payload, pathName)
          // но как его получить?
          this.props.userLogin({});
        })
        .catch(err => this.setError(`Ошибка: ${err.error}. ${err.errorDescription}`));
    } else {
      if (!auth.isAuthenticated()) {
        auth.login();
        return;
      }
      this.props.userLogin({});
    }
  };

  renderError = () => {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    return [
      <Paper>
        {error}
      </Paper>,
      <Button variant="contained" color="primary" onClick={this.submit}>
        Вход
      </Button>,
    ];
  };

  render() {
    // const { auth } = this.props;
    // <form onSubmit={this.submit}>
    //   {!auth.isAuthenticated() &&
    //     <button type="submit">Войти</button>
    //   }
    // </form>

    return (
      <Card>
        {/* <Callback /> */}
        <ViewTitle title="Идентификация пользователя" />
        { !this.state.error && <CardContent>Идентификация...</CardContent> }
        {this.renderError()}
      </Card>
    );
  }
}

LoginPage.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

export default connect(undefined, { userLogin })(LoginPage);
