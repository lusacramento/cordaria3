export const useSmtp = () => {
  async function sendEmail(
    from: string,
    to: string,
    subject: string,
    content: any
  ) {
    const mail = useMail();
    const status = ref("");

    try {
      await mail.send({
        from: from,
        to: to,
        subject: subject,
        html: content,
      });
      status.value = "Email enviado com sucesso!";
    } catch (error) {
      status.value = `Não foi possível enviar o email: ${error}`;
    }
    return status;
  }

  return { sendEmail };
};
