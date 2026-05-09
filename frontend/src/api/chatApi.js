import API from "./axios";

export const createChat = async (
  chatData,
  token
) => {
  const response = await API.post(
    "/chat/create",
    chatData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAllChats = async (
  token
) => {
  const response = await API.get(
    "/chat/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getSingleChat = async (
  chatId,
  token
) => {
  const response = await API.get(
    `/chat/${chatId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateChat = async (
  chatId,
  chatData,
  token
) => {

  const response = await API.put(
    `/chat/update/${chatId}`,
    chatData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const deleteChat = async (
  chatId,
  token
) => {

  const response = await API.delete(
    `/chat/delete/${chatId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};