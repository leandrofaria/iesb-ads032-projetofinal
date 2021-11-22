import React, { useState, useEffect } from 'react';
import * as AuthService from '../../../services/AuthService';
import * as ExpenseService from '../../../services/ExpenseService';
import { Chart } from 'primereact/chart';

const Reports = () => {
	const [authUser, setAuthUser] = useState(null);
	const [expenses, setExpenses] = useState([]);
	const [graph01Data, setGraph01Data] = useState([]);
	const [graph02Data, setGraph02Data] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	const currentYear = new Date().getFullYear();

	useEffect(() => {
		const user = AuthService.autoLogin();
		setAuthUser(user);
	}, []);

	let graph01Options = {
		maintainAspectRatio: false,
		aspectRatio: 0.8,
		plugins: {
			legend: {
				labels: {
					color: '#495057',
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: '#495057',
				},
				grid: {
					color: '#ebedef',
				},
			},
			y: {
				ticks: {
					color: '#495057',
				},
				grid: {
					color: '#ebedef',
				},
			},
		},
	};

	let graph02Options = {
		maintainAspectRatio: false,
		aspectRatio: 0.8,
		plugins: {
			legend: {
				labels: {
					color: '#495057',
				},
			},
		},
	};

	const getRandomColor = () => {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const generateGraph01Data = () => {
		const graphData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		expenses.forEach((expense) => {
			const month = new Date(expense.date).getMonth();
			graphData[month] += +expense.cost;
		});

		setGraph01Data({
			labels: [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro',
			],
			datasets: [
				{
					label: 'Gasto Total - Em Reais (R$)',
					backgroundColor: '#42A5F5',
					data: graphData,
				},
			],
		});
	};

	const generateGraph02Data = () => {
		const labels = [];
		const graphData = [];

		expenses.forEach((expense) => {
			if (!labels.includes(expense.category)) {
				labels.push(expense.category);
			}
		});

		const backgroundColors = [];
		labels.forEach((label) => {
			backgroundColors.push(getRandomColor());
		});

		expenses.forEach((expense) => {
			const pos = labels.indexOf(expense.category);
			graphData[pos] =
				graphData[pos] === undefined || graphData[pos] === null
					? +expense.cost
					: graphData[pos] + +expense.cost;
		});

		setGraph02Data({
			labels: labels,
			datasets: [
				{
					data: graphData,
					backgroundColor: backgroundColors,
					hoverBackgroundColor: backgroundColors,
				},
			],
		});
	};

	useEffect(() => {
		setExpenses(ExpenseService.getExpenses());
		generateGraph01Data();
		generateGraph02Data();
		setDataLoaded(true);
	}, [dataLoaded]);

	return (
		<>
			<div style={{ textAlign: 'left' }}>
				<h3>Painel de Gastos » Relatórios</h3>
				<hr className="rightFade" />
				<div style={{ textAlign: 'center' }}>
					<h3>
						Informações do ano de {currentYear} - {authUser?.name}
					</h3>
				</div>
				<br />
				<div>
					<h3>1. Gastos por Mês</h3>
					<br />
					<Chart type="bar" data={graph01Data} options={graph01Options} />
					<br />
					<hr />
					<br />
				</div>
				<br />
				<div>
					<h3>2. Gastos por Categoria</h3>
					<br />
					<Chart
						type="pie"
						data={graph02Data}
						options={graph02Options}
						style={{ position: 'relative', width: '100%' }}
					/>
					<br />
					<hr />
					<br />
				</div>
			</div>
		</>
	);
};

export default Reports;
