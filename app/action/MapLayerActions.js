export const updateMapLayers = (actionContext, mapLayerSettings) => {
  actionContext.dispatch('UpdateMapLayers', mapLayerSettings);
};

export const updateMapLayersCustom = (actionContext, mapLayerSettings) => {
  actionContext.dispatch('UpdateMapLayersCustom', mapLayerSettings);
};

export default updateMapLayers;
