import type { ContentUploadFormSchemaValues } from "@/components/ContentUploadForm";

export const uploadContentFile = async (
	data: ContentUploadFormSchemaValues
) => {
	try {
		const formData = new FormData();
		formData.append("file", data.file);

		//---- stringify categoryIds and tagIds
		if (data.categoryIds) {
			formData.append("categoryIds", JSON.stringify(data.categoryIds));
		}
		if (data.tagIds) {
			formData.append("tagIds", JSON.stringify(data.tagIds));
		}
		// ---------sending file to backend
		const res = await fetch(`http://localhost:3000/files/upload`, {
			method: "POST",
			body: formData,
			credentials: "include",
		});
		if (!res.ok) {
			throw new Error("Some error occurred");
		}
		const resData = await res.json();
		alert(resData.message);
	} catch (error) {
		console.log("error", error);
	}
};
