import React, { Component } from 'react';
import {
  Grid,
  Segment,
  List,
  Button,
  Image, Input,
  Icon, Loader,
  Label, Divider, Modal, Header
} from 'semantic-ui-react'
import ResponsiveContainer from '../components/ResponsiveContainer'
import Footer from '../components/Footer'
import moment from 'moment'
import Link from "next/link";
import Head from "next/head";
import fetch from 'isomorphic-unfetch'

const AddPlayerButton = props => (
    <Button as='div' labelPosition='left'>
      <Label as='a' basic pointing='right'>
        {props.playerCount}
      </Label>
      <Button icon onClick={ () => {
        if(props.isLoggedIn) {
          addPlayer({ variables: {scheduleId: props.schedule._id} })
        } else {
        //  this.setState({showLoginModal: true})
          props.showLoginModal()

        }
        }} >
        <Icon name='check' />
        I'm going!
      </Button>
    </Button>
)


export default class Index extends Component {

  state = {
    isLoggedIn: false,
    showLoginModal: false,
    email: '',
    schedules: []
  }

  async componentDidMount() {
    const schedules = await fetch('http://localhost:3000/api/places')
      .then(res => res.body)
      console.log(schedules)
    this.setState(schedules)
    let token = localStorage.getItem('token')
    if(token) this.setState({isLoggedIn: true})
  }

  handleOpen = () => this.setState({ showLoginModal: true })

  handleClose = () => this.setState({ showLoginModal: false })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleLogin = (token) => {
    localStorage.setItem('token', token)
    this.setState({isLoggedIn: true})
  }

  render() {

    const { isLoggedIn, email, showLoginModal, schedules } = this.state


    return (
      <ResponsiveContainer>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
          />
        </Head>
        <Segment style={{ padding: '8em 0em' }} vertical>


          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={5}>
                <p>Map Here Maybe</p>
              </Grid.Column>
              <Grid.Column floated='right' width={8}>
                <List divided verticalAlign='middle'>
                  {schedules.map(schedule => {
                    console.log(schedule)
                    return (
                      <List.Item key={schedule._id}>
                        <List.Content floated='right'>
                          <AddPlayerButton schedule={schedule} isLoggedIn={this.state.isLoggedIn} showLoginModal={() => {console.log('showLoginModal')}}></AddPlayerButton>
                        </List.Content>
                        <Icon size='large' name='map marker alternate' />
                        <List.Content>
                          <List.Header as='a'>{schedule.place ? schedule.place.title : ""}</List.Header>
                          {moment(schedule.datetimefrom).format("ddd, hA")} - {moment(schedule.datetimeto).format("hA")}
                        </List.Content>
                      </List.Item>
                    )}
                  )}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Footer></Footer>
      </ResponsiveContainer>
    )
  }
}


