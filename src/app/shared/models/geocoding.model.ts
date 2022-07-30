export type TGeocoding = {
  name: string,
  local_names: {
    ascii: string,
    en: string,
    feature_name: string
  },
  lat: number,
  lon: number,
  country: string,
  state: string
}