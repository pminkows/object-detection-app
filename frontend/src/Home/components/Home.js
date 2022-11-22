import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { Button, Avatar, Grid, Chip } from "@material-ui/core";
import { getScores, getTags, getUserTags } from "../actions";

import "./Home.scss";

import { Paper } from "@material-ui/core";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Home({
  getScores,
  scoresResponse,
  scoresError,
  scores,
  getTags,
  tagsResponse,
  tagsError,
  tags,
  getUserTags,
  usertags
}) {
  const classes = useStyles();

  var [dataScores, setDataScores] = useState(scores);
  var [dataTags, setDataTags] = useState(tags);
  var [dataUsertags, setDataUsertags] = useState(usertags.labels);
  var [score, setScore] = useState(usertags.total);

  useEffect(() => {
    getScores();
    getTags();
    getUserTags();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getScores(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getTags(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getUserTags(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setScore(usertags.total);
    setDataUsertags(usertags.labels)
  }, [usertags]);
  useEffect(() => setDataTags(tags), [tags]);
  useEffect(() => setDataScores(scores), [scores]);
  

  return (
    <Grid container spacing={3}>
      <Grid container direction="row" alignItems="center" className="marginPanel">
        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item>
          <Avatar>{localStorage.getItem('nick').slice(0,2).toLocaleUpperCase()}</Avatar>
          </Grid>
          <Grid item>
          <p className="rh-event-teaser-meta">Witaj <b>{localStorage.getItem('nick')}</b>! Twój wynik: <b>{score}</b></p>
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" color="secondary" className={classes.margin} href="/photo">
              Zrób zdjęcie
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} className="marginPanel">
        {dataUsertags.map((el) => (
          <Chip color="secondary" avatar={<Avatar>{el.count}</Avatar>} label={el._id} className="marginTotal" key={el._id}/>
        ))}
      </Grid>
      <Grid item xs={10}>
        <Paper>
          <Chart data={dataScores}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="count" argumentField="nick" />
            <Title text="Aktualne wyniki" />
            <EventTracker />
            <Tooltip />
          </Chart>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper>
          <Chart data={dataTags.sort((a, b) => { return a.total - b.total })} rotated>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="total" argumentField="_id" />
            <Title text="Najpopularniejsze tagi" />
            <EventTracker />
            <Tooltip />
          </Chart>
        </Paper>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return state.homeReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    getScores: () => {
      dispatch(getScores());
    },
    getTags: () => {
      dispatch(getTags());
    },
    getUserTags: () => {
      dispatch(getUserTags());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
