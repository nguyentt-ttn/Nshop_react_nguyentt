import { z } from "zod";

const productSchema = z.object({
	title: z.string().min(6),
	price: z.number().min(6),
	description: z.string().optional(),
	thumbnail: z.any().optional(),
});

export default productSchema;