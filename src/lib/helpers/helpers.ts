export const getId = (request: Request) => {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split("/").pop() ?? "", 10);
  return id;
};
