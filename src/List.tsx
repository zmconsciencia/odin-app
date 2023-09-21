import React from "react";
import DonutChart from "./DonutChart";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Link } from "react-router-dom";

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
	const items = JSON.parse(localStorage.getItem('items') || '[]');
	const[state, setState] = React.useState([] as string[]);
	const[input, setInput] = React.useState('');
	const[error, setError] = React.useState(false);
	const[show, setShow] = React.useState(false);

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

	const ShowHandler = () => {
		if (show === false) {
			setShow(true);
		}
		else {
			setShow(false);
		}
	}
	
	const data = [
		{ name: 'Algarve', value: 65 },
		{ name: 'Porto', value: 65 },
		{ name: 'Lisboa', value: 130 },
		{ name: 'Açores', value: 40},
		{ name: 'Madeira', value: 100},
		{ name: 'Alentejo', value: 32},
		{ name: 'Centro', value: 70},
	];

	const sumData : number = data.reduce((acc, item) => acc + item.value, 0);
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


	return (
		<>
			<div className="total">
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
				<div className="box-center">
					<button className='glow-on-hover' onClick={ShowHandler} type='button'>Mostrar</button>
					{show === true ? <DisplayList items={items} /> : null}
				</div>
				<div className="box-right">
					<p className="box-title">Total Clients</p>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart width={400} height={400}>
							<text textAnchor="middle" x="50%" y="50%" fontSize="1.5em">{sumData}</text>
							<Pie dataKey="value" data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} fill="#82ca9d">
							{data.map((data, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="total-second">
				<div className="box-left">
					<h1 className="title-box">Total Clients</h1>
					<DonutChart data={data} width={700} />
				</div>
				<div className="box-center">
					<Link to="./Client-View">
						<button className='glow-on-hover' type='button'>Client View</button>
					</Link>
				</div>
			</div>
		</>
	)
}