import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { confirmDialog } from 'primereact/confirmdialog';
import * as ExpenseService from '../../../services/ExpenseService';
import NewExpense from './NewExpense';

const Expenses = (props) => {
	const [expenses, setExpenses] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	//const [expenseBeingEdited, setExpenseBeingEdited] = useState(null);

	const [addingExpense, setAddingExpense] = useState(false);
	//const [editingExpense, setEditingExpense] = useState(false);

	const clickHandleAddExpense = () => {
		//setEditingExpense(false);
		setAddingExpense(true);
	};

	//const editErrorMsg = useRef(null);

	// const {
	// 	register: registerEdit,
	// 	handleSubmit: handleSubmitEdit,
	// 	reset: resetEdit,
	// 	formState: { errors: errorsEdit },
	// } = useForm();

	// const editExpense = (data) => {
	// 	editErrorMsg?.current?.clear();
	// 	const newData = { ...data, id: expenseBeingEdited.id, user: expenseBeingEdited.user };

	// 	const response = ExpenseService.updateExpense(newData);

	// 	if (response.status === 'success') {
	// 		props.showGlobalToast('success', response.message);
	// 		setExpenses(response.data);
	// 		closeEditExpense();
	// 	} else {
	// 		editErrorMsg?.current?.replace({
	// 			severity: 'error',
	// 			summary: response.message,
	// 			sticky: true,
	// 		});
	// 	}
	// };

	// const clickHandleEdit = (expense) => {
	// 	setAddingExpense(false);
	// 	setEditingExpense(true);
	// 	setExpenseBeingEdited(expense);
	// };

	const closeAddExpense = () => {
		setAddingExpense(false);
	};

	// const closeEditExpense = () => {
	// 	resetEdit();
	// 	editErrorMsg?.current?.clear();
	// 	setEditingExpense(false);
	// };

	const deleteExpense = (data) => {
		const response = ExpenseService.deleteExpense(data);

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			setExpenses(response.data);
		}
	};

	const confirmDeletion = (data) => {
		confirmDialog({
			message: 'Deseja realmente excluir este lançamento?',
			header: 'Excluir Lançamento',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-danger',
			position: 'top',
			acceptLabel: 'Sim',
			rejectLabel: 'Não',
			accept: () => {
				deleteExpense(data);
			},
			reject: () => {},
		});
	};

	useEffect(() => {
		setExpenses(ExpenseService.getExpenses());
		setDataLoaded(true);
	}, [dataLoaded]);

	return (
		<>
			<div style={{ textAlign: 'left' }}>
				<h3>Painel de Gastos » Lançamentos</h3>
				<hr className="rightFade" />
				{addingExpense && (
					<NewExpense
						setExpenses={setExpenses}
						showGlobalToast={props.showGlobalToast}
						closeAddExpense={closeAddExpense}
					/>
				)}
				{!addingExpense && (
					<Button
						style={{
							marginBottom: '15px',
							width: '100%',
							justifyContent: 'center',
						}}
						onClick={clickHandleAddExpense}
					>
						<FaPlusCircle />
						&nbsp;Adicionar Novo Lançamento
					</Button>
				)}
				<div>
					<table className="customTable">
						<thead>
							<tr>
								<th style={{ width: '50px' }}>#</th>
								<th>Descrição</th>
								<th>Categoria</th>
								<th>Lugar</th>
								<th>Data</th>
								<th>Valor</th>
								<th style={{ width: '80px', textAlign: 'center' }}>Ações</th>
							</tr>
						</thead>
						<tbody>
							{expenses.map((expense, index) => {
								const expenseDate = new Date(expense.date);
								index++;
								return (
									<React.Fragment key={index}>
										<tr>
											<td>{index}</td>
											<td>{expense.description}</td>
											<td>{expense.category}</td>
											<td>{expense.place}</td>
											<td>{`${expenseDate.getDate()}/${
												expenseDate.getMonth() + 1
											}/${expenseDate.getFullYear()}`}</td>
											<td>{expense.cost}</td>
											<td style={{ textAlign: 'center' }}>
												<FaEdit
													style={{ color: '#0000ff', cursor: 'pointer', margin: '5px' }}
													onClick={() => {
														//clickHandleEdit(expense);
													}}
												/>
												<FaTrashAlt
													style={{ color: '#ff0000', cursor: 'pointer', margin: '5px' }}
													onClick={() => {
														confirmDeletion(expense);
													}}
												/>
											</td>
										</tr>
									</React.Fragment>
								);
							})}
						</tbody>
					</table>
					<h4 style={{ display: `${expenses?.length < 1 ? 'block' : 'none'}` }}>
						<br />
						Nenhum lançamento cadastrado.
					</h4>
				</div>
			</div>
		</>
	);
};

export default Expenses;
