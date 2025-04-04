import React from 'react';
import Route from 'found/Route';
import {
  getDefault,
  getComponentOrLoadingRenderer
} from '../../util/routerUtils';

export default () => (
  <Route path="/profile">
    <Route path="/">
      {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "profile" */ './page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
      }}
    </Route>
    <Route path="favourites">
        <Route path="/">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "favourites" */ './favourites/page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
          }}
        </Route>
      </Route>
  </Route>
);
