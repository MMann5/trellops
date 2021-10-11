import React from 'react';
import { Switch, Route } from 'react-router';
import { routes } from './routes';
export function App() {
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
        </Switch>
      </main>
    </div>
  );
}
