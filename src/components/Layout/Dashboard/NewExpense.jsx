import React, { useState, useRef, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import CurrencyInput from 'react-currency-masked-input';
import * as CategoryService from '../../../services/CategoryService';
import * as PlaceService from '../../../services/PlaceService';
import * as ExpenseService from '../../../services/ExpenseService';

const NewExpense = (props) => {
	const [categories, setCategories] = useState([]);
	const [places, setPlaces] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);

	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedPlace, setSelectedPlace] = useState(null);

	const errorMsg = useRef(null);

	let selectedDate = useRef(null);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm();

	const addExpense = (data) => {
		errorMsg?.current?.clear();
		let response = null;
		if (props.expense === null) {
			response = ExpenseService.addExpense(data);
		} else {
			response = ExpenseService.updateExpense(data);
		}

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			props.setExpenses(response.data);
			props.closeAddExpense();
		} else {
			errorMsg?.current?.replace({
				severity: 'error',
				summary: response.message,
				sticky: true,
			});
		}
	};

	useEffect(() => {
		setCategories(CategoryService.getCategories());
		setPlaces(PlaceService.getPlaces());
		setDataLoaded(true);
		errorMsg?.current?.clear();
	}, [dataLoaded]);

	useEffect(() => {
		if (props.expense !== null) {
			setValue('description', props.expense.description);
			setSelectedCategory(props.expense.category);
			setSelectedPlace(props.expense.place);

			const date = new Date(props.expense.date);
			selectedDate.current = date;

			setValue('date', selectedDate.current, { shouldValidate: false, shouldTouch: true });
		}
	}, [props, setValue]);

	return (
		<>
			<Panel
				header={`${props.expense === null ? 'Novo Lançamento' : 'Editar Lançamento'}`}
				style={{ marginBottom: '15px' }}
			>
				<Messages ref={errorMsg} />
				<div className="formLayout">
					<form onSubmit={handleSubmit(addExpense)}>
						{props.expense !== null && <input type="hidden" value={props.expense.id} {...register('id')} />}
						<label htmlFor="description">Descrição:</label>
						<InputText
							type="text"
							style={{ textTransform: 'uppercase' }}
							{...register('description', { required: true })}
							className={errors?.description ? 'p-invalid' : ''}
						/>
						{errors?.description && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<label htmlFor="category">Categoria:</label>
						<Controller
							control={control}
							name="category"
							defaultValue={props.expense !== null ? props.expense.category : null}
							render={({
								field: { onChange },
								fieldState: { invalid, isTouched, isDirty, error },
								formState,
							}) => (
								<Dropdown
									style={{ width: '100%', marginBottom: '15px' }}
									optionLabel="name"
									optionValue="name"
									options={categories}
									value={selectedCategory}
									onChange={(e) => {
										setSelectedCategory(e.value);
										setValue('category', e.value);
										errors.category = null;
									}}
									placeholder="Selecione uma Categoria"
									className={errors?.category ? 'p-invalid' : ''}
								/>
							)}
							rules={{ required: true }}
						/>
						{errors?.category && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<label htmlFor="place">Lugar:</label>
						<Controller
							control={control}
							name="place"
							defaultValue={props.expense !== null ? props.expense.place : null}
							render={({
								field: { onChange },
								fieldState: { invalid, isTouched, isDirty, error },
								formState,
							}) => (
								<Dropdown
									style={{ width: '100%', marginBottom: '15px' }}
									optionLabel="name"
									optionValue="name"
									options={places}
									value={selectedPlace}
									onChange={(e) => {
										setSelectedPlace(e.value);
										setValue('place', e.value);
										errors.place = null;
									}}
									placeholder="Selecione um Lugar"
									className={errors?.place ? 'p-invalid' : ''}
								/>
							)}
							rules={{ required: true }}
						/>
						{errors?.place && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<label htmlFor="cost">Valor:</label>
						<CurrencyInput
							type="number"
							defaultValue={props.expense !== null ? props.expense.cost : null}
							{...register('cost', { required: true, min: 0.01 })}
							className={`p-inputtext ${errors?.cost ? 'p-invalid' : ''}`}
						/>
						{errors?.cost?.type === 'required' && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						{errors?.cost?.type === 'min' && (
							<Message
								severity="error"
								text="O valor mínimo é de 0.01."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<label htmlFor="date">Data:</label>
						<Calendar
							dateFormat="dd/mm/yy"
							value={props.expense !== null ? selectedDate.current : null}
							defaultValue={props.expense !== new Date() ? selectedDate.current : null}
							style={{ width: '100%' }}
							readOnlyInput
							{...register('date')}
						></Calendar>
						{errors?.data?.type === 'required' && (
							<Message
								severity="error"
								text="Campo obrigatório."
								style={{ display: 'block', marginBottom: '15px' }}
							></Message>
						)}
						<div className="p-grid">
							<div className="p-col-12 p-md-6">
								<Button type="submit" style={{ width: '100%' }}>
									{`${props.expense === null ? 'Adicionar' : 'Salvar'}`}
								</Button>
							</div>
							<div className="p-col-12 p-md-6">
								<Button
									type="reset"
									className="p-button-danger"
									onClick={props.closeAddExpense}
									style={{ width: '100%' }}
								>
									Cancelar
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Panel>
		</>
	);
};

export default NewExpense;
