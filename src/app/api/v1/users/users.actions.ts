const API_URL = "http://localhost:3000/api/v1";

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
//   console.log(res);
  
  const data = await res.json();
  return data;
};
