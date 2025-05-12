import * as yup from 'yup';

export const cityFavoriteSchema = yup.object().shape({
  name: yup.string().required('El nombre de la ciudad es obligatorio'),
  region: yup.string().required('La región es obligatoria'),
  country: yup.string().required('El país es obligatorio'),
  latitude: yup.number().required('La latitud es obligatoria'),
  longitude: yup.number().required('La longitud es obligatoria'),
});

export type CityFavoriteSchema = yup.InferType<typeof cityFavoriteSchema>;