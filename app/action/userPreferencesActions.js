export function setLanguage(actionContext, language) {
  actionContext.dispatch('SetLanguage', language);
}

export function setOnboarded(actionContext, onboarded) {
  actionContext.dispatch('SetOnboarded', onboarded);
}

export function setAllowedCookies(actionContext, allowedCookies) {
  actionContext.dispatch('SetAllowedCookies', allowedCookies);
}
