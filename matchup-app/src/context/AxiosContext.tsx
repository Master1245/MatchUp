// import React, { createContext, useContext, useEffect, useState } from 'react';
// import api from '../api/api';

// interface MyContextData {
//   data: any; // Replace 'any' with the data type you want to store
//   fetchData: () => void;
// }

// const MyContext = createContext<MyContextData | undefined>(undefined);

// export const useAxios = () => {
//   const context = useContext(MyContext);
//   if (!context) {
//     throw new Error('useAxios must be used within a provider');
//   }
//   return context;
// };

// const AxiosContext: React.FC = ({ children }: any) => {
//   const [data, setData] = useState<any>(null); // Replace 'any' with the data type you want to store

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await api.get('/data'); // Replace with the route of your API
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <MyContext.Provider value={{ data, fetchData }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// export default AxiosContext;
