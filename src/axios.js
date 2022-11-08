import axioss from 'axios';

const axios = axioss.create({baseURL: process.env.NEXT_PUBLIC_BASE_URL});
export default axios