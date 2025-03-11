const from = process.env.EMAIL_USER;

export const useSmtp = () => {
  /**
   * Sends an email using the provided parameters.
   *
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The subject of the email.
   * @param {any} content - The HTML content of the email.
   * @returns {Promise<{ ok: boolean, message: string }>} - An object containing the status of the email sending operation.
   *
   * @example
   * const status = await sendEmail('example@example.com', 'Hello', '<p>This is a test email.</p>');
   * console.log(status.message); // "Email enviado com Sucesso" or "Não foi possível enviar o email: [error]"
   */
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
