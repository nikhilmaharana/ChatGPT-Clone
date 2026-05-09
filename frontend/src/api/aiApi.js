import API from "./axios";

export const getAIResponse = async (
  prompt
) => {

  const response = await API.post(
    "/ai/chat",
    {
      prompt,
    }
  );

  return response.data;
};