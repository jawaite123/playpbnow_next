import React from 'react';
import {
    Button,
    Container,
    Header,
    Icon
  } from 'semantic-ui-react'

const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
        as='h1'
        content='Play Pickleball Now!'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '.5em' : '.5em',
        }}
      />
    </Container>
  )

  export default HomepageHeading