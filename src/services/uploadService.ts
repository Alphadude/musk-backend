import { uploadFile, deleteFile, getFileName } from "../lib/upload";

export const uploadImage = async (base64Data: string, type: string) => {
    return await uploadFile(base64Data, type);
};

export const deleteImage = async (urlOrId: string) => {
    // If it's a full URL, extract the publicId
    const publicId = urlOrId.includes('http') ? getFileName(urlOrId) : urlOrId;
    return await deleteFile(publicId);
};
