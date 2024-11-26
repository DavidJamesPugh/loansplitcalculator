import { Button, Card, Checkbox, Label, TextInput, RangeSlider  } from "flowbite-react";
import {useState} from "react";
import {Line} from "react-chartjs-2";

function PMT(ir, np, pv, fv, type) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv)/np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
}

export function IntRateCard() {

    const [interestRate, setIntRate] = useState(8.49)
    const [mortgageAmount, setMortgage] = useState(100000)
    const [period, setPeriod] = useState(30)

    const dataFields =  Array(...Array(parseInt(period*12)).keys())

    const calculatedInterest = interestRate/100/12
    const repayment = Math.abs(PMT(calculatedInterest,12*period,mortgageAmount).toFixed(2))
    const interestPayment = (mortgageAmount*calculatedInterest).toFixed(2)
    console.log([...Array(period*12).keys()].map(foo => repayment*period*12-((foo+1)*interestPayment)))
    const repaymentSchedule = [...Array(period*12).keys()].map(foo => repayment*period*12-((foo+1)*interestPayment))
    console.log()
    const data = {
        labels: dataFields,
        datasets:[{
            label: "Cost",
            data: repaymentSchedule,
        }]
    }

    const calculateInterest = (click) => {
        click.preventDefault()


    }


    return (
        <>
        <Card className="max-w-sm">
            <form className="flex flex-col gap-4">
                <div className="sm-5 block">
                    <Label htmlFor="mort" value="Mortgage Amount"/>
                    <TextInput id="intRate1" type="number" value={mortgageAmount}
                               onChange={e => setMortgage(e.target.value)} step={50000}
                               required/>
                </div>
                <div className="md-6 block">
                    <Label htmlFor="period" value="Loan Period"/>
                    <div className="md-3">
                        <Label htmlFor="period" value=" Years"/>
                        <br/>
                        <Label htmlFor="period" value={period}/>

                        <RangeSlider id="default-range" min={0} max={30} step={.5} onChange={e => setPeriod(e.target.value)} />
                    </div>
                </div>
                <div className="mb-2 block">
                    <Label htmlFor="intRate1" value="Interest Rate"/>
                    <TextInput id="intRate1" type="number" value={interestRate}
                               onChange={e => setIntRate(e.target.value)} step={.1}
                               required/>
                </div>
                Your Repayment per is:
                <Label htmlFor="intRate1" value={repayment}/>
                Your Interest is:
                <Label htmlFor="intRate1" value={interestPayment}/>
                {/*<Button type="submit" onClick={calculateInterest}>Submit</Button>*/}
            </form>
        </Card>
            <Line data={data}/>
        </>
    );
}