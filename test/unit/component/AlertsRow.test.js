import React from 'react';

import { shallowWithIntl } from '../helpers/mock-intl-enzyme';
import AlertRow from '../../../app/component/AlertRow';
import { AlertEntityType } from '../../../app/constants';
import { PREFIX_STOPS, PREFIX_ROUTES } from '../../../app/util/path';
import { mockContext } from '../helpers/mock-context';

describe('<AlertRow />', () => {
  it('should not render a div for the alert if description is missing', () => {
    const props = {
      expired: false,
      index: 0,
      feed: 'foo',
      entities: [
        {
          __typename: AlertEntityType.Route,
          mode: 'BUS',
          shortName: '1',
          gtfsId: 'foo:1'
        }
      ]
    };
    const wrapper = shallowWithIntl(<AlertRow {...props} />, {
      context: mockContext
    });
    expect(wrapper.find('.alert-row')).to.have.lengthOf(0);
  });

  it('should not render a div for the header if it is missing', () => {
    const props = {
      expired: false,
      description: 'Lorem ipsum',
      index: 0,
      feed: 'foo',
      entities: [
        {
          __typename: AlertEntityType.Route,
          mode: 'BUS',
          shortName: '1',
          gtfsId: 'foo:1'
        }
      ]
    };
    const wrapper = shallowWithIntl(<AlertRow {...props} />, {
      context: mockContext
    });
    expect(wrapper.find('.alert-header')).to.have.lengthOf(0);
  });

  it('should not render a div for the description if it is missing', () => {
    const props = {
      expired: false,
      index: 0,
      feed: 'foo',
      entities: [
        {
          __typename: AlertEntityType.Route,
          mode: 'BUS',
          shortName: '1',
          gtfsId: 'foo:1'
        }
      ]
    };
    const wrapper = shallowWithIntl(<AlertRow {...props} />, {
      context: mockContext
    });
    expect(wrapper.find('.alert-body')).to.have.lengthOf(0);
  });

  it('should render the identifier', () => {
    const props = {
      gtfsIds: 'HSL:2097N',
      description: 'Lorem ipsum',
      index: 0,
      feed: 'foo',
      entities: [
        {
          __typename: AlertEntityType.Route,
          mode: 'BUS',
          shortName: '97N',
          gtfsId: 'foo:1'
        }
      ]
    };
    const wrapper = shallowWithIntl(<AlertRow {...props} />, {
      context: mockContext
    });
    expect(wrapper.find('.bus')).to.have.lengthOf(1);
  });

  it('should render link for route', () => {
    const props = {
      showLinks: true,
      description: 'Lorem ipsum',
      index: 0,
      feed: 'foo',
      entities: [
        {
          __typename: AlertEntityType.Route,
          mode: 'BUS',
          shortName: '97N',
          gtfsId: 'HSL:2097N'
        }
      ]
    };
    const wrapper = shallowWithIntl(<AlertRow {...props} />, {
      context: mockContext
    });
    expect(wrapper.find('.alert-row-link').get(0).props.to).to.equal(
      `/${PREFIX_ROUTES}/HSL:2097N/${PREFIX_STOPS}`
    );
  });

  it('should render the url', () => {
    const props = {
      url: 'https://www.hsl.fi',
      description: 'Liirum laarum',
      index: 0,
      feed: 'foo',
      entities: [
        {
          __typename: AlertEntityType.Route,
          mode: 'BUS',
          shortName: '97N',
          gtfsId: 'HSL:2097N'
        }
      ]
    };
    const wrapper = shallowWithIntl(<AlertRow {...props} />, {
      context: mockContext
    });
    expect(wrapper.find('.alert-url')).to.have.lengthOf(1);
  });

  it("should add the http prefix to the url if it's missing", () => {
    const props = {
      url: 'www.hsl.fi',
      description: 'Liirum laarum',
      index: 0,
      feed: 'foo',
      entities: [
        {
          __typename: AlertEntityType.Route,
          mode: 'BUS',
          shortName: '97N',
          gtfsId: 'HSL:2097N'
        }
      ]
    };
    const wrapper = shallowWithIntl(<AlertRow {...props} />, {
      context: mockContext
    });
    expect(wrapper.find('.alert-url').prop('href')).to.equal(
      'http://www.hsl.fi'
    );
  });
});
