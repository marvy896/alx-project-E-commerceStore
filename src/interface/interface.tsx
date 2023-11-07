export interface products {
  _id: string,
  id: number;
  productName: string;
  Image: string;
  price: number
  description: string;
  user?: string;
  }

  export interface IItem {
    _id: string,
  id: number;
  productName: string;
  Image: string;
  price: number
  description: string;
  user?: string;
  }
  
  export interface User{
    username: string;
  };