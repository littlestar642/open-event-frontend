import { moduleForComponent, test } from 'ember-qunit';
import destroyApp from './destroy-app';
import startApp from './start-app';
import l10nTestHelper from 'ember-l10n/test-helpers';
import L10n from 'ember-l10n/services/l10n';
import Ember from 'ember';
const { Service } = Ember;

const routingStub = Service.extend({
  router: {
    router: {
      state: {
        params: {
          'events.view': {
            event_id: 1
          }
        }
      }
    },
    generate() {
      return 'http://dummy-url.com';
    }
  }
});


export default function(path, name, testCase = null) {
  moduleForComponent(path, name, {
    integration: true,

    beforeEach() {
      this.register('service:routing', routingStub);
      this.inject.service('routing', { as: 'routing' });
      this.register('service:l10n', L10n);
      this.inject.service('l10n', { as: 'l10n' });
      this.application = startApp();
      l10nTestHelper(this);
    },

    afterEach() {
      destroyApp(this.application);
    }
  });

  if (testCase) {
    test('it renders', testCase);
  }
}
