const from = process.env.EMAIL_USER;

export const useSmtp = () => {
  async function sendEmail(to: string, subject: string, content: any) {
    const mail = useMail();
    const status = ref({ ok: false, message: "" });

    try {
      await mail.send({
        from: from,
        to: to,
        subject: subject,
        html: content,
      });
      status.value.message = "Email enviado com Sucesso";
      status.value.ok = true;
    } catch (error) {
      status.value.ok = false;
      status.value.message = `Não foi possível enviar o email: ${error}`;
    }
    return status;
  }

  return { sendEmail };
};
