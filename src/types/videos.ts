export interface VideoInfos {
  id: string;
  data_criado: string;
}

export type Video = {
  video: string;
} & VideoInfos;
