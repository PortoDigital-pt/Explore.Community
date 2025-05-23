import React from 'react';
import Route from 'found/Route';
import {
  getDefault,
  getComponentOrLoadingRenderer
} from '../../util/routerUtils';

export default config => {
  const { routes, blocks } = config.optionalNavigationItems;

  return (
    <Route path="/">
      <Route path="pois">
        <Route path="/">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois-list" */ './list/pois/page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois-list-map" */ './list/pois/pageMap'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
          }}
        </Route>
        <Route path=":id">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois" */ './details/pois/page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois-map" */ './details/pois/pageMap'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
          }}
        </Route>
      </Route>
      <Route path="events">
        <Route path="/">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events-list" */ './list/events/page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events-list-map" */ './list/events/pageMap'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
          }}
        </Route>
        <Route path=":id">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events" */ './details/events/page'
                  ).then(getDefault)
                }
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events-map" */ './details/events/pageMap'
                  ).then(getDefault)
                }
              />
            )
          }}
        </Route>
      </Route>
      {routes && (
        <Route path="routes">
          <Route path="/">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes-list" */ './list/routes/page'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes-list-map" */ './list/routes/pageMap'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              )
            }}
          </Route>
          <Route path=":id">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes" */ './details/routes/pois/detail-page'
                    ).then(getDefault)
                  }
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes-map" */ './details/routes/pageMap'
                    ).then(getDefault)
                  }
                />
              )
            }}
          </Route>
        </Route>
      )}
      {blocks && (
        <Route path="blocks">
          <Route path="/">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "blocks-list" */ './list/blocks/page'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "blocks-list-map" */ './list/blocks/pageMap'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              )
            }}
          </Route>
          <Route path=":id">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "blocks" */ './details/blocks/page'
                    ).then(getDefault)
                  }
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "blocks-map" */ './details/blocks/pageMap'
                    ).then(getDefault)
                  }
                />
              )
            }}
          </Route>
        </Route>
      )}
      <Route path="/">
        {{
          content: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "explore" */ './page').then(
                  getDefault
                )
              }
            />
          ),
          map: (
            <Route
              disableMapOnMobile={false}
              getComponent={() =>
                import(/* webpackChunkName: "explore-map" */ './pageMap').then(
                  getDefault
                )
              }
            />
          )
        }}
      </Route>
    </Route>
  );
};
