export default {
  name: "business",
  title: "Negocio",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Descripción corta",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Imagen del negocio",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitud del negocio",
    },
    {
      name: "long",
      type: "number",
      title: "Longitud del negocio",
    },
    {
      name: "address",
      type: "string",
      title: "Dirección del negocio",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Ingresa un rating de 1-5 start",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a value between 1 and 5"),
    },
    {
      name: "type",
      title: "Categoría del negocio",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "articles",
      title: "Artículos",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    },
  ],
};
