import React from "react";
import SocialLogin from "react-social-login";

class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props }:any = this.props;
    return (
      <button type="button" onClick={triggerLogin} {...props} style={{background:"transparent", border:"none",padding:15, display: "flex", alignItems:"center", cursor: "pointer"}}>
        {children}
      </button>
    );
  }
}

export default SocialLogin(SocialButton);
