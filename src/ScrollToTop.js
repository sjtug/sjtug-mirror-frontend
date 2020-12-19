import { useLayoutEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}

export default withRouter(_ScrollToTop);
