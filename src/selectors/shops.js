import { createSelector } from 'reselect';

const getHomeShopsDomainNames = (state) => state.homeShops.ids;
const getShopsEntity = (state) => state.entities.shops;

export const getHomeShops = createSelector(
  [ getHomeShopsDomainNames, getShopsEntity ],
  (domainNames, shops) => domainNames.map(domainName => shops[domainName])
);
