const constants = {
  carSizes: {
    small: { value: 'small', label: 'Pequeño' },
    medium: { value: 'medium', label: 'Mediano' },
    large: { value: 'large', label: 'Grande' },
  },
  banks: {
    pichincha: { value: 'pichincha', label: 'Pichincha' },
    guayaquil: { value: 'guayaquil', label: 'Guayaquil' },
    produbanco: { value: 'produbanco', label: 'Produbanco' },
    otro: { value: 'otro', label: 'Otro' },
  },
  userSort: (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  },
};

export default constants;
