export function formatPokeId(id) {
  if (id <= 9) {
    return `#00${id}`;
  } else if (id >= 10 && id <= 99) {
    return `#0${id}`;
  } else {
    return `#${id}`;
  }
}

export const formatPokeList = ({ name, url }) => {
  const [, , , , , , id] = url.split("/");
  const image = formatImage(id);
  return { id, name, image };
};

export const formatImage = (id) =>
  `https://cdn.traction.one/pokedex/pokemon/${id}.png`;

export const pokeImage =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png";
