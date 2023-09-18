import React from "react";

function ListItems(props: { value: string }) {
	return (
	<li>{props.value}</li>
	)
  }
  
function DisplayList(props: { items: string[] }) {
	return (
		<ul>
			{props.items.map((value, index) => {
				return <ListItems key={index} value={value} />
			})}
		</ul>
		)
	}

export default function List() {
	const items: string[] = JSON.parse(localStorage.getItem('items') || '[]');
	const[state, setState] = React.useState(items);
	const[input, setInput] = React.useState('');
	const[error, setError] = React.useState(false);

	const addItems = () => {
		const newItems = [...state, input];
		if ((input === '') || state.includes(input)) {
			setError(true);
			return;
		}
		setError(false);
		setState(newItems);
		setInput('');
		localStorage.setItem('items', JSON.stringify(newItems));
	}
	
	return (
		<>
			<div className="box-left">
				{error && <p className="error">Invalid item</p>}
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} 
				onKeyUp={(e) => {
					if (e.key === 'Enter') {
						addItems();
					}
					}} />
				<button className='glow-on-hover' onClick={addItems} type='button'>Adicionar</button>
				<DisplayList items={state} />
			</div>
		</>
	)
}