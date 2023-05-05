import UploadMessageResponse from '../interfaces/UploadMessageResponse';
import { uploadUrl } from './url';

export const uploadFile = async (
  file: File
): Promise<UploadMessageResponse> => {
  const formData = new FormData();
  formData.append('item', file);
  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  const json = (await res.json()) as UploadMessageResponse;
  return json;
};
