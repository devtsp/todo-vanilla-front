import './css/index.css';
import FullList from './model/FullList';
import ListTemplate from './templates/ListTemplate';
import ListItem from './model/ListItem';

function initApp(): void {
	const fullList = FullList.instance;
	const listTemplate = ListTemplate.instance;

	const itemEntryForm = document.getElementById(
		'itemEntryForm'
	) as HTMLFormElement;
	itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
		event.preventDefault();

		const input = document.getElementById('newItem') as HTMLInputElement;
		const newEntryText: string = input.value.trim();
		if (!newEntryText.length) return;

		const itemId: number = fullList.list.length
			? parseInt(fullList.list[fullList.list.length - 1].id) + 1
			: 1;

		const newItem = new ListItem(itemId.toString(), newEntryText);
		fullList.addItem(newItem);

		listTemplate.render(fullList);
	});

	const clearItems = document.getElementById(
		'clearItemsButton'
	) as HTMLButtonElement;

	clearItems.addEventListener('click', (): void => {
		fullList.clearList();
		listTemplate.clear();
	});

	fullList.load();
	listTemplate.render(fullList);
}

document.addEventListener('DOMContentLoaded', initApp);
