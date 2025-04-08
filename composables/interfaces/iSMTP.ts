export const useISMTP = () => {
  const url = "/api/smtp";
  async function sendEmail(to: string, subject: string, content: any) {
    return await $fetch(url, {
      method: "POST",
      body: {
        to,
        subject,
        content,
      },
    });
  }

  return { sendEmail };
};
