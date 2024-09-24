export interface IPost{
    _id: string;
    name: string;
    image: string;
    zone: string;
    user: string; // <--- this should be updated to reflect the user type
  }