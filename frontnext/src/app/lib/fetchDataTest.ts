export interface Credentials {
  id: string;
  password: string;
}

export const fetchData = async ({
  id,
  password,
}: Credentials): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:8000/searchData/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result === true;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
};
