export class Mail {
  toEmail: string;
  subject: string;
  text: string;
  attachments: string[];
  constructor(
    toEmail: string,
    subject: string,
    text: string,
    attachments: string[],
  ) {
    this.toEmail = toEmail;
    this.subject = subject;
    this.text = text;
    this.attachments = attachments;
  }
}
