const dotenv = require("dotenv");
const sendMail = require("./helpers/sendEmail");
const Expense = require("./models/expense");

dotenv.config();
const expenseEmail = async () => {

    const expenses = await Expense.find({});
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.value, 0);

    if (totalExpense > 10000) {
        let MessageOption = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "Expense Alert",
            text: `Your total expenses have exceeded the limit. Total expenses: ${totalExpense}`,
        };
        await sendMail(MessageOption);
    }

}
module.exports = expenseEmail;