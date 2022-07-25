import {
  Box,
  Card,
  CardContent,
  Avatar,
  CardHeader,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import userData from "./users"
import logsData from "./logs"

const image = require("./lineFinal.PNG")

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(3),
      },
      backgroundColor:"#a4aebd"
    },
    card: {
      display: "flex",
      justifyContent: "space-between"
    },
    img: {
      height: "100px",
      width: "200px",
      marginRight: "20px"
    },
    container:{
      border: "5px solid black",
      borderRadius: "10px",
    },
    cardHeader:{
      fontWeight:"bold",
      "& .MuiTypography-displayBlock" :{
        fontWeight:"bold",
        fontSize:"15px",
        maxWidth:"240px"
      }
    }
  })
);
function getSumOfImpression(logs, userId) {
  let sumOfImpression = 0;
  logs.forEach(log => {
    if (log.user_id === userId && log.type === "impression") {
      sumOfImpression++;
    }
  })
  return (sumOfImpression)
}

function getSumOfConversions(logs, userId) {
  let sumOfConversion = 0;
  logs.forEach(log => {
    if (log.user_id === userId && log.type === "conversion") {
      sumOfConversion++;
    }
  })
  return (sumOfConversion)
}

function getSumOfRevenue(logs, userId) {
  let sumOfRevenue = 0;
  logs.forEach(log => {
    if (log.user_id === userId) {
      sumOfRevenue += log.revenue;
    }
  })
  return parseFloat(sumOfRevenue).toFixed(2)
}

function App() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {userData.map(user =>
        <Card className={classes.container}>
          <CardHeader className={classes.cardHeader}
            avatar={<Avatar alt={user.name.charAt(0)} src={user.avatar}></Avatar>}
            title={user.name}
            subheader={user.occupation}
          />
          <CardContent className={classes.card}>
            <div >
              <img className={classes.img} src={image} alt="chart" />
            </div>
            <div>
              <div style={{ color: "orange", fontWeight: "bold", textAlign: "end" }}>{`${getSumOfImpression(logsData, user.id)}`}</div>
              <div style={{ opacity: "0.6" }}>Impressions </div>
              <div style={{ color: "blue", fontWeight: "bold", textAlign: "end" }}>{`${getSumOfConversions(logsData, user.id)}`}</div>
              <div style={{ opacity: "0.6" }}>Conversions </div>
              <div style={{ color: "green", fontWeight: "bold", textAlign: "end" }}>{`$${getSumOfRevenue(logsData, user.id)}`}</div>
            </div>
          </CardContent>
        </Card>)}
    </Box>
  );
}

export default App;