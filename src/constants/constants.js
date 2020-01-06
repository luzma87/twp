import guayaquil from '../img/guayaquil.png';
import pacifico from '../img/pacifico.png';
import pichincha from '../img/pichincha.png';
import promerica from '../img/promerica.png';
import internacional from '../img/internacional.png';

const carSizes = {
  small: { value: 'small', label: 'Pequeño' },
  medium: { value: 'medium', label: 'Mediano' },
  large: { value: 'large', label: 'Grande' },
};

const carSizeLabel = (key) => carSizes[key].label;

const banks = {
  pichincha: { value: 'pichincha', label: 'Pichincha', image: pichincha },
  guayaquil: { value: 'guayaquil', label: 'Guayaquil', image: guayaquil },
  promerica: { value: 'promerica', label: 'Promérica', image: promerica },
  produbanco: { value: 'produbanco', label: 'Produbanco', image: promerica },
  pacifico: { value: 'pacifico', label: 'Pacífico', image: pacifico },
  internacional: { value: 'internacional', label: 'Internacional', image: internacional },
  otro: { value: 'otro', label: 'Otro' },
};

const assignmentSortByUser = (a, b) => {
  if (a.user.name < b.user.name) {
    return -1;
  }
  if (a.user.name > b.user.name) {
    return 1;
  }
  return 0;
};

const sortAssignmentsByUser = (assignmentsList) => assignmentsList.sort(assignmentSortByUser);

const userSort = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const monthNames = [
  'Enero', 'Febrero', 'Marzo',
  'Abril', 'Mayo', 'Junio', 'Julio',
  'Agosto', 'Septiembre', 'Octubre',
  'Noviembre', 'Diciembre',
];

const constants = {
  carSizes,
  banks,
  monthNames,
  userSort,
  carSizeLabel,
  sortAssignmentsByUser,
  assignmentSortByUser,
};

export default constants;
