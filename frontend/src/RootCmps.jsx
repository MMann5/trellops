import React from 'react';
import { Switch, Route } from 'react-router';
import { routes } from './routes';
// import {UserDetails} from './pages/user-details'

export class App extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
            {/* <Route path="/user/:id" component={UserDetails} /> */}
          </Switch>
        </main>
      </div>
    );
  }
}
