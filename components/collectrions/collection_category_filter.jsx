import React, { useState } from 'react';
import Recently_added_dropdown from '../dropdown/recently_added_dropdown';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';

const Collection_category_filter = () => {
	const [propertiesModal, setPropertiesModal] = useState(false);
	const [propetiesAccordionValue, setPropetiesAccordionValue] = useState(null);

	const handlePropartiesAccordion = (parentId, e) => {
		setPropetiesAccordionValue(parentId);
		const target = e.target.closest('.accordion-item');
		target.classList.toggle('show-accordion');
	};

	const sortText = [
		{
			id: 2,
			text: 'Price: Low to High',
		},
		{
			id: 3,
			text: 'Price: high to low',
		},
	];
	const blockchainText = [
		{
			id: 1,
			text: 'Ethereum',
		},
		{
			id: 2,
			text: 'Polygon',
		},
		{
			id: 3,
			text: 'Flow',
		},
		{
			id: 4,
			text: 'Tezos',
		},
	];
	const categoryText = [
		{
			id: 1,
			text: 'All',
		},
	];
	const saleTypeText = [
		{
			id: 1,
			text: 'Timed auction',
		},
		{
			id: 2,
			text: 'Fixed price',
		},
		{
			id: 3,
			text: 'Not for sale',
		},
		{
			id: 4,
			text: 'Open for offers',
		},
	];

	const propertiesText = [
		{
			parentId: 1,
			titleText: 'Background',
			properties: [
				{
					id: 1,
					color: 'red',
					point: '14',
				},
				{
					id: 2,
					color: 'green',
					point: '56',
				},
				{
					id: 3,
					color: 'blue',
					point: '11',
				},
				{
					id: 4,
					color: 'white',
					point: '25',
				},
			],
		},
		{
			parentId: 2,
			titleText: 'Eyes',
			properties: [
				{
					id: 1,
					color: 'red',
					point: '14',
				},
				{
					id: 2,
					color: 'green',
					point: '56',
				},
				{
					id: 3,
					color: 'blue',
					point: '11',
				},
				{
					id: 4,
					color: 'white',
					point: '25',
				},
			],
		},
		{
			parentId: 3,
			titleText: 'face',
			properties: [
				{
					id: 1,
					color: 'red',
					point: '14',
				},
				{
					id: 2,
					color: 'green',
					point: '56',
				},
				{
					id: 3,
					color: 'blue',
					point: '11',
				},
				{
					id: 4,
					color: 'white',
					point: '25',
				},
			],
		},
	];

	return (
		<>
			{/* <!-- Filter --> */}
			<div className="mb-8 flex flex-wrap items-center justify-between">
				<div className="flex flex-wrap items-center">
					{/* <!-- Blockchain --> */}
					{/* <!-- Category --> */}
					<Recently_added_dropdown data={categoryText} dropdownFor="category" />
				</div>

				{/* <!-- Sort --> */}
				<Recently_added_dropdown data={sortText} dropdownFor="recently_added" />
			</div>
		</>
	);
};

export default Collection_category_filter;
