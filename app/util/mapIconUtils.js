import memoize from 'lodash/memoize';
import getSelector from './get-selector';
import glfun from './glfun';
import { ParkTypes, TransportMode } from '../constants';

/**
 * Corresponds to an arc forming a full circle (Math.PI * 2).
 */
const FULL_CIRCLE = Math.PI * 2;

/**
 * Return icon style, width and height for stop icons
 *
 * @param {string} type one of 'stop', 'citybike', 'hybrid', 'scooter'
 * @param {number} zoom
 * @param {bool} isHighlighted
 */
export function getStopIconStyles(type, zoom, isHighlighted) {
  const styles = {
    stop: {
      13: {
        style: 'small',
        width: 10,
        height: 10
      },
      14: {
        style: 'large',
        width: 16,
        height: 22
      },
      15: {
        style: 'large',
        width: 20,
        height: 27
      },
      16: {
        style: 'large',
        width: 24,
        height: 33
      }
    },
    hybrid: {
      13: {
        style: 'small',
        width: 10,
        height: 10
      },
      14: {
        style: 'large',
        width: 17,
        height: 37
      },
      15: {
        style: 'large',
        width: 21,
        height: 45
      },
      16: {
        style: 'large',
        width: 25,
        height: 55
      }
    },
    citybike: {
      13: {
        style: 'small',
        width: 10,
        height: 10
      },
      14: {
        style: 'medium',
        width: 35,
        height: 35
      },
      15: {
        style: 'medium',
        width: 45,
        height: 45
      },
      16: {
        style: 'large',
        width: 55,
        height: 55
      },
      17: {
        style: 'large',
        width: 60,
        height: 60
      }
    },
    scooter: {
      13: {
        style: 'small',
        width: 10,
        height: 10
      },
      14: {
        style: 'medium',
        width: 16,
        height: 22
      },
      15: {
        style: 'medium',
        width: 20,
        height: 27
      },
      16: {
        style: 'large',
        width: 35,
        height: 43
      }
    }
  };

  if (!styles[type]) {
    return null;
  }
  if (type === 'citybike' && isHighlighted) {
    return {
      style: 'large',
      width: 90,
      height: 90
    };
  }

  if (zoom < 17 && isHighlighted) {
    // use bigger icon for hilighted stops always
    return styles[type][17];
  }
  if (zoom < 13 && type !== 'citybike') {
    return null;
  }
  if (zoom < 13) {
    return styles[type][13];
  }
  if (zoom > 17) {
    return styles[type][17];
  }
  return styles[type][zoom];
}

export function getBlockIconStyle() {
 return { width: 50, height: 50, style: 'large' }; 
}

/**
 * Get width and height for icons
 *
 * @param {number} zoom
 * @param {boolean} [isHighlighted]
 */
export function getIconStyles(zoom, isHighlighted) {
  const styles = {
    13: {
      style: 'small',
      width: 10,
      height: 10
    },
    14: {
      style: 'large',
      width: 30,
      height: 30
    },
    15: {
      style: 'large',
      width: 40,
      height: 40
    },
    16: {
      style: 'large',
      width: 50,
      height: 50
    },
    17: {
      style: 'large',
      width: 60,
      height: 60
    }
  };

  if (isHighlighted) {
    return {
      style: 'large',
      width: 80,
      height: 80
    };
  }

  if (zoom > 17) {
    return styles[17];
  }
  if (zoom < 13) {
    return styles[13];
  }

  return styles[zoom];
}

export const getCaseRadius = memoize(
  glfun({
    base: 1.15,
    stops: [
      [11.9, 0],
      [12, 1.5],
      [22, 26]
    ]
  })
);

export const getStopRadius = memoize(
  glfun({
    base: 1.15,
    stops: [
      [11.9, 0],
      [12, 1],
      [22, 24]
    ]
  })
);

export const getHubRadius = memoize(
  glfun({
    base: 1.15,
    stops: [
      [14, 0],
      [14.1, 2],
      [22, 20]
    ]
  })
);

export const getMapIconScale = memoize(
  glfun({
    base: 1,
    stops: [
      [13, 0.8],
      [20, 1.6]
    ]
  })
);

const getStyleOrDefault = (selector, defaultValue = {}) => {
  const cssRule = selector && getSelector(selector.toLowerCase());
  return (cssRule && cssRule.style) || defaultValue;
};

export const getColor = memoize(selector => getStyleOrDefault(selector).color);

export const getFill = memoize(selector => getStyleOrDefault(selector).fill);

export const getModeColor = mode => getColor(`.${mode}`);

function getImageFromSpriteSync(icon, width, height, fill) {
  if (!document) {
    return null;
  }
  const symbol = document.getElementById(icon);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  const vb = symbol.viewBox.baseVal;
  svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`);

  // TODO: Simplify after https://github.com/Financial-Times/polyfill-service/pull/722 is merged
  Array.prototype.forEach.call(symbol.childNodes, node => {
    const child = node.cloneNode(true);
    if (node.style && !child.attributes.fill) {
      child.style.fill = fill || window.getComputedStyle(node).color;
    }
    svg.appendChild(child);
  });

  if (fill) {
    const elements = svg.getElementsByClassName('modeColor');
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('fill', fill);
    }
  }
  const image = new Image(width, height);
  image.src = `data:image/svg+xml;base64,${btoa(
    new XMLSerializer().serializeToString(svg)
  )}`;
  return image;
}

function getImageFromSpriteAsync(icon, width, height, fill) {
  return new Promise(resolve => {
    // TODO: check that icon exists using MutationObserver
    const image = getImageFromSpriteSync(icon, width, height, fill);
    image.onload = () => resolve(image);
  });
}

const getImageFromSpriteCache = memoize(
  getImageFromSpriteAsync,
  (icon, w, h, fill) => `${icon}_${w}_${h}_${fill}`
);

function drawIconImage(image, tile, geom, width, height) {
  tile.ctx.drawImage(
    image,
    geom.x / tile.ratio - width / 2,
    geom.y / tile.ratio - height / 2
  );
}

function calculateIconBadgePosition(
  coord,
  tile,
  imageSize,
  badgeSize,
  scaleratio
) {
  return coord / tile.ratio - imageSize / 2 - badgeSize / 2 + 2 * scaleratio;
}

function drawIconImageBadge(
  image,
  tile,
  geom,
  imageSize,
  badgeSize,
  scaleratio
) {
  tile.ctx.drawImage(
    image,
    calculateIconBadgePosition(geom.x, tile, imageSize, badgeSize, scaleratio),
    calculateIconBadgePosition(geom.y, tile, imageSize, badgeSize, scaleratio)
  );
}

function getSelectedIconCircleOffset(zoom, ratio) {
  if (zoom > 15) {
    return 94 / ratio;
  }
  return 78 / ratio;
}

function drawSelectionCircle(
  tile,
  x,
  y,
  radius,
  largeStyle,
  showAvailabilityBadge = false
) {
  const zoom = tile.coords.z - 1;
  const selectedCircleOffset = getSelectedIconCircleOffset(zoom, tile.ratio);

  let arc = FULL_CIRCLE;
  if (showAvailabilityBadge) {
    arc *= 3 / 4;
  }

  tile.ctx.beginPath();
  // eslint-disable-next-line no-param-reassign
  tile.ctx.lineWidth = 2;
  if (largeStyle) {
    tile.ctx.arc(
      x + selectedCircleOffset,
      y + 1.85 * selectedCircleOffset,
      radius - 2,
      0,
      arc
    );
  } else {
    tile.ctx.arc(
      x + selectedCircleOffset,
      y + selectedCircleOffset,
      radius + 2,
      0,
      arc
    );
  }

  tile.ctx.stroke();
}

/**
 * Draw a small circle icon used for far away zoom level.
 */
function getSmallStopIcon(type, radius, color) {
  // draw on a new offscreen canvas so that result can be cached
  const canvas = document.createElement('canvas');
  const width = radius * 2;
  canvas.width = width;
  canvas.height = width;
  const x = width / 2;
  const y = width / 2;
  const ctx = canvas.getContext('2d');
  // outer circle
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(x, y, radius, 0, FULL_CIRCLE);
  ctx.fill();
  // inner circle
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius - 1, 0, FULL_CIRCLE);
  ctx.fill();

  return new Promise(r => {
    r(canvas);
  });
}

const getMemoizedStopIcon = memoize(
  getSmallStopIcon,
  (type, radius, color, isHighlighted) =>
    `${type}_${radius}_${color}_${isHighlighted}`
);

/**
 * Draw stop icon based on type.
 * Determine size from zoom level.
 */

export function drawStopIcon(
  tile,
  geom,
  type,
  platformNumber,
  isHighlighted,
  isFerryTerminal,
  modeIconColors
) {
  if (type === 'SUBWAY') {
    return;
  }

  const mode = `mode-${type.toLowerCase()}`;
  const color =
    mode === 'mode-ferry' && !isFerryTerminal
      ? modeIconColors['mode-ferry-pier']
      : modeIconColors[mode];
  const zoom = tile.coords.z - 1;

  const styles = getIconStyles(zoom, isHighlighted);
  if (!styles) {
    return;
  }
  const { style } = styles;
  let { width, height } = styles;
  width *= tile.scaleratio;
  height *= tile.scaleratio;
  const radius = width / 2;

  if (style === 'small') {
    return getMemoizedStopIcon(
      isFerryTerminal ? 'FERRY_TERMINAL' : type,
      radius,
      color,
      isHighlighted
    ).then(image => {
      tile.ctx.drawImage(
        image,
        geom.x / tile.ratio - radius,
        geom.y / tile.ratio - radius
      );
    });
  }
  const icon = !isFerryTerminal
    ? `icon-icon_stop_${type.toLowerCase()}_map`
    : `icon-icon_${type.toLowerCase()}_map`;

  return getImageFromSpriteCache(
    `${icon}${isHighlighted ? '_highlight' : ''}`,
    width,
    height
  ).then(image => {
    tile.ctx.drawImage(
      image,
      geom.x / tile.ratio - width / 2,
      geom.y / tile.ratio - height / 2
    );
  });
}
/**
 * Draw icon for hybrid stops, meaning BUS and TRAM stop in the same place.
 * Determine icon size based on zoom level
 */
export function drawHybridStopIcon(
  tile,
  geom,
  isHighlighted,
  modeIconColors,
  hasTrunkRoute = false
) {
  const zoom = tile.coords.z - 1;
  const styles = getStopIconStyles('hybrid', zoom, isHighlighted);
  if (!styles) {
    return;
  }
  const { style } = styles;
  let { width, height } = styles;
  width *= tile.scaleratio;
  height *= tile.scaleratio;
  // only bus/tram hybrid exist
  if (style === 'small') {
    const radiusInner = 3;
    const radiusOuter = 5;
    const x = geom.x / tile.ratio;
    const y = geom.y / tile.ratio;
    // outer icon
    /* eslint-disable no-param-reassign */
    tile.ctx.beginPath();
    tile.ctx.fillStyle = '#fff';
    tile.ctx.arc(x, y, radiusOuter * tile.scaleratio, 0, FULL_CIRCLE);
    tile.ctx.fill();
    tile.ctx.beginPath();
    tile.ctx.fillStyle = modeIconColors['mode-tram'];
    tile.ctx.arc(x, y, (radiusOuter - 1) * tile.scaleratio, 0, FULL_CIRCLE);
    tile.ctx.fill();
    // inner icon
    tile.ctx.beginPath();
    tile.ctx.fillStyle = '#fff';
    tile.ctx.arc(x, y, radiusInner * tile.scaleratio, 0, FULL_CIRCLE);
    tile.ctx.fill();
    tile.ctx.beginPath();
    tile.ctx.fillStyle =
      modeIconColors[hasTrunkRoute ? 'mode-bus-express' : 'mode-bus'];
    tile.ctx.arc(x, y, (radiusInner - 0.5) * tile.scaleratio, 0, FULL_CIRCLE);
    tile.ctx.fill();
    /* eslint-enable no-param-reassign */
  }
  if (style === 'large') {
    const x = geom.x / tile.ratio - width / 2;
    const y = geom.y / tile.ratio - height;
    getImageFromSpriteCache(
      `icon-icon_map_hybrid_stop${hasTrunkRoute ? '_express' : ''}`,
      width,
      height
    ).then(image => {
      tile.ctx.drawImage(image, x, y);
      if (isHighlighted) {
        tile.ctx.beginPath();
        // eslint-disable-next-line no-param-reassign
        tile.ctx.lineWidth = 2;
        if (zoom === 14 || zoom === 13) {
          const xOff = 82; // Position in x-axis
          const yOff = 230; // Position in y-axis
          const radius = 11; // How large the arcs of the ellipse are (width of the ellipse)
          const eHeight = 65; // How tall the ellipse is. Smaller value => taller ellipse.
          tile.ctx.arc(
            x + xOff / tile.ratio,
            y + yOff / tile.ratio,
            radius * tile.scaleratio,
            0,
            Math.PI
          );
          tile.ctx.arc(
            x + xOff / tile.ratio,
            y + eHeight / tile.ratio,
            radius * tile.scaleratio,
            Math.PI,
            0
          );
          tile.ctx.arc(
            x + xOff / tile.ratio,
            y + yOff / tile.ratio,
            radius * tile.scaleratio,
            0,
            Math.PI
          );
        } else if (zoom === 15) {
          tile.ctx.arc(
            x + 81 / tile.ratio,
            y + 213 / tile.ratio,
            12 * tile.scaleratio,
            0,
            Math.PI
          );
          tile.ctx.arc(
            x + 81 / tile.ratio,
            y + 75 / tile.ratio,
            12 * tile.scaleratio,
            Math.PI,
            0
          );
          tile.ctx.arc(
            x + 81 / tile.ratio,
            y + 213 / tile.ratio,
            12 * tile.scaleratio,
            0,
            Math.PI
          );
        } else {
          tile.ctx.arc(
            x + 97.2 / tile.ratio,
            y + 273 / tile.ratio,
            13.5 * tile.scaleratio,
            0,
            Math.PI
          );
          tile.ctx.arc(
            x + 97.2 / tile.ratio,
            y + 88.5 / tile.ratio,
            13.5 * tile.scaleratio,
            Math.PI,
            0
          );
          tile.ctx.arc(
            x + 97.2 / tile.ratio,
            y + 273 / tile.ratio,
            13.5 * tile.scaleratio,
            0,
            Math.PI
          );
        }
        tile.ctx.stroke();
      }
    });
  }
}

/**
 * Draws small bike rental station icon. Color can vary.
 */
export function drawSmallVehicleRentalMarker(tile, geom, iconColor, mode) {
  const radius = mode !== TransportMode.Citybike ? 4 : 5;
  const x = geom.x / tile.ratio - radius;
  const y = geom.y / tile.ratio - radius;
  getMemoizedStopIcon(mode, radius, iconColor).then(image => {
    tile.ctx.drawImage(image, x, y);
  });
}

/**
 * Draw an icon for citybike stations, including indicator to show bike availability. Draw closed icon for closed stations
 * Determine icon size based on zoom level
 */
export function drawCitybikeIcon(
  tile,
  geom,
  operative,
  available,
  iconName,
  showAvailability,
  isHighlighted
) {
  const zoom = tile.coords.z - 1;
  const styles = getStopIconStyles('citybike', zoom, isHighlighted);
  const { style } = styles;
  let { width, height } = styles;
  width *= tile.scaleratio;
  height *= tile.scaleratio;
  if (!styles) {
    return;
  }

  let x;
  let y;
  let color = 'green';
  if (showAvailability) {
    if (!available) {
      color = 'red';
    } else if (available <= 3) {
      color = 'yellow';
    }
  }

  if (style === 'large') {
    const smallCircleRadius = (isHighlighted ? 30 : zoom + 1) * tile.scaleratio;
    x = geom.x / tile.ratio - width + smallCircleRadius * 2;
    y = geom.y / tile.ratio - height;
    const showAvailabilityBadge =
      showAvailability && (available || available === 0) && operative;
    let icon =
      iconName.indexOf('scooter') > -1
        ? `${iconName}-lollipop`
        : `${iconName}_station_${color}_large_map`;
    if (!operative) {
      icon = 'icon-icon_citybike_station_closed_large_map';
    }

    return getImageFromSpriteCache(
      `${icon}${isHighlighted ? '_highlight' : ''}`,
      width,
      height
    ).then(image => {
      tile.ctx.drawImage(image, x, y);
      x = x + width - smallCircleRadius;
      y += smallCircleRadius + (isHighlighted ? 2.5 : -7);
      if (showAvailabilityBadge) {
        /* eslint-disable no-param-reassign */
        tile.ctx.font = `${
          10.8 * tile.scaleratio
        }px Gotham XNarrow SSm A, Gotham XNarrow SSm B, Gotham Rounded A, Gotham Rounded B, Arial, sans-serif`;
        tile.ctx.fillStyle = color === 'red' ? '#fff' : '#000';
        tile.ctx.textAlign = 'center';
        tile.ctx.textBaseline = 'middle';
        tile.ctx.fillText(available, x, y);
      }
    });
  }

  let icon =
    iconName.indexOf('scooter') > -1
      ? `${iconName}-lollipop`
      : `${iconName}_station_${color}_small_map`;
  if (!operative) {
    icon = 'icon-icon_citybike_station_closed_small_map';
  }

  return getImageFromSpriteCache(icon, width, height).then(image => {
    tile.ctx.drawImage(
      image,
      geom.x / tile.ratio - width / 2,
      geom.y / tile.ratio - height / 2
    );
  });
}

/**
 * Draw an icon for rental vehicles.
 * Determine icon size based on zoom level.
 */
export function drawScooterIcon(tile, geom, iconName, isHighlighted) {
  const zoom = tile.coords.z - 1;
  const styles = getStopIconStyles('scooter', zoom, isHighlighted);
  const { style } = styles;
  let { width, height } = styles;
  width *= tile.scaleratio;
  height *= tile.scaleratio;
  if (!styles) {
    return;
  }
  const radius = width / 2;
  let x;
  let y;
  if (style === 'medium') {
    x = geom.x / tile.ratio - width / 2;
    y = geom.y / tile.ratio - height;
    const icon = `${iconName}-lollipop`;
    getImageFromSpriteCache(icon, width, height).then(image => {
      tile.ctx.drawImage(image, x, y);
      if (isHighlighted) {
        drawSelectionCircle(tile, x, y, radius, false, false);
      }
    });
  }
  if (style === 'large') {
    const icon = `${iconName}-lollipop-large`;
    const smallCircleRadius = 11 * tile.scaleratio;
    x = geom.x / tile.ratio - width + smallCircleRadius * 2;
    y = geom.y / tile.ratio - height;
    const iconX = x;
    const iconY = y;

    getImageFromSpriteCache(icon, width, height).then(image => {
      tile.ctx.drawImage(image, x, y);
      if (isHighlighted) {
        drawSelectionCircle(tile, iconX, iconY, radius, true, false);
      }
    });
  }
}

export function drawTerminalIcon(tile, geom, type, isHighlighted) {
  const zoom = tile.coords.z - 1;
  const styles = getIconStyles(zoom, isHighlighted);
  if (!styles) {
    return;
  }
  let { width, height } = styles;
  width *= tile.scaleratio;
  height *= tile.scaleratio;

  return getImageFromSpriteCache(
    `icon-icon_${type.split(',')[0].toLowerCase()}_map${
      isHighlighted ? '_highlight' : ''
    }`,
    width,
    height
  ).then(image => {
    tile.ctx.drawImage(
      image,
      geom.x / tile.ratio - width / 2,
      geom.y / tile.ratio - height / 2
    );
  });
}

/**
 * Draw icon for hybrid stations, meaning BUS and TRAM station in the same place.
 */
export function drawHybridStationIcon(tile, geom, isHighlighted) {
  const zoom = tile.coords.z - 1;
  const styles = getIconStyles(zoom, isHighlighted);
  if (!styles) {
    return;
  }
  let { width, height } = styles;
  width *= tile.scaleratio * 1.5;
  height *= tile.scaleratio * 1.5;
  // only bus/tram hybrid exist
  getImageFromSpriteCache('icon-icon_map_hybrid_station', width, height).then(
    image => {
      tile.ctx.drawImage(
        image,
        geom.x / tile.ratio - width / 2,
        geom.y / tile.ratio - height / 2
      );
    }
  );
  if (isHighlighted) {
    getImageFromSpriteCache(
      'icon-icon_hybrid_station_highlight',
      width,
      height
    ).then(image => {
      tile.ctx.drawImage(
        image,
        geom.x / tile.ratio - width / 2 - 4 / tile.scaleratio,
        geom.y / tile.ratio - height / 2 - 4 / tile.scaleratio,
        width + 8 / tile.scaleratio,
        height + 8 / tile.scaleratio
      );
    });
  }
}

export function drawParkAndRideIcon(
  type,
  tile,
  geom,
  width,
  height,
  isHighlighted = false
) {
  const img =
    type === ParkTypes.Bicycle ? 'icon-icon_bike-park' : 'icon-icon_car-park';
  getImageFromSpriteCache(img, width, height).then(image => {
    drawIconImage(image, tile, geom, width, height);
  });
  if (isHighlighted) {
    getImageFromSpriteCache(`icon-icon_station_highlight`, width, height).then(
      image => {
        tile.ctx.drawImage(
          image,
          geom.x / tile.ratio - width / 2 - 4 / tile.scaleratio,
          geom.y / tile.ratio - height / 2 - 4 / tile.scaleratio,
          width + 7.5 / tile.scaleratio,
          height + 6 / tile.scaleratio
        );
      }
    );
  }
}

export function drawAvailabilityBadge(
  availability,
  tile,
  geom,
  imageSize,
  badgeSize,
  scaleratio
) {
  if (
    availability !== 'good' &&
    availability !== 'poor' &&
    availability !== 'no'
  ) {
    throw Error("Supported badges are 'good', 'poor', and 'no'");
  }
  getImageFromSpriteCache(
    `icon-icon_${availability}-availability`,
    badgeSize,
    badgeSize
  ).then(image => {
    drawIconImageBadge(image, tile, geom, imageSize, badgeSize, scaleratio);
  });
}

export function drawIcon(icon, tile, geom, imageSize) {
  return getImageFromSpriteCache(icon, imageSize, imageSize).then(image => {
    drawIconImage(image, tile, geom, imageSize, imageSize);
  });
}

/**
 * Draw explore icon based on its type.
 * Determine size from zoom level.
 */

export function drawExploreIcon(tile, geom, type, iconColors, isHighlighted, customSize) {
  const color = iconColors[type];
  const zoom = tile.coords.z - 1;

  const styles = customSize ?? getIconStyles(zoom, isHighlighted);
  let { width, height } = styles;

  width *= tile.scaleratio;
  height *= tile.scaleratio;

  const radius = width / 2;
  let x;
  let y;

  if (styles.style === 'small') {
    x = geom.x / tile.ratio - radius;
    y = geom.y / tile.ratio - radius;

    return getMemoizedStopIcon(type, radius, color, isHighlighted).then(
      image => {
        tile.ctx.drawImage(image, x, y);
      }
    );
  }

  x = geom.x / tile.ratio - width / 2;
  y = geom.y / tile.ratio - height;

  return getImageFromSpriteCache(
    `icon-explore-icon_${type.toLowerCase()}_map${
      isHighlighted ? '_highlight' : ''
    }`,
    width,
    height,
    color
  ).then(image => {
    tile.ctx.drawImage(image, x, y);
  });
}

/**
 * Draw block icon.
 * Determine size from zoom level.
 */

export function drawBlockIcon(tile, geom, type) {
  let { width, height } = getBlockIconStyle();

  width *= tile.scaleratio;
  height *= tile.scaleratio;

  const x = geom.x / tile.ratio - width / 2;
  const y = geom.y / tile.ratio - height;

  return getImageFromSpriteCache(
    `icon-explore-icon_${type.toLowerCase()}_map`,
    width,
    height
  ).then(image => {
    tile.ctx.drawImage(image, x, y);
  });
}
