export function getStyleInput() {
  return {
    width: 200
  };
}

export function getStyleMain() {
  return {
    display: 'flex',
    order: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    height: '100%',
    width: 'calc(100% - 2em)',
    maxWidth: 400,
    zIndex: 20,
    margin: '0 auto'
  };
}

export function getStyleMainBottom() {
  return {
    backgroundColor: '#ffffff',
    width: 'calc(100% - 2em)',
    margin: '0 auto',
    paddingBottom: 32
  };
}

export function getStyleSeparatorDiv() {
  return {
    position: 'relative',
    display: 'block',
    width: '100%',
    // marginTop: 20,
    marginBottom: 19,
    paddingBottom: 29
  };
}

export function getStyleSeparatorDiv2() {
  return {
    position: 'relative',
    display: 'block',
    width: '100%',
    // marginTop: 20,
    marginBottom: 19,
    paddingBottom: 20
  };
}

export function getStyleSeparatorLine() {
  return {
    backgroundColor: '#ccc',
    content: '',
    display: 'block',
    height: 1,
    position: 'absolute',
    bottom: 0,
    right: -5,
    left: -5
  };
}
