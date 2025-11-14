// Add this schema to your Sanity Studio schemas folder
// This file should be added to your Sanity Studio project, not the Next.js app

export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: "body",
      title: "Comment",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Comments must be approved before they appear on the site",
      initialValue: false,
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      name: "name",
      comment: "body",
      post: "post.title",
    },
    prepare({ name, comment, post }: any) {
      return {
        title: `${name} on ${post}`,
        subtitle: comment,
      }
    },
  },
}
