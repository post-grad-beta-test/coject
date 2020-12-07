/* eslint-disable promise/always-return */
import { Box, Button, Grid, Heading, Paragraph, Text } from 'grommet'
import {
  Achievement,
  Add,
  Anchor,
  BusinessService,
  Channel,
  Dashboard,
  Deploy,
  FingerPrint,
  Group,
  Grow,
  Organization,
  PowerCycle,
} from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { setEvents } from '../actions/'
import { joinEvent } from '../slices/attendingEventSlice'
import { showAllEvents } from '../api/eventsApi'

const getWord = () => {
  let iconsArray = [
    <FingerPrint size='xlarge' />,
    <Achievement size='xlarge' />,
    <Anchor size='xlarge' />,
    <BusinessService size='xlarge' />,
    <Channel size='xlarge' />,
    <Dashboard size='xlarge' />,
    <Deploy size='xlarge' />,
    <Group size='xlarge' />,
    <Grow size='xlarge' />,
    <Organization size='xlarge' />,
  ]

  const iconName = iconsArray[Math.floor(Math.random() * 9)]
  return iconName
}
const EventCard = (userId) => {
  const [listEvents, setListEvents] = useState([])
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)

  const subscribe = (eventId, userId) => {
    dispatch(joinEvent(eventId, userId))
  }

  useEffect(() => {
    showAllEvents().then((arrayEvents) => {
      setListEvents(arrayEvents)
      dispatch(setEvents(arrayEvents))
    })
  }, [])
  let anIcon = getWord()
  return (
    <div className='container'>
      <Grid gap='medium' columns={{ count: 'fit', size: 'medium' }}>
        {listEvents.map((event) => (
          <div key={event.id}>
            <Box
              align='center'
              pad='small'
              background={{
                0: 'b',
                1: 'r',
                2: 'a',
                3: 'n',
                4: 'd',
                color: 'white',
                image: "url('')",
                position: 'bottom',
              }}
              round='medium'
              margin='medium'
              direction='column'
              alignSelf='center'
              animation={{ type: 'fadeIn', size: 'medium' }}
              elevation='medium'
            >
              <Box
                align='start'
                justify='start'
                pad='small'
                direction='row'
                alignSelf='start'
              />
              <Box
                align='center'
                justify='center'
                pad='xsmall'
                margin='xsmall'
                animation='zoomIn'
                hoverIndicator
                gap='xsmall'
              >
                {anIcon}

                <Heading
                  level='2'
                  size='medium'
                  margin='xsmall'
                  textAlign='center'
                  truncate={false}
                >
                  {event.name}
                </Heading>
                {/* <Image src={`project.images/project_image_${imageNum}.svg`} opacity="strong" /> */}
                <Text weight='bold' textAlign='center' size='medium'>
                  Dates: {event.date_start} - {event.date_end}
                </Text>
                <Paragraph size='small' margin='medium' textAlign='center'>
                  {event.description}
                </Paragraph>

                <Box
                  align='center'
                  justify='center'
                  pad='small'
                  direction='row-responsive'
                  flex
                  alignSelf='center'
                  basis='xxsmall'
                  gap='small'
                  margin='xsmall'
                >
                  {!isLoading && (
                    <Button
                      label='Join'
                      icon={<Add />}
                      onClick={() => subscribe(userId, event.id)}
                    />
                  )}
                  {isLoading && <PowerCycle label='Joining now...' />}
                </Box>
              </Box>
            </Box>
          </div>
        ))}
      </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    events: state.setEvents,
    userId: state.createUser.id,
  }
}
export default connect(mapStateToProps)(EventCard)
