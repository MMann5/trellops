import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';
import { routes } from './routes';
import { onSetBoardKey } from './store/actions/boards-actions';
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
