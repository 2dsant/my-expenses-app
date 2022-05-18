import { useEffect, useState, useContext } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { fetchExpenses } from '../util/https';
import { ExpensesContext } from '../store/expenses-context';
//Utils
import { getDateMinusDays } from '../util/date';
import LoadingOverlay from '../components/Ui/LoadingOverlay';
import ErrorOverlay from '../components/Ui/ErrorOverlay';


function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);


    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensePeriod='Last 7 days'
            fallbackText="No expenses register"
        />
    )
}

export default RecentExpenses;