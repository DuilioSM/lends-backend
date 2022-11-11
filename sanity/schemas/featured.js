export default {
  name: "featured",
  title: "Categorías destacadas",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre de la categoría destacada",
      type: "string",
      validation: (Rule) => Rule.required(200),
    },
    {
      name: "short_description",
      title: "Descripción corta",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "business",
      title: "Negocios",
      type: "array",
      of: [{ type: "reference", to: [{ type: "business" }] }],
    },
  ],
};
