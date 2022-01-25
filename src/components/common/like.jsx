const Like = (props) => {
  let classes = "fa-heart";
  if (props.liked) classes = "fas " + classes;
  else classes = "far " + classes;
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
    />
  );
};

export default Like;
