export default async function postImage(image: File) {
  const accessToken = localStorage.getItem("accessToken");

  const formData = new FormData();

  formData.append("image", image);

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const body = await res.json();

  return body;
}
