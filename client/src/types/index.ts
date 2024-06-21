

export interface User {
  name?: string | '';
  email?: string | '';
  password: string | '';
  isAdmin?: boolean | '';
  status?: boolean | '';
  avatar?: string | '';
  confirmPassword?: string | '';
}

export interface Registers {
    name?: string | '';
    email?: string | '';
    password?: string | '';
    confirmPassword?: string | '';
  }

  export interface LoginProps {
    email?: string | '';
    password?:string | '';
  }

  export interface EmailProps {
    email?: string;
  }

export interface ResetPassProps {
  password?: string;
  confirmPassword?: string;
  token?: string;
}

export interface StatusAuthProps {
  status?: boolean;
  token?: string;
}

export interface Video {
  childname: string;
  video: string;
  time?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Chapter {
  namechapter: string;
  videos: Video[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Course {
  name: string;
  description: string;
  image?: string | null;
  video?: string | null;
  chapters: Chapter[];
  price: 'free' | 'paid';
  priceAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}