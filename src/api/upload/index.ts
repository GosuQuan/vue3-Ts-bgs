//manage user api
import request from "@/utils/request";

enum API {
  UPLOAD_MERGE = "/upload/chunk_merge",
  UPLOAD_SINGLEFILE = "/upload/single_file",
  UPLOAD_ALREADY = "/upload/upload_already",
  UPLOAD_CHUNK = "/upload/upload_chunk",
}
const UPLOAD_FORMDATA_CONFIG = {
  headers: { "Content-Type": "multipart/form-data" },
};
const MERGE_FORMDATA_CONFIG = {
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
}
export const upload_merge = (data) =>
  request.post(API.UPLOAD_MERGE, data, MERGE_FORMDATA_CONFIG);
export const upload_singleFile = (data) =>
  request.post(API.UPLOAD_SINGLEFILE, data, UPLOAD_FORMDATA_CONFIG);
export const upload_already = () =>
  request.get(API.UPLOAD_ALREADY, UPLOAD_FORMDATA_CONFIG);
export const upload_chunk = (data) =>
  request.post(API.UPLOAD_CHUNK, data, UPLOAD_FORMDATA_CONFIG);
