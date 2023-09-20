async function fetchUser(url, fetchOptions) {
  try {
    localStorage.getItem("accessToken");

    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
