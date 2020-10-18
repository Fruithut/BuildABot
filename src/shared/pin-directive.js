export default function (element, binding) {
  const currentElement = element;
  Object.keys(binding.value).forEach((position) => {
    currentElement.style[position] = binding.value[position];
  });
  currentElement.style.position = 'absolute';
}
