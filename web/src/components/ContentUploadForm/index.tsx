import React from "react";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../shadcn/form";
import { Input } from "../shadcn/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../shadcn/button";
import { uploadContentFile } from "@/services/fileServices";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"audio/mpeg",
	"audio/wav",
	"audio/wave",
];
const contentUploadFormSchema = z.object({
	categoryIds: z.array(z.string()).optional(),
	tagIds: z.array(z.string()).optional(),
	file: z.custom<File>(
		(file) => {
			if (!(file instanceof File)) return false;
			if (file.size > MAX_FILE_SIZE) return false;
			if (!ALLOWED_FILE_TYPES.includes(file.type)) return false;
			return true;
		},
		{
			message: "File must be jpeg, png, mp3, or wav and less than 5MB",
		}
	),
});
export type ContentUploadFormSchemaValues = z.infer<
	typeof contentUploadFormSchema
>;

export const ContentUploadForm = () => {
	const form = useForm<ContentUploadFormSchemaValues>({
		resolver: zodResolver(contentUploadFormSchema),
		defaultValues: {
			categoryIds: [],
			tagIds: [],
		},
	});
	const onSubmit = async (data: ContentUploadFormSchemaValues) => {
		await uploadContentFile(data);
	};
	return (
		<>
			<section className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="file"
							render={({ field }) => (
								<FormItem>
									<FormLabel>File</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/jpeg,image/png,audio/mpeg,audio/wav,audio/wave"
											onChange={(e) => {
												const file = e.target.files?.[0];
												field.onChange(file);
											}}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</section>
		</>
	);
};
