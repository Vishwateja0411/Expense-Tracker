// src/utils/requestMethods.js
import axios from 'axios';

export const publicRequest = axios.create({
  baseURL: 'http://localhost:5000/api/expenses',   // point at the correct route
  headers: { 'Content-Type': 'application/json' }
});
