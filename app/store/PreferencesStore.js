import Store from 'fluxible/addons/BaseStore';
import Cookies from 'universal-cookie';
import { isLangMockEn } from '../util/browser';

/* Language is stored in cookie, server should set the language based on browser
 * accepted languages
 */
class PreferencesStore extends Store {
  static storeName = 'PreferencesStore';

  constructor(dispatcher) {
    super(dispatcher);

    const { config } = dispatcher.getContext();
    this.availableLanguages = config.availableLanguages;
    this.defaultLanguage = config.defaultLanguage;

    if (isLangMockEn) {
      this.setLanguage('en');
    }
    this.cookies = new Cookies();

    const language = this.cookies.get('lang');
    if (this.availableLanguages.indexOf(language) === -1) {
      // illegal selection, use default
      this.language = this.defaultLanguage;
    } else {
      this.language = language;
    }

    this.onboarded = this.cookies.get('onboarded') === 'true';
    this.allowedCookies = this.cookies.get('cookies') === 'true';
    this.firstAccess = this.cookies.get('first-access') ?? '/';
  }

  getLanguage() {
    return this.language;
  }

  getOnboarded() {
    return this.onboarded;
  }

  getAllowedCookies() {
    return this.allowedCookies;
  }

  getFirstAccess() {
    return this.firstAccess;
  }

  setLanguage(language) {
    if (this.availableLanguages.indexOf(language) === -1) {
      return;
    }

    this.cookies.set('lang', language, {
      // Good up to one year
      maxAge: 365 * 24 * 60 * 60
    });
    this.language = language;
    this.emitChange();
  }

  setOnboarded({ onboarded, createdAt }) {
    this.cookies.set('onboarded', onboarded, {
      // Good up to one year
      maxAge: 365 * 24 * 60 * 60
    });
    if (createdAt) {
      this.cookies.set('onboarded-created-at', createdAt, {
        // Good up to one year
        maxAge: 365 * 24 * 60 * 60
      });
    }

    this.onboarded = onboarded;
    this.emitChange();
  }

  setAllowedCookies(allowedCookies) {
    this.cookies.set('cookies', allowedCookies, {
      // Good up to one year
      maxAge: 365 * 24 * 60 * 60
    });

    this.allowedCookies = allowedCookies;
    this.emitChange();
  }

  setFirstAccess(firstAccess) {
    this.firstAccess = firstAccess;
    this.emitChange();
  }

  static handlers = {
    SetLanguage: 'setLanguage',
    SetOnboarded: 'setOnboarded',
    SetAllowedCookies: 'setAllowedCookies'
  };
}

export default PreferencesStore;
