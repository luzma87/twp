const onChange = (type, event, name, callback) => {
  switch (type) {
    case 'text':
      callback(name, event.target.value);
      break;
    case 'select':
      callback(name, event);
      break;
    case 'switch':
      callback(name, event);
      break;
    case 'rating':
      callback(name, event);
      break;
    default:
      break;
  }
};

const formHelper = {
  onChange,
};

export default formHelper;
