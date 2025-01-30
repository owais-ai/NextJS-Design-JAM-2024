import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Product Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Product Image",
      options: {
        hotspot: true, // Enables better cropping options
      },
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.required().min(1), // Ensure price is at least 1
    }),
    defineField({
      name: "discountPercentage",
      type: "number",
      title: "Discount Percentage",
      validation: (Rule) => Rule.min(0).max(100), // Ensure valid discount range
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1), // Ensure at least one tag
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Product Description",
      validation: (Rule) => Rule.required().min(20), // Ensure meaningful description
    }),
    defineField({
      name: "isNew",
      type: "boolean",
      title: "Is New?",
      initialValue: false, // Default value if missing
    }),
  ],
});
