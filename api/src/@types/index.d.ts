import express from "express";

declare global {
  namespace Express {
    interface Request {
      user: number;
    }
  }
}

export interface User {
  name: string;
  lastname: string;
  username: string;
  date?: Date;
  email: string;
  password?: string;
  address: string;
  id_role?: number;
}

export interface Content {
  title: string;
  contenu: string;
  date: Date;
  prix?: number;
  id_type: number;
  id_user: number;
}

export interface FilterOptions {
  limit?: number;
  creator?: number;
  date?: string;
  type?: number;
  search?: string;
}
