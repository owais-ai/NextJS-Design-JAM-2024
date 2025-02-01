import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "q1ltcarj", // Replace with your Sanity project ID
  dataset: "production", // Or any dataset name you're using
  apiVersion: "2024-01-30", // Use the latest API version
  useCdn: true, // Enables faster caching for reads
});
