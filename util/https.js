import axios from "axios";

const BASE_URL = 'https://my-expenses-b3e4f-default-rtdb.firebaseios.com';

export async function storeExpense(expenseData) {
    const response = await axios.post(
        BASE_URL + '/expenses.json',
        expenseData
    );
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BASE_URL + '/expenses.json');
    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(BASE_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(BASE_URL + `/expenses/${id}.json`);
} 