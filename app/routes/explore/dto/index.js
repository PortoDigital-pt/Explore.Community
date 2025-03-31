export const dtoToPoi = (language, poiDto) => ({
  ...poiDto,
  category:
    poiDto.category?.[language] ??
    poiDto.category?.pt ??
    'No information at all',
  description:
    poiDto.description?.[language] ??
    poiDto.description?.pt ??
    'No information at all',
  name: poiDto.name?.[language] ?? poiDto.name?.pt ?? 'No information at all'
});
