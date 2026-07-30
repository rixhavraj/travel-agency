export const fetchDestinationDetails = async (query) => {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Destination not found');
    }
    const data = await response.json();
    return {
      title: data.title,
      description: data.extract,
      img: data.thumbnail ? data.thumbnail.source : null,
    };
  } catch (error) {
    console.error('Error fetching destination details:', error);
    return null;
  }
};

export const fetchUnsplashPhotos = async (query) => {
  try {
    const response = await fetch(`http://localhost:5000/api/photos?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch photos from backend');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Unsplash photos:', error);
    return [];
  }
};

export const fetchHomeData = async () => {
  while (true) {
    try {
      const response = await fetch('http://localhost:5000/api/home-data');
      if (response.ok) {
        return await response.json();
      }
      console.warn(`Backend responded with ${response.status}, retrying in 3 seconds...`);
    } catch (error) {
      console.error('Backend unreachable, retrying in 3 seconds...', error.message);
    }
    // Wait for 3 seconds before retrying
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
};

