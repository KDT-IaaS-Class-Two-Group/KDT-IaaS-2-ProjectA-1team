// lib/fetchTables.ts
export const fetchTables = async (): Promise<string[]> => {
  try {
    const response = await fetch('http://localhost:8080/tables');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    return [];
  }
};
