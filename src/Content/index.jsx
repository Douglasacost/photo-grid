import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { LoginForm } from './Auth/Login'
import { history } from '../helpers'
import { PrivateRoute } from './Components/PrivateRoute';
import HeaderButton from './Components/Misc/HeaderButton';
import { RegisterForm } from './Auth/Register';
import PhotoGrid from './Components/PhotoGrid';
import Dropdown from './Components/Misc/DropDown';
import { useSelector, useDispatch } from 'react-redux';
import HeaderLink from './Components/Misc/HeaderLink';
import { photoActions } from '../actions';
import { EditForm } from './Forms/EditProfile';
import MessageAlert from './Components/PhotoGrid/MessageAlert';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Photo Album App'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Easy way to submit your photos.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button onClick={() => history.push('/register')} primary size='huge'>
      Register
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

function DesktopContainer(props) {
  const dispatch = useDispatch();
  const [fixed, setFixed] = useState(false);
  const hideFixedMenu = () => setFixed(false)
  const showFixedMenu = () => setFixed(true)

  const setView = (view) => {
    dispatch(photoActions.setView(view))
  }

  const { children } = props
  const imLogged = useSelector(state => state.authentication.loggedIn);
  const alert = useSelector(state => state.alert);
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: '100vh', padding: '1em 0em' }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size='large'
          >
            <Container>
            <HeaderLink setView={setView} text="All" path="/albums" active={true}/>
            <HeaderLink setView={setView} text="Only my Photos" path="/albums" active={false}/>
            <HeaderLink text="Edit my profile" path="/edit-profile" active={false}/>
            
              <Menu.Item position='right'>
                {!imLogged ? <>
                  <HeaderButton text="Log in" path="/login" inverted={!fixed} />
                  <HeaderButton text="Sign Up" path="/register" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} />
                </> :
                  <HeaderButton text="Log out" path="/home" inverted={!fixed} />
                }
              </Menu.Item>
            </Container>
          </Menu>
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/albums" component={PhotoGrid} />
              <PrivateRoute exact path="/edit-profile" component={EditForm} />
              <Route path="/" exact component={HomepageHeading} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
          { alert.message && <MessageAlert message={alert.message} type={alert.type} />}
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  )
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: '100vh', padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const App = () => (
  <ResponsiveContainer />
)

export default App