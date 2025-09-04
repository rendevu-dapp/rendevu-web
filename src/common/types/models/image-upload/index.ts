type DateString = string; // ISO 8601 date string

export type ImageUploadError = {
  message: string;
};

export type ImageUploadResponseMeta = {
  api_key?: string;
  asset_id: string;
  bytes: number;
  created_at: DateString;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder?: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags?: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

export type ImageUploadData = {
  asset_id: string;
  public_id: string;
  asset_folder: string;
  display_name: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: DateString;
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  access_mode: string;
  overwritten: boolean;
  original_filename: string;
  eager?: unknown | null;
  responsive_breakpoints?: unknown | null;
  hook_execution?: unknown | null;
  error: ImageUploadError;
  Response: ImageUploadResponseMeta;
};
