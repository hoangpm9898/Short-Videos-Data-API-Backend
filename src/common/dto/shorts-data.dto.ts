/* eslint-disable prettier/prettier */

export interface ShortsData {
  _id: number;
  user : UserData;
  title: string;
  description: string;
  tags: string[];
  video : VideoData
  provider: string;
}

export interface VideoData {
  file_type: string;
  quality: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

export interface UserData {
  id: number,
  first_name: string,
  last_name: string,
  slug: string,
  username: string,
  location: string,
  avatar: {
    small: string,
    medium: string,
    large: string
  },
  hero: boolean,
}