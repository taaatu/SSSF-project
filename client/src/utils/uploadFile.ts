import UploadMessageResponse from '../interfaces/UploadMessageResponse';

export const uploadFile = async (
  file: File
): Promise<UploadMessageResponse> => {
  const formData = new FormData();
  formData.append('item', file);
  const res = await fetch('http://localhost:3000/api/upload/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  const json = (await res.json()) as UploadMessageResponse;
  return json;
};
