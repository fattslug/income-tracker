import React, { Component } from "react";
import { Anchor } from "grommet";

import styles from "../../screens/Login.module.scss";

class LoginButton extends Component {
  render() {
    return (
      <div className={styles["button-container"]}>
        <Anchor
          style={{ width: "100%" }}
          href={process.env.REACT_APP_SERVICE_URL + "/auth/google"}
        >
          <button className={styles.login}>Sign In</button>
          {/* <img
            width="200px"
            src="assets/images/google-sign-in.png"
            alt="Login with Google"
          /> */}
        </Anchor>
      </div>
    );
  }
}

export default LoginButton;
