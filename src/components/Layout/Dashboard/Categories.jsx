import React, { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import * as CategoryService from '../../../services/CategoryService';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';
import { confirmDialog } from 'primereact/confirmdialog';

const Categories = (props) => {
	const [categories, setCategories] = useState([]);
	const [addingCategory, setAddingCategory] = useState(false);
	const [categoryBeingEdited, setCategoryBeingEdited] = useState(null);
	const [editingCategory, setEditingCategory] = useState(false);

	const clickHandleAddCategory = () => {
		setEditingCategory(false);
		setAddingCategory(true);
	};

	const errorMsg = useRef(null);
	const editErrorMsg = useRef(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const {
		register: registerEdit,
		handleSubmit: handleSubmitEdit,
		reset: resetEdit,
		formState: { errors: errorsEdit },
	} = useForm();

	const addCategory = (data) => {
		errorMsg?.current.clear();
		const response = CategoryService.addCategory(data);

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			setCategories(response.data);
			closeAddCategory();
		} else {
			errorMsg?.current.replace({
				severity: 'error',
				summary: response.message,
				sticky: true,
			});
		}
	};

	const editCategory = (data) => {
		editErrorMsg?.current.clear();
		const newData = { ...data, id: categoryBeingEdited.id, user: categoryBeingEdited.user };

		const response = CategoryService.updateCategory(newData);

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			setCategories(response.data);
			closeEditCategory();
		} else {
			editErrorMsg?.current.replace({
				severity: 'error',
				summary: response.message,
				sticky: true,
			});
		}
	};

	const clickHandleEdit = (category) => {
		setAddingCategory(false);
		setEditingCategory(true);
		setCategoryBeingEdited(category);
	};

	const closeAddCategory = () => {
		reset();
		errorMsg?.current.clear();
		setAddingCategory(false);
	};

	const closeEditCategory = () => {
		resetEdit();
		editErrorMsg?.current.clear();
		setEditingCategory(false);
	};

	const deleteCategory = (data) => {
		const response = CategoryService.deleteCategory(data);

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			setCategories(response.data);
		}
	};

	const confirmDeletion = (data) => {
		confirmDialog({
			message: 'Deseja realmente excluir esta categoria?',
			header: 'Excluir Categoria',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-danger',
			position: 'top',
			acceptLabel: 'Sim',
			rejectLabel: 'Não',
			accept: () => {
				deleteCategory(data);
			},
			reject: () => {},
		});
	};

	useEffect(() => {
		const userCategories = CategoryService.getCategories();
		setCategories(userCategories);
	}, []);
	return (
		<>
			<div style={{ textAlign: 'left' }}>
				<h3>Painel de Gastos » Categorias</h3>
				<hr className="rightFade" />
				{addingCategory && (
					<Panel header="Nova Categoria" style={{ marginBottom: '15px' }}>
						<Messages ref={errorMsg} />
						<div className="formLayout">
							<form onSubmit={handleSubmit(addCategory)}>
								<label htmlFor="name">Nome da Nova Categoria:</label>
								<InputText
									type="text"
									style={{ textTransform: 'uppercase' }}
									{...register('name', { required: true })}
									className={errors?.name ? 'p-invalid' : ''}
								/>
								{errors?.name && (
									<Message
										severity="error"
										text="Campo obrigatório."
										style={{ display: 'block', marginBottom: '15px' }}
									></Message>
								)}
								<div className="p-grid">
									<div className="p-col-12 p-md-6">
										<Button type="submit" style={{ width: '100%' }}>
											Adicionar
										</Button>
									</div>
									<div className="p-col-12 p-md-6">
										<Button
											type="reset"
											className="p-button-danger"
											onClick={closeAddCategory}
											style={{ width: '100%' }}
										>
											Cancelar
										</Button>
									</div>
								</div>
							</form>
						</div>
					</Panel>
				)}
				{editingCategory && (
					<Panel header="Editar Categoria" style={{ marginBottom: '15px' }}>
						<Messages ref={editErrorMsg} />
						<div className="formLayout">
							<form onSubmit={handleSubmitEdit(editCategory)}>
								<label htmlFor="name">Novo Nome da Nova Categoria:</label>
								<InputText
									type="text"
									style={{ textTransform: 'uppercase' }}
									placeholder={categoryBeingEdited.name}
									{...registerEdit('name', { required: true })}
									className={errorsEdit?.name ? 'p-invalid' : ''}
								/>
								{errorsEdit?.name && (
									<Message
										severity="error"
										text="Campo obrigatório."
										style={{ display: 'block', marginBottom: '15px' }}
									></Message>
								)}
								<div className="p-grid">
									<div className="p-col-12 p-md-6">
										<Button type="submit" style={{ width: '100%' }}>
											Salvar
										</Button>
									</div>
									<div className="p-col-12 p-md-6">
										<Button
											type="reset"
											className="p-button-danger"
											onClick={closeEditCategory}
											style={{ width: '100%' }}
										>
											Cancelar
										</Button>
									</div>
								</div>
							</form>
						</div>
					</Panel>
				)}
				{!addingCategory && !editingCategory && (
					<Button
						style={{
							marginBottom: '15px',
							width: '100%',
							justifyContent: 'center',
						}}
						onClick={clickHandleAddCategory}
					>
						<FaPlusCircle />
						&nbsp;Adicionar Nova Categoria
					</Button>
				)}
				<div>
					<table className="customTable">
						<thead>
							<tr>
								<th style={{ width: '50px' }}>#</th>
								<th>Nome</th>
								<th style={{ width: '80px', textAlign: 'center' }}>Ações</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((category, index) => {
								index++;
								return (
									<React.Fragment key={index}>
										<tr>
											<td>{index}</td>
											<td>{category.name}</td>
											<td style={{ textAlign: 'center' }}>
												<FaEdit
													style={{ color: '#0000ff', cursor: 'pointer', margin: '5px' }}
													onClick={() => {
														clickHandleEdit(category);
													}}
												/>
												<FaTrashAlt
													style={{ color: '#ff0000', cursor: 'pointer', margin: '5px' }}
													onClick={() => {
														confirmDeletion(category);
													}}
												/>
											</td>
										</tr>
									</React.Fragment>
								);
							})}
						</tbody>
					</table>
					<h4 style={{ display: `${categories?.length < 1 ? 'block' : 'none'}` }}>
						<br />
						Nenhuma categoria cadastrada.
					</h4>
				</div>
			</div>
		</>
	);
};

export default Categories;
