import React from 'react';
const localeOptions = {
    style:'currency',
    currency:'NZD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}
const percentlocaleOptions = {
    style:'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}

export const PaymentTable = props => {
    let paymentMonthsArr = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    for(let i = 0; i < props.yearlyPayments.length; i++) {
        paymentMonthsArr.push(
            <tr key={props.yearlyPayments[i].year}>
                <td>{props.yearlyPayments[i].year}</td>
                <td>{props.yearlyPayments[i].year + currentYear}</td>
                <td>{props.yearlyPayments[i].interestPaid.toLocaleString('en-NZ', localeOptions)}</td>
                <td className="to-date-yearly-payment">{props.yearlyPayments[i].interestPaidToDate.toLocaleString('en-NZ', localeOptions)}</td>
                <td>{props.yearlyPayments[i].principalRepaid.toLocaleString('en-NZ', localeOptions)}</td>
                <td className="to-date-yearly-payment">{props.yearlyPayments[i].principalRepaidToDate.toLocaleString('en-NZ', localeOptions)}</td>
                <td>{props.yearlyPayments[i].outstandingBalance.toLocaleString('en-NZ', localeOptions)}</td>
                <td className="to-date-yearly-payment">{(((props.purchasingHousePrice - props.amountToBorrow) + props.yearlyPayments[i].principalRepaidToDate) / props.purchasingHousePrice).toLocaleString('en-NZ', percentlocaleOptions)}</td>
                <td>{(props.yearlyPayments[i].interestPaidToDate + props.yearlyPayments[i].principalRepaidToDate + (props.purchasingHousePrice - 0)).toLocaleString('en-NZ', localeOptions)}</td>
                <td>{((i+1)**0.06)}</td>
            </tr>
        );
    }

    return (
        <table className="paymentsCalculatorTable">
            <thead>
            <tr>
                <th>Year</th>
                <th>Year</th>
                <th>Year Interest Paid</th>
                <th className="to-date-yearly-payment">Total Interest Paid</th>
                <th>Year Principal Repaid</th>
                <th className="to-date-yearly-payment">Total Principal Repaid</th>
                <th>Mortgage Balance</th>
                <th>Equity</th>
                <th>BreakEven Selling Price</th>
            </tr>
            </thead>
            <tbody>
            {paymentMonthsArr}
            </tbody>
        </table>
    );
}