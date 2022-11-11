export default {
  name: "article",
  title: "Artículo",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre del artículo",
      type: "string",
    },
    {
      name: "short_description",
      title: "Descripción corta",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "price",
      title: "Precio de la renta por día ",
      type: "number",
    },
    {
      name: "image",
      title: "Imagen",
      type: "image",
    },
  ],
};
