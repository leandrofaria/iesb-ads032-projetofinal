import React, { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import * as PlaceService from '../../../services/PlaceService';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';
import { confirmDialog } from 'primereact/confirmdialog';

const Places = (props) => {
	const [places, setPlaces] = useState([]);
	const [addingPlace, setAddingPlace] = useState(false);
	const [placeBeingEdited, setPlaceBeingEdited] = useState(null);
	const [editingPlace, setEditingPlace] = useState(false);

	const clickHandleAddPlace = () => {
		setEditingPlace(false);
		setAddingPlace(true);
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

	const addPlace = (data) => {
		errorMsg?.current.clear();
		const response = PlaceService.addPlace(data);

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			setPlaces(response.data);
			closeAddPlace();
		} else {
			errorMsg?.current.replace({
				severity: 'error',
				summary: response.message,
				sticky: true,
			});
		}
	};

	const editPlace = (data) => {
		editErrorMsg?.current.clear();
		const newData = { ...data, id: placeBeingEdited.id, user: placeBeingEdited.user };

		const response = PlaceService.updatePlace(newData);

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			setPlaces(response.data);
			closeEditPlace();
		} else {
			editErrorMsg?.current.replace({
				severity: 'error',
				summary: response.message,
				sticky: true,
			});
		}
	};

	const clickHandleEdit = (place) => {
		setAddingPlace(false);
		setEditingPlace(true);
		setPlaceBeingEdited(place);
	};

	const closeAddPlace = () => {
		reset();
		errorMsg?.current.clear();
		setAddingPlace(false);
	};

	const closeEditPlace = () => {
		resetEdit();
		editErrorMsg?.current.clear();
		setEditingPlace(false);
	};

	const deletePlace = (data) => {
		const response = PlaceService.deletePlace(data);

		if (response.status === 'success') {
			props.showGlobalToast('success', response.message);
			setPlaces(response.data);
		}
	};

	const confirmDeletion = (data) => {
		confirmDialog({
			message: 'Deseja realmente excluir este lugar?',
			header: 'Excluir Lugar',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-danger',
			position: 'top',
			acceptLabel: 'Sim',
			rejectLabel: 'Não',
			accept: () => {
				deletePlace(data);
			},
			reject: () => {},
		});
	};

	useEffect(() => {
		const userPlaces = PlaceService.getPlaces();
		setPlaces(userPlaces);
	}, []);
	return (
		<>
			<div style={{ textAlign: 'left' }}>
				<h3>Painel de Gastos » Lugares</h3>
				<hr className="rightFade" />
				{addingPlace && (
					<Panel header="Novo Lugar" style={{ marginBottom: '15px' }}>
						<Messages ref={errorMsg} />
						<div className="formLayout">
							<form onSubmit={handleSubmit(addPlace)}>
								<label htmlFor="name">Nome do Novo Lugar:</label>
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
											onClick={closeAddPlace}
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
				{editingPlace && (
					<Panel header="Editar Lugar" style={{ marginBottom: '15px' }}>
						<Messages ref={editErrorMsg} />
						<div className="formLayout">
							<form onSubmit={handleSubmitEdit(editPlace)}>
								<label htmlFor="name">Novo Nome do Lugar:</label>
								<InputText
									type="text"
									style={{ textTransform: 'uppercase' }}
									placeholder={placeBeingEdited.name}
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
											onClick={closeEditPlace}
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
				{!addingPlace && !editingPlace && (
					<Button
						style={{
							marginBottom: '15px',
							width: '100%',
							justifyContent: 'center',
						}}
						onClick={clickHandleAddPlace}
					>
						<FaPlusCircle />
						&nbsp;Adicionar Novo Lugar
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
							{places.map((place, index) => {
								index++;
								return (
									<React.Fragment key={index}>
										<tr>
											<td>{index}</td>
											<td>{place.name}</td>
											<td style={{ textAlign: 'center' }}>
												<FaEdit
													style={{ color: '#0000ff', cursor: 'pointer', margin: '5px' }}
													onClick={() => {
														clickHandleEdit(place);
													}}
												/>
												<FaTrashAlt
													style={{ color: '#ff0000', cursor: 'pointer', margin: '5px' }}
													onClick={() => {
														confirmDeletion(place);
													}}
												/>
											</td>
										</tr>
									</React.Fragment>
								);
							})}
						</tbody>
					</table>
					<h4 style={{ display: `${places?.length < 1 ? 'block' : 'none'}` }}>
						<br />
						Nenhum lugar cadastrado.
					</h4>
				</div>
			</div>
		</>
	);
};

export default Places;
