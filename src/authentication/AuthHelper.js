import axios from 'axios';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

const auth = {
  isAuthenticated: localStorage.getItem('jwt') && localStorage.getItem('userID'),
  setSession(cb) {
    if (!localStorage.getItem('jwt') || !localStorage.getItem('userID')) {
      var query = queryString.parse(window.location.search);
      if (query.token && query.user) {
        localStorage.setItem('jwt', query.token);
        localStorage.setItem('userID', query.user);
        this.isAuthenticated = true;
        return cb(true);
      }
    }
    return cb(false);
  },
  /**
   * Validate that the JWT in LocalStorage is also 
   * associated with the email in LocalStorage */
  validateToken(cb) {
    const token = localStorage.jwt;
    if (token) {
      axios.post(`${process.env.REACT_APP_SERVICE_URL}/auth/validate`, {
        UserID: localStorage.userID
      }, {
        headers: { 'Authorization': 'bearer ' + localStorage.jwt }
      }).then((result) => {
        return cb(null, result.data.success);
      }).catch((err) => {
        return cb(err, null);
      });
    }
  },
  logout(cb) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userID');
    this.isAuthenticated = false;
    cb();
  }
}

export default withRouter(auth);