
const API_BASE_URL = "https://dog.ceo/api";

// Reusable API request function
export async function getJson(url, options = {}) {
  let response;

  try {
    response = await fetch(url, {
      ...options,
      method: "GET",
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error(
      "Network error. Please check your internet connection."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Request failed (${response.status}). Please try again.`
    );
  }

  try {
    return await response.json();
  } catch {
    throw new Error("Invalid server response.");
  }
}

// Fetch random dog images from REST API
export async function fetchRandomDogImages(limit = 6, signal) {
  const safeLimit = Math.min(
    Math.max(Number(limit) || 6, 1),
    20
  );

  const data = await getJson(
    `${API_BASE_URL}/breeds/image/random/${safeLimit}`,
    { signal }
  );

  if (
    data.status !== "success" ||
    !Array.isArray(data.message)
  ) {
    throw new Error("Dog images are temporarily unavailable.");
  }

  return data.message.filter(
    (url) =>
      typeof url === "string" &&
      /^https?:\/\//i.test(url)
  );
}