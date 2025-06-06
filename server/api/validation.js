import { checkSchema } from 'express-validator';

// validates a string in the format 'latitude,longitude',
// ensuring the latitude is between -90 and 90 and the longitude is between -180 and 180,
// with optional decimal points and optional sign prefixes.
const coordinatesRegex =
  /^[-+]?(90|[1-8]?\d(\.\d+)?),\s*[-+]?(180|1[0-7]\d|[1-9]?\d)(\.\d+)?$/;

// validates a string with the valid languages
const languageRegex = /^(pt|en)$/;

const commonListSchema = type => ({
  block: {
    isString: true,
    optional: true
  },
  limit: {
    isInt: {
      options: { gt: 0 },
      errorMessage: 'limit must be a positive integer'
    },
    toInt: true,
    optional: true
  },
  page: {
    isInt: {
      options: { gt: 0 },
      errorMessage: 'page must be a positive integer'
    },
    toInt: true,
    optional: true
  },
  coords: {
    matches: {
      options: coordinatesRegex,
      errorMessage: 'invalid coordinates'
    },
    optional: true
  },
  language: {
    matches: {
      options: languageRegex,
      errorMessage: 'invalid language'
    }
  },
  categories: {
    customSanitizer: {
      options: input => (input ? input?.split(',') : undefined)
    },
    custom: {
      options: (input, { req }) => {
        if (input.length === 0) {
          return false;
        }
        const validCategories = Object.keys(req.config.filters[type]);

        return input.every(category => validCategories.includes(category));
      },
      errorMessage: 'invalid category'
    },
    optional: true
  }
});

export const poiListSchema = checkSchema(commonListSchema('pois'), ['query']);

export const eventListSchema = checkSchema(commonListSchema('events'), [
  'query'
]);

export const blocksListSchema = checkSchema(commonListSchema(), ['query']);
export const routesListSchema = checkSchema(
  {
    ...commonListSchema(),
    difficulties: {
      customSanitizer: {
        options: input => (input ? input?.split(',') : undefined)
      },
      custom: {
        options: (input, { req }) => {
          if (input.length === 0) {
            return false;
          }

          const validData = Object.keys(req.config.filters.routes).filter(
            difficulty => difficulty.startsWith('others-difficulty-')
          );

          return input.every(difficulty => validData.includes(difficulty));
        },
        errorMessage: 'invalid Difficulty'
      },
      optional: true
    },
    durationRanges: {
      customSanitizer: {
        options: input => (input ? input?.split(',') : undefined)
      },
      custom: {
        options: (input, { req }) => {
          if (input.length === 0) {
            return false;
          }

          const validData = Object.keys(req.config.filters.routes).filter(
            duration => duration.startsWith('others-durationRange-')
          );

          return input.every(duration => validData.includes(duration));
        },
        errorMessage: 'invalid durationRange'
      },
      optional: true
    }
  },
  ['query']
);

export const detailSchema = checkSchema({
  language: {
    in: ['query'],
    matches: {
      options: languageRegex,
      errorMessage: 'invalid language'
    }
  },
  id: {
    in: ['params'],
    isString: true
  }
});

export const idSchema = checkSchema({
  id: {
    in: ['params'],
    isString: true
  }
});
