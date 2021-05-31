import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      border: "1px solid #f50057",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    iconButton: {
      marginRight: "3px",
      padding: "2px",
    },
  }));
  const classes = useStyles();
  return (
    <div className="search">
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search ..."
          inputProps={{ "aria-label": "search" }}
        />
        <Divider className={classes.divider} orientation="vertical" />

        <IconButton
          //  type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
export default Search;
