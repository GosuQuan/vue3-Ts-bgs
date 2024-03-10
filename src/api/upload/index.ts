//manage user api
import request from "@/utils/request";

enum API {
  UPLOAD_MERGE = "/upload/chuck_merge",
  UPLOAD_SINGLEFILE = "/upload/single_file",
  UPLOAD_ALREADY = "/upload/upload_already",
}
export const upload_merge = () => request.get(API.UPLOAD_MERGE);
const upload_singlefile = (data) => request.post(API.UPLOAD_SINGLEFILE, data);
const upload_already = (data) => request.post(API.UPLOAD_ALREADY, data);
