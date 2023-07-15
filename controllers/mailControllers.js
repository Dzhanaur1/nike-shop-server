const nodemailer = require("nodemailer");

const sendMail = (req, res) => {
  console.log(req?.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "3923328@gmail.com",
      pass: "luyqnnmkyirtuigb",
    },
  });
  const mailOptions = {
    from: "ssoraxx@gmail.com", // Отправитель, тот, кто заполнил форму
    to: "ssoraxx@gmail.com", // Почтовый ящик получателя, можно указать свой
    subject: "Сообщение с формы обратной связи",
    html: `<p>Имя клиента: ${req.body.clientData.name}</p>
    <p>Почта клиента: ${req.body.clientData.email}</p>
    <p>Описание: ${req.body.clientData.message}</p>
    <table>
  <thead>
    <tr>
      <th width="50" align="center" valign="middle">ID</th>
      <th width="150" align="center" valign="middle">Модель</th>
      <th width="100" align="center" valign="middle">Цена</th>
      <th width="50" align="center" valign="middle">Размер</th>
      <th width="50" align="center" valign="middle">Кол-во</th>
    </tr>
  </thead>
  <tbody>
    ${req.body.products
      .map(
        (product) =>
          `<tr>
        <td align="center" valign="middle">${product.id}</td>
        <td align="center" valign="middle">${product.name}</td>
        <td align="center" valign="middle">${product.price}</td>
        <td align="center" valign="middle">${product.size}</td>
        <td align="center" valign="middle">${product.quantity}</td>
      </tr>`
      )
      .join("")}
  </tbody>
</table>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error");
    } else {
      console.info("Успешнно отправлено");
      res.status(200).send("Успешно отправлено");
    }
  });
};
module.exports = sendMail;
